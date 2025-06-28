import {PUBLISHED_AT} from "..";
import {ID} from "../../_dependencies/onchain/0x2/object/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@iota/iota-sdk/transactions";

export interface AddAdminArgs { a0: TransactionObjectInput; a1: string | TransactionArgument }

export function addAdmin( tx: Transaction, args: AddAdminArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::add_admin`, arguments: [ obj(tx, args.a0), pure(tx, args.a1, `address`) ], }) }

export interface AddFundsArgs { a0: TransactionObjectInput; a1: TransactionObjectInput; a2: bigint | TransactionArgument }

export function addFunds( tx: Transaction, args: AddFundsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::add_funds`, arguments: [ obj(tx, args.a0), obj(tx, args.a1), pure(tx, args.a2, `u64`) ], }) }

export interface CreateSignatureDataArgs { a0: string | TransactionArgument; a1: bigint | TransactionArgument }

export function createSignatureData( tx: Transaction, args: CreateSignatureDataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::create_signature_data`, arguments: [ pure(tx, args.a0, `${ID.$typeName}`), pure(tx, args.a1, `u64`) ], }) }

export interface NewGasStationArgs { a0: bigint | TransactionArgument; a1: Array<string | TransactionArgument> | TransactionArgument; a2: string | TransactionArgument; a3: Array<number | TransactionArgument> | TransactionArgument }

export function newGasStation( tx: Transaction, args: NewGasStationArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::new_gas_station`, arguments: [ pure(tx, args.a0, `u64`), pure(tx, args.a1, `vector<address>`), pure(tx, args.a2, `address`), pure(tx, args.a3, `vector<u8>`) ], }) }

export interface RefillFundsWithSignatureArgs { a0: TransactionObjectInput; a1: TransactionObjectInput; a2: Array<number | TransactionArgument> | TransactionArgument; a3: bigint | TransactionArgument; a4: TransactionObjectInput }

export function refillFundsWithSignature( tx: Transaction, args: RefillFundsWithSignatureArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::refill_funds_with_signature`, arguments: [ obj(tx, args.a0), obj(tx, args.a1), pure(tx, args.a2, `vector<u8>`), pure(tx, args.a3, `u64`), obj(tx, args.a4) ], }) }

export interface RemoveAdminArgs { a0: TransactionObjectInput; a1: string | TransactionArgument }

export function removeAdmin( tx: Transaction, args: RemoveAdminArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::remove_admin`, arguments: [ obj(tx, args.a0), pure(tx, args.a1, `address`) ], }) }

export interface RemoveFundsArgs { a0: TransactionObjectInput; a1: bigint | TransactionArgument }

export function removeFunds( tx: Transaction, args: RemoveFundsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::remove_funds`, arguments: [ obj(tx, args.a0), pure(tx, args.a1, `u64`) ], }) }

export interface SetGasSignerArgs { a0: TransactionObjectInput; a1: string | TransactionArgument }

export function setGasSigner( tx: Transaction, args: SetGasSignerArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::set_gas_signer`, arguments: [ obj(tx, args.a0), pure(tx, args.a1, `address`) ], }) }

export interface UpdatePublicKeyArgs { a0: TransactionObjectInput; a1: Array<number | TransactionArgument> | TransactionArgument }

export function updatePublicKey( tx: Transaction, args: UpdatePublicKeyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::update_public_key`, arguments: [ obj(tx, args.a0), pure(tx, args.a1, `vector<u8>`) ], }) }
