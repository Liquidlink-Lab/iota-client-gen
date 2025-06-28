import {PUBLISHED_AT} from "..";
import {GenericArg, obj, pure, vector} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function senderIsVaultCreator( tx: Transaction, vault: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::sender_is_vault_creator`, arguments: [ obj(tx, vault) ], }) }

export function assertSenderIsVaultCreator( tx: Transaction, vault: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::assert_sender_is_vault_creator`, arguments: [ obj(tx, vault) ], }) }

export interface CreateVaultArgs { u64: bigint | TransactionArgument; vecU8: Array<number | TransactionArgument> | TransactionArgument; address: string | TransactionArgument }

export function createVault( tx: Transaction, args: CreateVaultArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::create_vault`, arguments: [ pure(tx, args.u64, `u64`), pure(tx, args.vecU8, `vector<u8>`), pure(tx, args.address, `address`) ], }) }

export function putVaultAsSharedObject( tx: Transaction, vault: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::put_vault_as_shared_object`, arguments: [ obj(tx, vault) ], }) }

export interface AddCoinArgs { vault: TransactionObjectInput; coin: TransactionObjectInput }

export function addCoin( tx: Transaction, typeArg: string, args: AddCoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::add_coin`, typeArguments: [typeArg], arguments: [ obj(tx, args.vault), obj(tx, args.coin) ], }) }

export interface WithdrawCoinArgs { vault: TransactionObjectInput; u64: bigint | TransactionArgument }

export function withdrawCoin( tx: Transaction, typeArg: string, args: WithdrawCoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::withdraw_coin`, typeArguments: [typeArg], arguments: [ obj(tx, args.vault), pure(tx, args.u64, `u64`) ], }) }

export interface AddObjectsArgs { vault: TransactionObjectInput; u64: bigint | TransactionArgument; vecT0: Array<GenericArg> | TransactionArgument }

export function addObjects( tx: Transaction, typeArg: string, args: AddObjectsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::add_objects`, typeArguments: [typeArg], arguments: [ obj(tx, args.vault), pure(tx, args.u64, `u64`), vector(tx, `${typeArg}`, args.vecT0) ], }) }

export interface WithdrawObjectsArgs { vault: TransactionObjectInput; u64: bigint | TransactionArgument }

export function withdrawObjects( tx: Transaction, typeArg: string, args: WithdrawObjectsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::withdraw_objects`, typeArguments: [typeArg], arguments: [ obj(tx, args.vault), pure(tx, args.u64, `u64`) ], }) }

export interface GetClaimPassVerifyMessageArgs { vault: TransactionObjectInput; address: string | TransactionArgument }

export function getClaimPassVerifyMessage( tx: Transaction, args: GetClaimPassVerifyMessageArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::get_claim_pass_verify_message`, arguments: [ obj(tx, args.vault), pure(tx, args.address, `address`) ], }) }

export interface GetClaimPassWithSignatureArgs { vault: TransactionObjectInput; address: string | TransactionArgument; vecU8: Array<number | TransactionArgument> | TransactionArgument }

export function getClaimPassWithSignature( tx: Transaction, args: GetClaimPassWithSignatureArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::get_claim_pass_with_signature`, arguments: [ obj(tx, args.vault), pure(tx, args.address, `address`), pure(tx, args.vecU8, `vector<u8>`) ], }) }

export interface ClaimCoinsWithPassArgs { vault: TransactionObjectInput; claimPass: TransactionObjectInput }

export function claimCoinsWithPass( tx: Transaction, typeArg: string, args: ClaimCoinsWithPassArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::claim_coins_with_pass`, typeArguments: [typeArg], arguments: [ obj(tx, args.vault), obj(tx, args.claimPass) ], }) }

export interface ClaimObjectsWithPassArgs { vault: TransactionObjectInput; claimPass: TransactionObjectInput }

export function claimObjectsWithPass( tx: Transaction, typeArg: string, args: ClaimObjectsWithPassArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::claim_objects_with_pass`, typeArguments: [typeArg], arguments: [ obj(tx, args.vault), obj(tx, args.claimPass) ], }) }

export interface IncreaseReceivedCountWithPassArgs { vault: TransactionObjectInput; claimPass: TransactionObjectInput }

export function increaseReceivedCountWithPass( tx: Transaction, args: IncreaseReceivedCountWithPassArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::increase_received_count_with_pass`, arguments: [ obj(tx, args.vault), obj(tx, args.claimPass) ], }) }

export interface InternalGiveCoinToReceiverArgs { vault: TransactionObjectInput; u64: bigint | TransactionArgument; address: string | TransactionArgument }

export function internalGiveCoinToReceiver( tx: Transaction, typeArg: string, args: InternalGiveCoinToReceiverArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::internal_give_coin_to_receiver`, typeArguments: [typeArg], arguments: [ obj(tx, args.vault), pure(tx, args.u64, `u64`), pure(tx, args.address, `address`) ], }) }

export interface InternalGiveObjectToReceiverArgs { vault: TransactionObjectInput; u64: bigint | TransactionArgument; address: string | TransactionArgument }

export function internalGiveObjectToReceiver( tx: Transaction, typeArg: string, args: InternalGiveObjectToReceiverArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::internal_give_object_to_receiver`, typeArguments: [typeArg], arguments: [ obj(tx, args.vault), pure(tx, args.u64, `u64`), pure(tx, args.address, `address`) ], }) }

export function internalIncreaseReceivedCount( tx: Transaction, vault: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::internal_increase_received_count`, arguments: [ obj(tx, vault) ], }) }

export function destroyEmptyVault( tx: Transaction, vault: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::destroy_empty_vault`, arguments: [ obj(tx, vault) ], }) }
