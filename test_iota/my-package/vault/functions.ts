import {PUBLISHED_AT} from "..";
import {GenericArg, obj, pure, vector} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@iota/iota-sdk/transactions";

export interface AddCoinArgs { a0: TransactionObjectInput; a1: TransactionObjectInput }

export function addCoin( tx: Transaction, typeArg: string, args: AddCoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::add_coin`, typeArguments: [typeArg], arguments: [ obj(tx, args.a0), obj(tx, args.a1) ], }) }

export interface AddObjectsArgs { a0: TransactionObjectInput; a1: bigint | TransactionArgument; a2: Array<GenericArg> | TransactionArgument }

export function addObjects( tx: Transaction, typeArg: string, args: AddObjectsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::add_objects`, typeArguments: [typeArg], arguments: [ obj(tx, args.a0), pure(tx, args.a1, `u64`), vector(tx, `${typeArg}`, args.a2) ], }) }

export interface ClaimCoinsWithPassArgs { a0: TransactionObjectInput; a1: TransactionObjectInput }

export function claimCoinsWithPass( tx: Transaction, typeArg: string, args: ClaimCoinsWithPassArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::claim_coins_with_pass`, typeArguments: [typeArg], arguments: [ obj(tx, args.a0), obj(tx, args.a1) ], }) }

export interface ClaimObjectsWithPassArgs { a0: TransactionObjectInput; a1: TransactionObjectInput }

export function claimObjectsWithPass( tx: Transaction, typeArg: string, args: ClaimObjectsWithPassArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::claim_objects_with_pass`, typeArguments: [typeArg], arguments: [ obj(tx, args.a0), obj(tx, args.a1) ], }) }

export interface CreateVaultArgs { a0: bigint | TransactionArgument; a1: Array<number | TransactionArgument> | TransactionArgument; a2: string | TransactionArgument }

export function createVault( tx: Transaction, args: CreateVaultArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::create_vault`, arguments: [ pure(tx, args.a0, `u64`), pure(tx, args.a1, `vector<u8>`), pure(tx, args.a2, `address`) ], }) }

export function destroyEmptyVault( tx: Transaction, a0: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::destroy_empty_vault`, arguments: [ obj(tx, a0) ], }) }

export interface GetClaimPassVerifyMessageArgs { a0: TransactionObjectInput; a1: string | TransactionArgument }

export function getClaimPassVerifyMessage( tx: Transaction, args: GetClaimPassVerifyMessageArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::get_claim_pass_verify_message`, arguments: [ obj(tx, args.a0), pure(tx, args.a1, `address`) ], }) }

export interface GetClaimPassWithSignatureArgs { a0: TransactionObjectInput; a1: string | TransactionArgument; a2: Array<number | TransactionArgument> | TransactionArgument }

export function getClaimPassWithSignature( tx: Transaction, args: GetClaimPassWithSignatureArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::get_claim_pass_with_signature`, arguments: [ obj(tx, args.a0), pure(tx, args.a1, `address`), pure(tx, args.a2, `vector<u8>`) ], }) }

export interface IncreaseReceivedCountWithPassArgs { a0: TransactionObjectInput; a1: TransactionObjectInput }

export function increaseReceivedCountWithPass( tx: Transaction, args: IncreaseReceivedCountWithPassArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::increase_received_count_with_pass`, arguments: [ obj(tx, args.a0), obj(tx, args.a1) ], }) }

export function putVaultAsSharedObject( tx: Transaction, a0: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::put_vault_as_shared_object`, arguments: [ obj(tx, a0) ], }) }

export interface WithdrawCoinArgs { a0: TransactionObjectInput; a1: bigint | TransactionArgument }

export function withdrawCoin( tx: Transaction, typeArg: string, args: WithdrawCoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::withdraw_coin`, typeArguments: [typeArg], arguments: [ obj(tx, args.a0), pure(tx, args.a1, `u64`) ], }) }

export interface WithdrawObjectsArgs { a0: TransactionObjectInput; a1: bigint | TransactionArgument }

export function withdrawObjects( tx: Transaction, typeArg: string, args: WithdrawObjectsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vault::withdraw_objects`, typeArguments: [typeArg], arguments: [ obj(tx, args.a0), pure(tx, args.a1, `u64`) ], }) }
