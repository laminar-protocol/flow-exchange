/* eslint-disable */

import {
  AccountId,
  AccountIndex,
  Balance,
  BlockNumber,
  CurrencyId,
  Hash,
  Index,
  LiquidityPoolId,
  LiquidityPoolOption,
  Moment,
  OracleKey,
  Permill,
  Position,
  Weight,
} from '@laminar/types/interfaces/runtime';
import { Option, Vec } from '@polkadot/types/codec';
import { Bytes, bool, u32 } from '@polkadot/types/primitive';
import { AnyNumber, ITuple } from '@polkadot/types/types';
import { Observable } from 'rxjs';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    system: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Extrinsics nonce for accounts.
       **/
      accountNonce: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Index>> &
        QueryableStorageEntry<ApiType>;
      /**
       * Total extrinsics count for the current block.
       **/
      extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>> & QueryableStorageEntry<ApiType>;
      /**
       * Total weight for all extrinsics put together, for the current block.
       **/
      allExtrinsicsWeight: AugmentedQuery<ApiType, () => Observable<Option<Weight>>> & QueryableStorageEntry<ApiType>;
      /**
       * Total length (in bytes) for all extrinsics put together, for the current block.
       **/
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>> & QueryableStorageEntry<ApiType>;
      /**
       * Map of block numbers to block hashes.
       **/
      blockHash: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Hash>> &
        QueryableStorageEntry<ApiType>;
      /**
       * Extrinsics data for the current block (maps an extrinsic's index to its data).
       **/
      extrinsicData: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>> &
        QueryableStorageEntry<ApiType>;
      /**
       * The current block number being processed. Set by `execute_block`.
       **/
      number: AugmentedQuery<ApiType, () => Observable<BlockNumber>> & QueryableStorageEntry<ApiType>;
      /**
       * Hash of the previous block.
       **/
      parentHash: AugmentedQuery<ApiType, () => Observable<Hash>> & QueryableStorageEntry<ApiType>;
      /**
       * Extrinsics root of the current block, also part of the block header.
       **/
      extrinsicsRoot: AugmentedQuery<ApiType, () => Observable<Hash>> & QueryableStorageEntry<ApiType>;
      /**
       * Digest of the current block, also part of the block header.
       **/
      digest: AugmentedQuery<ApiType, () => Observable<DigestOf>> & QueryableStorageEntry<ApiType>;
      /**
       * Events deposited for the current block.
       **/
      events: AugmentedQuery<ApiType, () => Observable<Vec<EventRecord>>> & QueryableStorageEntry<ApiType>;
      /**
       * The number of events in the `Events<T>` list.
       **/
      eventCount: AugmentedQuery<ApiType, () => Observable<EventIndex>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping between a topic (represented by T::Hash) and a vector of indexes
       * of events in the `<Events<T>>` list.
       * All topic vectors have deterministic storage locations depending on the topic. This
       * allows light-clients to leverage the changes trie storage tracking mechanism and
       * in case of changes fetch the list of events of interest.
       * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
       * the `EventIndex` then in case if the topic has the same contents on the next block
       * no notification will be triggered thus the event might be lost.
       **/
      eventTopics: AugmentedQuery<
        ApiType,
        (arg: Hash | string | Uint8Array) => Observable<Vec<ITuple<[BlockNumber, EventIndex]>>>
      > &
        QueryableStorageEntry<ApiType>;
    };
    timestamp: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<Moment>> & QueryableStorageEntry<ApiType>;
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
    };
    grandpa: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * DEPRECATED
       * This used to store the current authority set, which has been migrated to the well-known
       * GRANDPA_AUTHORITES_KEY unhashed key.
       **/
      authorities: AugmentedQuery<ApiType, () => Observable<AuthorityList>> & QueryableStorageEntry<ApiType>;
      /**
       * State of the current authority set.
       **/
      state: AugmentedQuery<ApiType, () => Observable<StoredState>> & QueryableStorageEntry<ApiType>;
      /**
       * Pending change: (signaled at, scheduled change).
       **/
      pendingChange: AugmentedQuery<ApiType, () => Observable<Option<StoredPendingChange>>> &
        QueryableStorageEntry<ApiType>;
      /**
       * next block number where we can force a change.
       **/
      nextForced: AugmentedQuery<ApiType, () => Observable<Option<BlockNumber>>> & QueryableStorageEntry<ApiType>;
      /**
       * `true` if we are currently stalled.
       **/
      stalled: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[BlockNumber, BlockNumber]>>>> &
        QueryableStorageEntry<ApiType>;
      /**
       * The number of changes (both in terms of keys and underlying economic responsibilities)
       * in the "set" of Grandpa validators from genesis.
       **/
      currentSetId: AugmentedQuery<ApiType, () => Observable<SetId>> & QueryableStorageEntry<ApiType>;
      /**
       * A mapping from grandpa set ID to the index of the *most recent* session for which its members were responsible.
       **/
      setIdSession: AugmentedQuery<ApiType, (arg: SetId | AnyNumber | Uint8Array) => Observable<Option<SessionIndex>>> &
        QueryableStorageEntry<ApiType>;
    };
    indices: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The next free enumeration set.
       **/
      nextEnumSet: AugmentedQuery<ApiType, () => Observable<AccountIndex>> & QueryableStorageEntry<ApiType>;
      /**
       * The enumeration sets.
       **/
      enumSet: AugmentedQuery<ApiType, (arg: AccountIndex | AnyNumber | Uint8Array) => Observable<Vec<AccountId>>> &
        QueryableStorageEntry<ApiType>;
    };
    balances: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The total units issued in the system.
       **/
      totalIssuance: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Information regarding the vesting of a given account.
       **/
      vesting: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<VestingSchedule>>> &
        QueryableStorageEntry<ApiType>;
      /**
       * The 'free' balance of a given account.
       * This is the only balance that matters in terms of most operations on tokens. It
       * alone is used to determine the balance when in the contract execution environment. When this
       * balance falls below the value of `ExistentialDeposit`, then the 'current account' is
       * deleted: specifically `FreeBalance`. Further, the `OnFreeBalanceZero` callback
       * is invoked, giving a chance to external modules to clean up data associated with
       * the deleted account.
       * `frame_system::AccountNonce` is also deleted if `ReservedBalance` is also zero (it also gets
       * collapsed to zero if it ever becomes less than `ExistentialDeposit`.
       **/
      freeBalance: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Balance>> &
        QueryableStorageEntry<ApiType>;
      /**
       * The amount of the balance of a given account that is externally reserved; this can still get
       * slashed, but gets slashed last of all.
       * This balance is a 'reserve' balance that other subsystems use in order to set aside tokens
       * that are still 'owned' by the account holder, but which are suspendable.
       * When this balance falls below the value of `ExistentialDeposit`, then this 'reserve account'
       * is deleted: specifically, `ReservedBalance`.
       * `frame_system::AccountNonce` is also deleted if `FreeBalance` is also zero (it also gets
       * collapsed to zero if it ever becomes less than `ExistentialDeposit`.)
       **/
      reservedBalance: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Balance>> &
        QueryableStorageEntry<ApiType>;
      /**
       * Any liquidity locks on some account balances.
       **/
      locks: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<BalanceLock>>> &
        QueryableStorageEntry<ApiType>;
    };
    transactionPayment: {
      [index: string]: QueryableStorageEntry<ApiType>;
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<Multiplier>> & QueryableStorageEntry<ApiType>;
    };
    sudo: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The `AccountId` of the sudo key.
       **/
      key: AugmentedQuery<ApiType, () => Observable<AccountId>> & QueryableStorageEntry<ApiType>;
    };
    randomnessCollectiveFlip: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>> & QueryableStorageEntry<ApiType>;
    };
    operatorCollective: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The hashes of the active proposals.
       **/
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>> & QueryableStorageEntry<ApiType>;
      /**
       * Actual proposal for a given hash, if it's current.
       **/
      proposalOf: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Proposal>>> &
        QueryableStorageEntry<ApiType>;
      /**
       * Votes on a given proposal, if it is ongoing.
       **/
      voting: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Votes>>> &
        QueryableStorageEntry<ApiType>;
      /**
       * Proposals so far.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * The current members of the collective. This is stored sorted (just by value).
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>> & QueryableStorageEntry<ApiType>;
    };
    operatorMembership: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The current membership, stored as an ordered Vec.
       **/
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>> & QueryableStorageEntry<ApiType>;
    };
    oracle: {
      [index: string]: QueryableStorageEntry<ApiType>;
      rawValues: AugmentedQuery<
        ApiType,
        (
          key1: OracleKey | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | number | Uint8Array,
          key2: AccountId | string | Uint8Array,
        ) => Observable<Option<TimestampedValueOf>>
      > &
        QueryableStorageEntry<ApiType>;
      hasUpdate: AugmentedQuery<
        ApiType,
        (arg: OracleKey | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | number | Uint8Array) => Observable<bool>
      > &
        QueryableStorageEntry<ApiType>;
      values: AugmentedQuery<
        ApiType,
        (
          arg: OracleKey | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | number | Uint8Array,
        ) => Observable<Option<TimestampedValueOf>>
      > &
        QueryableStorageEntry<ApiType>;
    };
    tokens: {
      [index: string]: QueryableStorageEntry<ApiType>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<
        ApiType,
        (arg: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | number | Uint8Array) => Observable<Balance>
      > &
        QueryableStorageEntry<ApiType>;
      /**
       * The balance of a token type under an account.
       **/
      balance: AugmentedQuery<
        ApiType,
        (
          key1: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | number | Uint8Array,
          key2: AccountId | string | Uint8Array,
        ) => Observable<Balance>
      > &
        QueryableStorageEntry<ApiType>;
    };
    prices: {
      [index: string]: QueryableStorageEntry<ApiType>;
    };
    syntheticTokens: {
      [index: string]: QueryableStorageEntry<ApiType>;
      extremeRatio: AugmentedQuery<
        ApiType,
        (arg: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | number | Uint8Array) => Observable<Option<Permill>>
      > &
        QueryableStorageEntry<ApiType>;
      liquidationRatio: AugmentedQuery<
        ApiType,
        (arg: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | number | Uint8Array) => Observable<Option<Permill>>
      > &
        QueryableStorageEntry<ApiType>;
      collateralRatio: AugmentedQuery<
        ApiType,
        (arg: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | number | Uint8Array) => Observable<Option<Permill>>
      > &
        QueryableStorageEntry<ApiType>;
      positions: AugmentedQuery<ApiType, (arg: ITuple<[LiquidityPoolId, CurrencyId]>) => Observable<Position>> &
        QueryableStorageEntry<ApiType>;
    };
    liquidityPools: {
      [index: string]: QueryableStorageEntry<ApiType>;
      nextPoolId: AugmentedQuery<ApiType, () => Observable<LiquidityPoolId>> & QueryableStorageEntry<ApiType>;
      owners: AugmentedQuery<
        ApiType,
        (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Option<AccountId>>
      > &
        QueryableStorageEntry<ApiType>;
      liquidityPoolOptions: AugmentedQuery<
        ApiType,
        (
          key1: LiquidityPoolId | AnyNumber | Uint8Array,
          key2: CurrencyId | 'LAMI' | 'AUSD' | 'FEUR' | 'FJPY' | number | Uint8Array,
        ) => Observable<Option<LiquidityPoolOption>>
      > &
        QueryableStorageEntry<ApiType>;
      balances: AugmentedQuery<ApiType, (arg: LiquidityPoolId | AnyNumber | Uint8Array) => Observable<Balance>> &
        QueryableStorageEntry<ApiType>;
    };
  }
}
