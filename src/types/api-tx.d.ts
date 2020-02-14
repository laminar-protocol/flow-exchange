/* eslint-disable */

import { MemberCount, ProposalIndex } from '@laminar/types/interfaces/collective';
import { Proposal } from '@laminar/types/interfaces/democracy';
import {
  AccountId,
  AccountIndex,
  Address,
  Balance,
  BalanceOf,
  Hash,
  KeyValue,
  LookupSource,
  Moment,
  Permill,
} from '@laminar/types/interfaces/runtime';
import { Key } from '@laminar/types/interfaces/system';
import { SubmittableExtrinsic } from '@polkadot/api/submittable/types';
import { Compact, Option, Vec } from '@polkadot/types/codec';
import { Bytes, bool, u64 } from '@polkadot/types/primitive';
import { AnyNumber, ITuple } from '@polkadot/types/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    system: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * A big dispatch that will disallow any other transaction to be included.
       **/
      fillBlock: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Make some on-chain remark.
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the new code.
       **/
      setCode: AugmentedSubmittable<(updated: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<(items: Vec<KeyValue> | KeyValue[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<
        (keys: Vec<Key> | (Key | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       **/
      killPrefix: AugmentedSubmittable<(prefix: Key | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    timestamp: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set the current time.
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       * The timestamp should be greater than the previous one by the amount specified by
       * `MinimumPeriod`.
       * The dispatch origin for this call must be `Inherent`.
       **/
      set: AugmentedSubmittable<(now: Compact<Moment> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    grandpa: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Report some misbehavior.
       **/
      reportMisbehavior: AugmentedSubmittable<(report: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    balances: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some liquid free balance to another account.
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * It will decrease the total issuance of the system by the `TransferFee`.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * The dispatch origin for this call must be `Signed` by the transactor.
       * # <weight>
       * - Dependent on arguments but not critical, given proper implementations for
       * input config types. See related functions below.
       * - It contains a limited number of reads and writes internally and no complex computation.
       * Related functions:
       * - `ensure_can_withdraw` is always called internally but has a bounded complexity.
       * - Transferring balances to accounts that did not exist before will cause
       * `T::OnNewAccount::on_new_account` to be called.
       * - Removing enough funds from an account will trigger
       * `T::DustRemoval::on_unbalanced` and `T::OnFreeBalanceZero::on_free_balance_zero`.
       * - `transfer_keep_alive` works the same way as `transfer`, but has an additional
       * check that the transfer will not kill the origin account.
       * # </weight>
       **/
      transfer: AugmentedSubmittable<
        (
          dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          value: Compact<Balance> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Set the balances of a given account.
       * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
       * also decrease the total issuance of the system (`TotalIssuance`).
       * If the new free or reserved balance is below the existential deposit,
       * it will reset the account nonce (`frame_system::AccountNonce`).
       * The dispatch origin for this call is `root`.
       * # <weight>
       * - Independent of the arguments.
       * - Contains a limited number of reads and writes.
       * # </weight>
       **/
      setBalance: AugmentedSubmittable<
        (
          who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          newFree: Compact<Balance> | AnyNumber | Uint8Array,
          newReserved: Compact<Balance> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Exactly as `transfer`, except the origin must be root and the source account may be
       * specified.
       **/
      forceTransfer: AugmentedSubmittable<
        (
          source: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          value: Compact<Balance> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       * 99% of the time you want [`transfer`] instead.
       * [`transfer`]: struct.Module.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<
        (
          dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          value: Compact<Balance> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
    };
    sudo: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * The dispatch origin for this call must be _Signed_.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Unknown weight of derivative `proposal` execution.
       * # </weight>
       **/
      sudo: AugmentedSubmittable<
        (proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo key.
       * The dispatch origin for this call must be _Signed_.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change.
       * # </weight>
       **/
      setKey: AugmentedSubmittable<
        (
          updated: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * The dispatch origin for this call must be _Signed_.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Unknown weight of derivative `proposal` execution.
       * # </weight>
       **/
      sudoAs: AugmentedSubmittable<
        (
          who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
    };
    operatorCollective: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set the collective's membership manually to `new_members`. Be nice to the chain and
       * provide it pre-sorted.
       * Requires root origin.
       **/
      setMembers: AugmentedSubmittable<
        (newMembers: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Dispatch a proposal from a member using the `Member` origin.
       * Origin must be a member of the collective.
       **/
      execute: AugmentedSubmittable<
        (proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * # <weight>
       * - Bounded storage reads and writes.
       * - Argument `threshold` has bearing on weight.
       * # </weight>
       **/
      propose: AugmentedSubmittable<
        (
          threshold: Compact<MemberCount> | AnyNumber | Uint8Array,
          proposal: Proposal | { callIndex?: any; args?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * # <weight>
       * - Bounded storage read and writes.
       * - Will be slightly heavier if the proposal is approved / disapproved after the vote.
       * # </weight>
       **/
      vote: AugmentedSubmittable<
        (
          proposal: Hash | string | Uint8Array,
          index: Compact<ProposalIndex> | AnyNumber | Uint8Array,
          approve: bool | boolean | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
    };
    operatorMembership: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Add a member `who` to the set.
       * May only be called from `AddOrigin` or root.
       **/
      addMember: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Remove a member `who` from the set.
       * May only be called from `RemoveOrigin` or root.
       **/
      removeMember: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Swap out one member `remove` for another `add`.
       * May only be called from `SwapOrigin` or root.
       **/
      swapMember: AugmentedSubmittable<
        (remove: AccountId | string | Uint8Array, add: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Change the membership to a new set, disregarding the existing membership. Be nice and
       * pass `members` pre-sorted.
       * May only be called from `ResetOrigin` or root.
       **/
      resetMembers: AugmentedSubmittable<
        (members: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Swap out the sending member for some other key `new`.
       * May only be called from `Signed` origin of a current member.
       **/
      changeKey: AugmentedSubmittable<(updated: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    oracle: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      feedValue: AugmentedSubmittable<
        (
          key: OracleKey | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          value: OracleValue | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      feedValues: AugmentedSubmittable<
        (
          values:
            | Vec<ITuple<[OracleKey, OracleValue]>>
            | [
                OracleKey | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
                OracleValue | AnyNumber | Uint8Array,
              ][],
        ) => SubmittableExtrinsic<ApiType>
      >;
    };
    tokens: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account.
       **/
      transfer: AugmentedSubmittable<
        (
          dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          amount: Compact<Balance> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Transfer all remaining balance to the given account.
       **/
      transferAll: AugmentedSubmittable<
        (
          dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
    };
    currencies: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account.
       **/
      transfer: AugmentedSubmittable<
        (
          dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          currencyId: CurrencyIdOf | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          amount: Compact<BalanceOf> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Transfer native currency balance from one account to another.
       **/
      transferNativeCurrency: AugmentedSubmittable<
        (
          dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          amount: Compact<BalanceOf> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      /**
       * Update balance of an account. This is a root call.
       **/
      updateBalance: AugmentedSubmittable<
        (
          who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          currencyId: CurrencyIdOf | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          amount: AmountOf | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
    };
    syntheticTokens: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      setExtremeRatio: AugmentedSubmittable<
        (
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          ratio: Permill | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      setLiquidationRatio: AugmentedSubmittable<
        (
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          ratio: Permill | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      setCollateralRatio: AugmentedSubmittable<
        (
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          ratio: Permill | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
    };
    syntheticProtocol: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      mint: AugmentedSubmittable<
        (
          poolId: LiquidityPoolId | AnyNumber | Uint8Array,
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          collateralAmount: Balance | AnyNumber | Uint8Array,
          maxSlippage: Permill | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      redeem: AugmentedSubmittable<
        (
          poolId: LiquidityPoolId | AnyNumber | Uint8Array,
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          syntheticAmount: Balance | AnyNumber | Uint8Array,
          maxSlippage: Permill | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      liquidate: AugmentedSubmittable<
        (
          poolId: LiquidityPoolId | AnyNumber | Uint8Array,
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          syntheticAmount: Balance | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      addCollateral: AugmentedSubmittable<
        (
          poolId: LiquidityPoolId | AnyNumber | Uint8Array,
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          collateralAmount: Balance | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      withdrawCollateral: AugmentedSubmittable<
        (
          poolId: LiquidityPoolId | AnyNumber | Uint8Array,
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
    };
    liquidityPools: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      createPool: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      disablePool: AugmentedSubmittable<
        (poolId: LiquidityPoolId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>
      >;
      removePool: AugmentedSubmittable<
        (poolId: LiquidityPoolId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>
      >;
      depositLiquidity: AugmentedSubmittable<
        (
          poolId: LiquidityPoolId | AnyNumber | Uint8Array,
          amount: Balance | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      withdrawLiquidity: AugmentedSubmittable<
        (
          poolId: LiquidityPoolId | AnyNumber | Uint8Array,
          amount: Balance | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      setSpread: AugmentedSubmittable<
        (
          poolId: LiquidityPoolId | AnyNumber | Uint8Array,
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          ask: Permill | AnyNumber | Uint8Array,
          bid: Permill | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      setAdditionalCollateralRatio: AugmentedSubmittable<
        (
          poolId: LiquidityPoolId | AnyNumber | Uint8Array,
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          ratio: Option<Permill> | null | object | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
      setEnabledTrades: AugmentedSubmittable<
        (
          poolId: LiquidityPoolId | AnyNumber | Uint8Array,
          currencyId: CurrencyId | ('LAMI' | 'AUSD' | 'FEUR' | 'FJPY') | number | Uint8Array,
          enabled: Leverages | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >;
    };
  }
}
