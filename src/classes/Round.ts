import { Contract, Signer, Provider } from '../ethers'
import { ERC20, FundingRound } from '../typechain'
import { FundingRound as FundingRoundABI, ERC20 as ERC20ABI } from '../abi'

export class Round {
  readonly fundingRoundAddress: string
  readonly signer: Signer
  readonly round: FundingRound

  constructor(fundingRoundAddress: string, signer: Signer) {
    this.fundingRoundAddress = fundingRoundAddress
    this.signer = signer
    this.round = new Contract(fundingRoundAddress, FundingRoundABI, signer) as FundingRound
  }

  async contribute(amount: BigInt) {
    const tokenAddress = await this.round.nativeToken()
    const token = new Contract(tokenAddress, ERC20ABI)
    // @todo add waitForTransaction
    const allowance = await token.allowance(this.signer.getAddress(), this.fundingRoundAddress)
    if (allowance < amount) {
      await token.approve(this.fundingRoundAddress, amount)
    } else {
      throw new Error('Error: allowance is not enough')
    }
  }

  async vote() {}
}
