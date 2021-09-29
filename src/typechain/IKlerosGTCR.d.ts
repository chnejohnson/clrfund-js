/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface IKlerosGTCRInterface extends ethers.utils.Interface {
  functions: {
    "getItemInfo(bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getItemInfo",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "getItemInfo",
    data: BytesLike
  ): Result;

  events: {
    "ItemSubmitted(bytes32,address,uint256,bytes)": EventFragment;
    "MetaEvidence(uint256,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ItemSubmitted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MetaEvidence"): EventFragment;
}

export type ItemSubmittedEvent = TypedEvent<
  [string, string, BigNumber, string] & {
    _itemID: string;
    _submitter: string;
    _evidenceGroupID: BigNumber;
    _data: string;
  }
>;

export type MetaEvidenceEvent = TypedEvent<
  [BigNumber, string] & { _metaEvidenceID: BigNumber; _evidence: string }
>;

export class IKlerosGTCR extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IKlerosGTCRInterface;

  functions: {
    getItemInfo(
      _itemID: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber, BigNumber]>;
  };

  getItemInfo(
    _itemID: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber, BigNumber]>;

  callStatic: {
    getItemInfo(
      _itemID: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber, BigNumber]>;
  };

  filters: {
    "ItemSubmitted(bytes32,address,uint256,bytes)"(
      _itemID?: BytesLike | null,
      _submitter?: string | null,
      _evidenceGroupID?: BigNumberish | null,
      _data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      {
        _itemID: string;
        _submitter: string;
        _evidenceGroupID: BigNumber;
        _data: string;
      }
    >;

    ItemSubmitted(
      _itemID?: BytesLike | null,
      _submitter?: string | null,
      _evidenceGroupID?: BigNumberish | null,
      _data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      {
        _itemID: string;
        _submitter: string;
        _evidenceGroupID: BigNumber;
        _data: string;
      }
    >;

    "MetaEvidence(uint256,string)"(
      _metaEvidenceID?: BigNumberish | null,
      _evidence?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { _metaEvidenceID: BigNumber; _evidence: string }
    >;

    MetaEvidence(
      _metaEvidenceID?: BigNumberish | null,
      _evidence?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { _metaEvidenceID: BigNumber; _evidence: string }
    >;
  };

  estimateGas: {
    getItemInfo(
      _itemID: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getItemInfo(
      _itemID: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
