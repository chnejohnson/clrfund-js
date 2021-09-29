// import { Contract, JsonRpcSigner, Wallet } from '../ethers'

// FundingRound.sol ABI
// const { abi } = require('@umbra/contracts/artifacts/contracts/Umbra.sol/Umbra.json');

// Mapping from chainId to contract information
// const fundingRoundAddress = '0xFb2dc580Eed955B528407b4d36FfaFe3da685401'; // same on all supported networks
// const chainConfigs: Record<number, ChainConfig> = {
//   1: { chainId: 1, umbraAddress, startBlock: 12343914 }, // Mainnet
//   4: { chainId: 4, umbraAddress, startBlock: 8505089 }, // Rinkeby
//   1337: { chainId: 1337, umbraAddress, startBlock: 8505089 }, // Local
// };

// export class Clrfund {
//   readonly chainConfig: ChainConfig
//   readonly umbraContract: UmbraContract

//   // ========================================= CONSTRUCTOR =========================================
//   /**
//    * @notice Create Umbra instance to interact with the Umbra contracts
//    * @param provider ethers provider to use
//    * @param chainConfig The chain configuration of the network or a network ID to use a default one
//    */
//   constructor(readonly provider: EthersProvider, chainConfig: ChainConfig | number) {
//     this.chainConfig = parseChainConfig(chainConfig)
//     this.umbraContract = new Contract(this.chainConfig.umbraAddress, abi, provider) as UmbraContract
//   }

//   // ==================================== CONTRACT INTERACTION =====================================

//   /**
//    * @notice Returns a signer with a valid provider
//    * @param signer Signer that may or may not have an associated provider
//    */
//   getConnectedSigner(signer: JsonRpcSigner | Wallet) {
//     return signer.provider ? signer : signer.connect(this.provider)
//   }
// }
