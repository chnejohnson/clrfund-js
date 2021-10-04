import { Contract, Signer, BigNumber, BigNumberish, Transaction } from '../ethers'
import { Keypair, Message, PubKey } from '../maci'
import { ERC20, FundingRound, MACI } from '../typechain'
import { FundingRound as FundingRoundABI, ERC20 as ERC20ABI, MACI as MACIABI } from '../abi'
import { getEventArg, createMessage } from '../utils'

/**
 * references:
 *  - vue-app/src/components/ContributionModal.vue
 *  - vue-app/src/components/ReallocationModal.vue
 *  - vue-app/src/api/round.ts
 *  - vue-app/src/api/contributions.ts
 */

export class Round {
  readonly fundingRoundAddress: string
  readonly signer: Signer
  readonly fundingRound: FundingRound

  constructor(fundingRoundAddress: string, signer: Signer) {
    this.fundingRoundAddress = fundingRoundAddress
    this.signer = signer
    this.fundingRound = new Contract(fundingRoundAddress, FundingRoundABI, signer) as FundingRound
  }

  async getMaciAddress() {
    return await this.fundingRound.maci()
  }

  async getMaciContract() {
    const maciAddress = await this.getMaciAddress()
    return new Contract(maciAddress, MACIABI, this.signer) as MACI
  }

  async getTokenContract() {
    const tokenAddress = await this.fundingRound.nativeToken()
    return new Contract(tokenAddress, ERC20ABI, this.signer) as ERC20
  }

  async getContributionAmount(contributorAddress: string): Promise<BigNumber> {
    const filter = this.fundingRound.filters.Contribution(contributorAddress)
    const events = await this.fundingRound.queryFilter(filter, 0)
    const event = events[0]
    if (!event || !event.args) {
      return BigNumber.from(0)
    }
    return event.args._amount
  }

  async isContributionWithdrawn(contributorAddress: string): Promise<boolean> {
    const filter = this.fundingRound.filters.ContributionWithdrawn(contributorAddress)
    const events = await this.fundingRound.queryFilter(filter, 0)
    return events.length > 0
  }

  async getTotalContributed(): Promise<{ count: number; amount: BigNumber }> {
    const filter = this.fundingRound.filters.Contribution()
    const events = await this.fundingRound.queryFilter(filter, 0)
    let amount = BigNumber.from(0)
    events.forEach(event => {
      if (!event.args) {
        return
      }
      amount = amount.add(event.args._amount)
    })
    return { count: events.length, amount }
  }

  async approveToken(amount: BigNumberish) {
    const token = await this.getTokenContract()
    const allowance = await token.allowance(await this.signer.getAddress(), this.fundingRoundAddress)
    if (allowance.lt(amount)) {
      return await token.approve(this.fundingRoundAddress, amount)
    }
    // alrealy has enough allowance
    return
  }

  async contribute(amount: BigNumberish, voiceCreditFactor: BigNumber) {
    const keypair = new Keypair()
    const tx = await this.fundingRound.contribute(keypair.pubKey.asContractParam(), amount)

    const receipt = await tx.wait()
    if (receipt.status !== 1) {
      throw new Error('Error: transaction failed')
    }

    const maci = await this.getMaciContract()

    const stateIndex = getEventArg(receipt, maci, 'SignUp', '_stateIndex') as BigNumber
    const voiceCreditBalance = getEventArg(receipt, maci, 'SignUp', '_voiceCreditBalance')
    if (!voiceCreditBalance.mul(voiceCreditFactor).eq(amount)) {
      throw new Error('Incorrect amount of voice credits')
    }

    return {
      txHash: tx.hash,
      receipt,
      keypair,
      stateIndex,
      voiceCreditBalance,
    }
  }

  async vote(stateIndex: BigNumber, keypair: Keypair, coordinatorPubKey: PubKey, votes: [number, BigNumber][]) {
    const messages: Message[] = []
    const encPubKeys: PubKey[] = []

    let nonce = 1
    for (const [recipientIndex, voiceCreditBalance] of votes) {
      const [message, encPubKey] = createMessage(
        stateIndex.toNumber(),
        keypair,
        null,
        coordinatorPubKey,
        recipientIndex,
        voiceCreditBalance,
        nonce,
      )
      messages.push(message)
      encPubKeys.push(encPubKey)
      nonce += 1
    }

    return this.fundingRound.submitMessageBatch(
      // @ts-ignore
      messages.reverse().map(msg => msg.asContractParam()),
      encPubKeys.reverse().map(key => key.asContractParam()),
    )
  }

  async withdrawContribution() {
    return await this.fundingRound.withdrawContribution()
  }
}
