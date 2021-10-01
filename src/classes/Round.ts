import { Contract, Signer, BigNumber, BigNumberish, Transaction } from '../ethers'
import { Keypair, Message, PubKey } from '../maci'
import { ERC20, FundingRound, MACI } from '../typechain'
import { FundingRound as FundingRoundABI, ERC20 as ERC20ABI, MACI as MACIABI } from '../abi'
import { getEventArg, createMessage } from '../utils'

export class Round {
  readonly fundingRoundAddress: string
  readonly maciAddress: string
  readonly signer: Signer
  readonly round: FundingRound

  constructor(fundingRoundAddress: string, maciAddress: string, signer: Signer) {
    this.fundingRoundAddress = fundingRoundAddress
    this.maciAddress = maciAddress
    this.signer = signer
    this.round = new Contract(fundingRoundAddress, FundingRoundABI, signer) as FundingRound
  }

  async approveToken(amount: BigNumberish) {
    const tokenAddress = await this.round.nativeToken()
    const token = new Contract(tokenAddress, ERC20ABI, this.signer) as ERC20
    // @todo add waitForTransaction
    const allowance = await token.allowance(await this.signer.getAddress(), this.fundingRoundAddress)
    if (allowance.lt(amount)) {
      return await token.approve(this.fundingRoundAddress, amount)
    }
    // alrealy has enough allowance
    return
  }

  async contribute(amount: BigNumberish, onTransaction?: (tx: Transaction) => void) {
    const keypair = new Keypair()
    const tx = await this.round.contribute(keypair.pubKey.asContractParam(), amount)
    onTransaction && onTransaction(tx)

    const receipt = await tx.wait()
    if (receipt.status !== 1) {
      throw new Error('Error: transaction failed')
    }

    const maci = new Contract(this.maciAddress, MACIABI, this.signer) as MACI

    const stateIndex = getEventArg(receipt, maci, 'SignUp', '_stateIndex') as BigNumber
    const voiceCreditBalance = getEventArg(receipt, maci, 'SignUp', '_voiceCreditBalance') as BigNumber

    // if (!voiceCredits.mul(voiceCreditFactor).eq(total)) {
    //   throw new Error('Incorrect amount of voice credits')
    // }

    return {
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
    for (const [recipientIndex, voiceCredits] of votes) {
      const [message, encPubKey] = createMessage(
        stateIndex.toNumber(),
        keypair,
        null,
        coordinatorPubKey,
        recipientIndex,
        voiceCredits,
        nonce,
      )
      messages.push(message)
      encPubKeys.push(encPubKey)
      nonce += 1
    }

    return this.round.submitMessageBatch(
      // @ts-ignore
      messages.reverse().map(msg => msg.asContractParam()),
      encPubKeys.reverse().map(key => key.asContractParam()),
    )
  }
}
