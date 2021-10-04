import { Contract, Signer, FixedNumber, BigNumber } from '../ethers'
import { PubKey } from '../maci'
import { FundingRoundFactory } from '../typechain'
import { FundingRoundFactory as FundingRoundFactoryABI } from '../abi'
import { DateTime } from 'luxon'
import { Round } from './Round'

/**
 * references:
 *  - vue-app/src/api/round.ts
 *  - vue-app/src/api/contributions.ts
 */

export interface RoundInfo {
  fundingRoundAddress: string
  userRegistryAddress: string
  maciAddress: string
  recipientTreeDepth: number
  maxContributors: number
  maxRecipients: number
  maxMessages: number
  coordinatorPubKey: PubKey
  nativeTokenAddress: string
  nativeTokenSymbol: string
  nativeTokenDecimals: number
  voiceCreditFactor: BigNumber
  status: string
  startTime: DateTime
  signUpDeadline: DateTime
  votingDeadline: DateTime
  totalFunds: FixedNumber
  matchingPool: FixedNumber
  contributions: FixedNumber
  contributors: number
  messages: number
}

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export enum RoundStatus {
  Contributing = 'Contributing',
  Reallocating = 'Reallocating',
  Tallying = 'Tallying',
  Finalized = 'Finalized',
  Cancelled = 'Cancelled',
}

export class Factory {
  readonly factoryAddress: string
  readonly signer: Signer
  readonly factory: FundingRoundFactory

  constructor(factoryAddress: string, signer: Signer) {
    this.factoryAddress = factoryAddress
    this.signer = signer
    this.factory = new Contract(factoryAddress, FundingRoundFactoryABI, signer) as FundingRoundFactory
  }

  async getCurrentRoundAddress() {
    const fundingRoundAddress = await this.factory.getCurrentRound()
    if (fundingRoundAddress === '0x0000000000000000000000000000000000000000') {
      throw new Error('No current round')
    }
    return fundingRoundAddress
  }

  async getCurrentRound() {
    const roundAddress = await this.getCurrentRoundAddress()
    return new Round(roundAddress, this.signer)
  }

  async getRoundInfo(fundingRoundAddress: string): Promise<RoundInfo> {
    const round = await this.getCurrentRound()
    const fundingRound = round.fundingRound
    const [maciAddress, nativeTokenAddress, userRegistryAddress, voiceCreditFactor, isFinalized, isCancelled] =
      await Promise.all([
        fundingRound.maci(),
        fundingRound.nativeToken(),
        fundingRound.userRegistry(),
        fundingRound.voiceCreditFactor(),
        fundingRound.isFinalized(),
        fundingRound.isCancelled(),
      ])

    const maci = await round.getMaciContract()
    const [
      maciTreeDepths,
      signUpTimestamp,
      signUpDurationSeconds,
      votingDurationSeconds,
      coordinatorPubKeyRaw,
      messages,
    ] = await Promise.all([
      maci.treeDepths(),
      maci.signUpTimestamp(),
      maci.signUpDurationSeconds(),
      maci.votingDurationSeconds(),
      maci.coordinatorPubKey(),
      maci.numMessages(),
    ])
    const startTime = DateTime.fromSeconds(signUpTimestamp.toNumber())
    const signUpDeadline = DateTime.fromSeconds(signUpTimestamp.add(signUpDurationSeconds).toNumber())
    const votingDeadline = DateTime.fromSeconds(
      signUpTimestamp.add(signUpDurationSeconds).add(votingDurationSeconds).toNumber(),
    )
    // @ts-ignore
    const coordinatorPubKey = new PubKey([BigInt(coordinatorPubKeyRaw.x), BigInt(coordinatorPubKeyRaw.y)])

    const nativeToken = await round.getTokenContract()
    const nativeTokenSymbol = await nativeToken.symbol()
    const nativeTokenDecimals = await nativeToken.decimals()

    const maxContributors = 2 ** maciTreeDepths.stateTreeDepth - 1
    const maxMessages = 2 ** maciTreeDepths.messageTreeDepth - 1
    const now = DateTime.local()
    const contributionsInfo = await round.getTotalContributed()
    const contributors = contributionsInfo.count
    let status: string
    let contributions: BigNumber
    let matchingPool: BigNumber
    if (isCancelled) {
      status = RoundStatus.Cancelled
      contributions = BigNumber.from(0)
      matchingPool = BigNumber.from(0)
    } else if (isFinalized) {
      status = RoundStatus.Finalized
      contributions = (await fundingRound.totalSpent()).mul(voiceCreditFactor)
      matchingPool = await fundingRound.matchingPoolSize()
    } else if (messages.gte(BigNumber.from(maxMessages))) {
      status = RoundStatus.Tallying
      contributions = contributionsInfo.amount
      matchingPool = await this.factory.getMatchingFunds(nativeTokenAddress)
    } else {
      if (now < signUpDeadline && contributors < maxContributors) {
        status = RoundStatus.Contributing
      } else if (now < votingDeadline) {
        status = RoundStatus.Reallocating
      } else {
        status = RoundStatus.Tallying
      }
      contributions = contributionsInfo.amount
      matchingPool = await this.factory.getMatchingFunds(nativeTokenAddress)
    }

    const totalFunds = matchingPool.add(contributions)

    return {
      fundingRoundAddress,
      userRegistryAddress,
      maciAddress,
      recipientTreeDepth: maciTreeDepths.voteOptionTreeDepth,
      maxContributors,
      maxRecipients: 5 ** maciTreeDepths.voteOptionTreeDepth - 1,
      maxMessages,
      coordinatorPubKey,
      nativeTokenAddress,
      nativeTokenSymbol,
      nativeTokenDecimals,
      voiceCreditFactor,
      status,
      startTime,
      signUpDeadline,
      votingDeadline,
      totalFunds: FixedNumber.fromValue(totalFunds, nativeTokenDecimals),
      matchingPool: FixedNumber.fromValue(matchingPool, nativeTokenDecimals),
      contributions: FixedNumber.fromValue(contributions, nativeTokenDecimals),
      contributors,
      messages: messages.toNumber(),
    }
  }
}
