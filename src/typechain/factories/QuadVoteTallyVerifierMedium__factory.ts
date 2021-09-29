/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  QuadVoteTallyVerifierMedium,
  QuadVoteTallyVerifierMediumInterface,
} from "../QuadVoteTallyVerifierMedium";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "a",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "b",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "c",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[]",
        name: "input",
        type: "uint256[]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061194c806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063c32e370e14610030575b600080fd5b6101e2600480360361012081101561004757600080fd5b8101908080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505091929192908060800190600280602002604051908101604052809291906000905b828210156100fc578382604002016002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050815260200190600101906100a8565b50505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505091929192908035906020019064010000000081111561015f57600080fd5b82018360208201111561017157600080fd5b8035906020019184602083028401116401000000008311171561019357600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192905050506101fa565b60405180821515815260200191505060405180910390f35b6000610204611746565b60405180604001604052808760006002811061021c57fe5b602002015181526020018760016002811061023357fe5b60200201518152508160000181905250604051806040016040528060405180604001604052808860006002811061026657fe5b602002015160006002811061027757fe5b602002015181526020018860006002811061028e57fe5b602002015160016002811061029f57fe5b602002015181525081526020016040518060400160405280886001600281106102c457fe5b60200201516000600281106102d557fe5b60200201518152602001886001600281106102ec57fe5b60200201516001600281106102fd57fe5b6020020151815250815250816020018190525060405180604001604052808560006002811061032857fe5b602002015181526020018560016002811061033f57fe5b60200201518152508160400181905250610357611779565b61035f610a11565b90506103696117c6565b604051806040016040528060008152602001600081525090507f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd478360000151600001511061041f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f76657269666965722d61582d6774652d7072696d652d7100000000000000000081525060200191505060405180910390fd5b7f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47836000015160200151106104bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f76657269666965722d61592d6774652d7072696d652d7100000000000000000081525060200191505060405180910390fd5b7f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd478360200151600001516000600281106104f257fe5b60200201511061056a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f76657269666965722d6258302d6774652d7072696d652d71000000000000000081525060200191505060405180910390fd5b7f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd478360200151602001516000600281106105a057fe5b602002015110610618576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f76657269666965722d6259302d6774652d7072696d652d71000000000000000081525060200191505060405180910390fd5b7f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4783602001516000015160016002811061064e57fe5b6020020151106106c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f76657269666965722d6258312d6774652d7072696d652d71000000000000000081525060200191505060405180910390fd5b7f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd478360200151602001516001600281106106fc57fe5b602002015110610774576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f76657269666965722d6259312d6774652d7072696d652d71000000000000000081525060200191505060405180910390fd5b7f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4783604001516000015110610811576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f76657269666965722d63582d6774652d7072696d652d7100000000000000000081525060200191505060405180910390fd5b7f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47836040015160200151106108ae576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f76657269666965722d63592d6774652d7072696d652d7100000000000000000081525060200191505060405180910390fd5b60005b600a8110156109ae577f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018682815181106108e757fe5b602002602001015110610962576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f76657269666965722d6774652d736e61726b2d7363616c61722d6669656c640081525060200191505060405180910390fd5b61099f8261099a856080015160018501600b811061097c57fe5b602002015189858151811061098d57fe5b6020026020010151611181565b61127c565b915080806001019150506108b1565b506109ce8183608001516000600b81106109c457fe5b602002015161127c565b9050610a046109e08460000151611396565b84602001518460000151856020015185876040015189604001518960600151611449565b9350505050949350505050565b610a19611779565b60405180604001604052807f1d72566595f9c57248a46f560827b9b694d66da5eb69262a61e03eaaed02653981526020017f258448c178368837fb6edf8fa162fd5f33f99edf8925eb7a2f4f957adbacc53f8152508160000181905250604051806040016040528060405180604001604052807f01f46731345929d5c0e8f4446a8f21ebd456f6edfe2fec9f32678213a3bb15a781526020017f2a97d7883270cf9b8f25c41e87103cfeeccd24fb2849ddb4223e26308df6affd815250815260200160405180604001604052807f0d4ac17d913c2cd274c0740bf1e940f2d9939273a4a1e5ad1a76d86b60aafb4481526020017f29fd0384e4df7cb0cffe9ecd8824f95373d7398d563369a4fba28eda160417698152508152508160200181905250604051806040016040528060405180604001604052807f2ffd4b3baf733ac1c691c713044b91a87637a2b7966018f958f7d6749447bb0681526020017f15ec36fd1d9c27be98052776868260ebf703d197594844c78a4bf3371abc1930815250815260200160405180604001604052807f11b7fa73418bad32d23d3504e4f34f3323b646be7ef35bb63f5de5b6d269812781526020017f05b9190d04aa9791b22065346fc5d9dc35021820327873383df564c7db566a708152508152508160400181905250604051806040016040528060405180604001604052807f2fea31e675fd74af2aeb4fc30084ed234e6c9813a814aaae97d1e8143b9b8ed081526020017f19d812377eeaf34d9f6d0cd6d157a4113d2953deb415dfc7b2bc60a7810761da815250815260200160405180604001604052807f272a8bcaf3352634bfe1f06726c5f2df9a010b2d6a7ce9db32503fa0a5ebda8681526020017f11041d6d7915ffa10bdc85810d90dd0d48d933710e899fbf54d894c0013d357f815250815250816060018190525060405180604001604052807f25c710fd6be1b912deb32ec26bc358a67f77ea713a6d1e6baef08dfc95399e9a81526020017f0dab4e19cc02761aca6caa56c1ace0a1dd533f28b2bcc4d1235723e80067230781525081608001516000600b8110610d2b57fe5b602002018190525060405180604001604052807f3053ba9f2b5d068204719871082cf815b91c82c6e363b51cbd3dc04c0192790181526020017e9b71adca4ed97488591e12dbdfdae1862602d4f0705860302ac91b8ef96bbe81525081608001516001600b8110610d9857fe5b602002018190525060405180604001604052807f202a2f4ac76eb60ee52fa951c969d539207af31052f1e41f5caf696282c9201181526020017f0722fe7c0132992ab56a993dfebcc8da3fc861021d40c033a7b84a2a470fa2df81525081608001516002600b8110610e0657fe5b602002018190525060405180604001604052807f1fc70c252eb6fdb93b85ef917b8078949bc8109c08ff77d4880a2a05006fcca781526020017f11c4a1b5490ba7d1c277a7eeceba0027285dc0ec9162ea08ce8aac2ef373aac981525081608001516003600b8110610e7457fe5b602002018190525060405180604001604052807f24dde77af5a08080882f1d6dd588654b2748c7aacce6796a5647c9f14fbbb7c281526020017f2fc5f3801b717a34a2be1fc70aed43c96c7474cc0b2d3454991772e26993d14881525081608001516004600b8110610ee257fe5b602002018190525060405180604001604052807f22ca62ddcc7f4be16c4c0e243f5df156cc18373dcdb15cd048da8442e83df12681526020017f2f2b4b9058bb5ae449062a279bbfcf87cafddc7d78df9ddee63d5d621ae6738281525081608001516005600b8110610f5057fe5b602002018190525060405180604001604052807f23686a482ca82576b191a75fa9d8b0bceca3b4f662cdf1244e1c7d61532476e081526020017f107a7369e29acb515862ed528c9b391ce4aa400d436ac5f0b6701e36f72a8b5e81525081608001516006600b8110610fbe57fe5b602002018190525060405180604001604052807f2dfc9721f9a96f024b129842c764557969d7e7ecdef0976964ee10d1e88cc2e781526020017f04f3f3a1f8b9abef7ff1ac07920eb5fd6d1a7913e57a9d2a932b61a412acca8e81525081608001516007600b811061102c57fe5b602002018190525060405180604001604052807f2ff1c468fc2f701590e8aa3ba56bd99f0f02f2c145fc41674aee82bb59f086fb81526020017f0378ddbb4c1251597a6c1a34ee98babeaafcaf67a5a523130d8545a0d5d28e4c81525081608001516008600b811061109a57fe5b602002018190525060405180604001604052807f2078ff92fe09635aa55508d97031d4396612d2c465a7bac676a7f4bf429b56aa81526020017f1fea60ec8d081dd59174ff15d24f886df60f5c9c30f587985fb8e44fa8c7beff81525081608001516009600b811061110857fe5b602002018190525060405180604001604052807f08fb8204b5dae2e70be170cc6a07dc7ab0bccfb7f04db03f063386312a5ca41e81526020017f24b11319364845912ddae804a82f1425abd12b505a7086551117b288b155b97f8152508160800151600a600b811061117657fe5b602002018190525090565b6111896117c6565b6111916117e0565b8360000151816000600381106111a357fe5b6020020181815250508360200151816001600381106111be57fe5b60200201818152505082816002600381106111d557fe5b602002018181525050600060608360808460076107d05a03fa905080600081146111fe57611200565bfe5b5080611274576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f70616972696e672d6d756c2d6661696c6564000000000000000000000000000081525060200191505060405180910390fd5b505092915050565b6112846117c6565b61128c611802565b83600001518160006004811061129e57fe5b6020020181815250508360200151816001600481106112b957fe5b6020020181815250508260000151816002600481106112d457fe5b6020020181815250508260200151816003600481106112ef57fe5b602002018181525050600060608360c08460066107d05a03fa905080600081146113185761131a565bfe5b508061138e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f70616972696e672d6164642d6661696c6564000000000000000000000000000081525060200191505060405180910390fd5b505092915050565b61139e6117c6565b600082600001511480156113b6575060008260200151145b156113d95760405180604001604052806000815260200160008152509050611444565b6040518060400160405280836000015181526020017f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4784602001518161141b57fe5b067f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd470381525090505b919050565b6000611453611824565b60405180608001604052808b815260200189815260200187815260200185815250905061147e611851565b60405180608001604052808b815260200189815260200187815260200185815250905060006018905060608167ffffffffffffffff811180156114c057600080fd5b506040519080825280602002602001820160405280156114ef5781602001602082028036833780820191505090505b50905060005b600481101561167857600060068202905085826004811061151257fe5b60200201516000015183600083018151811061152a57fe5b60200260200101818152505085826004811061154257fe5b60200201516020015183600183018151811061155a57fe5b60200260200101818152505084826004811061157257fe5b60200201516000015160006002811061158757fe5b602002015183600283018151811061159b57fe5b6020026020010181815250508482600481106115b357fe5b6020020151600001516001600281106115c857fe5b60200201518360038301815181106115dc57fe5b6020026020010181815250508482600481106115f457fe5b60200201516020015160006002811061160957fe5b602002015183600483018151811061161d57fe5b60200260200101818152505084826004811061163557fe5b60200201516020015160016002811061164a57fe5b602002015183600583018151811061165e57fe5b6020026020010181815250505080806001019150506114f5565b5061168161187e565b6000602082602086026020860160086107d05a03fa905080600081146116a6576116a8565bfe5b508061171c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f70616972696e672d6f70636f64652d6661696c6564000000000000000000000081525060200191505060405180910390fd5b60008260006001811061172b57fe5b60200201511415965050505050505098975050505050505050565b60405180606001604052806117596117c6565b81526020016117666118a0565b81526020016117736117c6565b81525090565b6040518060a0016040528061178c6117c6565b81526020016117996118a0565b81526020016117a66118a0565b81526020016117b36118a0565b81526020016117c06118c6565b81525090565b604051806040016040528060008152602001600081525090565b6040518060600160405280600390602082028036833780820191505090505090565b6040518060800160405280600490602082028036833780820191505090505090565b60405180608001604052806004905b61183b6117c6565b8152602001906001900390816118335790505090565b60405180608001604052806004905b6118686118a0565b8152602001906001900390816118605790505090565b6040518060200160405280600190602082028036833780820191505090505090565b60405180604001604052806118b36118f4565b81526020016118c06118f4565b81525090565b604051806101600160405280600b905b6118de6117c6565b8152602001906001900390816118d65790505090565b604051806040016040528060029060208202803683378082019150509050509056fea26469706673582212209a55728cfa5a5aabd88ddae68eaa158f61658302381bd970d95ebd38820c11fb64736f6c634300060c0033";

export class QuadVoteTallyVerifierMedium__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<QuadVoteTallyVerifierMedium> {
    return super.deploy(
      overrides || {}
    ) as Promise<QuadVoteTallyVerifierMedium>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): QuadVoteTallyVerifierMedium {
    return super.attach(address) as QuadVoteTallyVerifierMedium;
  }
  connect(signer: Signer): QuadVoteTallyVerifierMedium__factory {
    return super.connect(signer) as QuadVoteTallyVerifierMedium__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QuadVoteTallyVerifierMediumInterface {
    return new utils.Interface(_abi) as QuadVoteTallyVerifierMediumInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): QuadVoteTallyVerifierMedium {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as QuadVoteTallyVerifierMedium;
  }
}
