import {PUBLISHED_AT} from "..";
import {ID} from "../../_dependencies/onchain/0x2/object/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function init( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::init`, arguments: [ ], }) }

export interface NewGasStationArgs { u64: bigint | TransactionArgument; vecAddress: Array<string | TransactionArgument> | TransactionArgument; address: string | TransactionArgument; vecU8: Array<number | TransactionArgument> | TransactionArgument }

export function newGasStation( tx: Transaction, args: NewGasStationArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::new_gas_station`, arguments: [ pure(tx, args.u64, `u64`), pure(tx, args.vecAddress, `vector<address>`), pure(tx, args.address, `address`), pure(tx, args.vecU8, `vector<u8>`) ], }) }

export interface AddAdminArgs { gasStation: TransactionObjectInput; address: string | TransactionArgument }

export function addAdmin( tx: Transaction, args: AddAdminArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::add_admin`, arguments: [ obj(tx, args.gasStation), pure(tx, args.address, `address`) ], }) }

export interface RemoveAdminArgs { gasStation: TransactionObjectInput; address: string | TransactionArgument }

export function removeAdmin( tx: Transaction, args: RemoveAdminArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::remove_admin`, arguments: [ obj(tx, args.gasStation), pure(tx, args.address, `address`) ], }) }

export interface SetGasSignerArgs { gasStation: TransactionObjectInput; address: string | TransactionArgument }

export function setGasSigner( tx: Transaction, args: SetGasSignerArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::set_gas_signer`, arguments: [ obj(tx, args.gasStation), pure(tx, args.address, `address`) ], }) }

export interface AddFundsArgs { gasStation: TransactionObjectInput; coin: TransactionObjectInput; u64: bigint | TransactionArgument }

export function addFunds( tx: Transaction, args: AddFundsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::add_funds`, arguments: [ obj(tx, args.gasStation), obj(tx, args.coin), pure(tx, args.u64, `u64`) ], }) }

export interface UpdatePublicKeyArgs { gasStation: TransactionObjectInput; vecU8: Array<number | TransactionArgument> | TransactionArgument }

export function updatePublicKey( tx: Transaction, args: UpdatePublicKeyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::update_public_key`, arguments: [ obj(tx, args.gasStation), pure(tx, args.vecU8, `vector<u8>`) ], }) }

export interface RemoveFundsArgs { gasStation: TransactionObjectInput; u64: bigint | TransactionArgument }

export function removeFunds( tx: Transaction, args: RemoveFundsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::remove_funds`, arguments: [ obj(tx, args.gasStation), pure(tx, args.u64, `u64`) ], }) }

export interface RefillFundsArgs { gasStation: TransactionObjectInput; coin: TransactionObjectInput }

export function refillFunds( tx: Transaction, args: RefillFundsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::refill_funds`, arguments: [ obj(tx, args.gasStation), obj(tx, args.coin) ], }) }

export interface CreateSignatureDataArgs { id: string | TransactionArgument; u64: bigint | TransactionArgument }

export function createSignatureData( tx: Transaction, args: CreateSignatureDataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::create_signature_data`, arguments: [ pure(tx, args.id, `${ID.$typeName}`), pure(tx, args.u64, `u64`) ], }) }

export interface RefillFundsWithSignatureArgs { gasStation: TransactionObjectInput; coin: TransactionObjectInput; vecU8: Array<number | TransactionArgument> | TransactionArgument; u64: bigint | TransactionArgument; clock: TransactionObjectInput }

export function refillFundsWithSignature( tx: Transaction, args: RefillFundsWithSignatureArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::refill_funds_with_signature`, arguments: [ obj(tx, args.gasStation), obj(tx, args.coin), pure(tx, args.vecU8, `vector<u8>`), pure(tx, args.u64, `u64`), obj(tx, args.clock) ], }) }

export interface AssertIsAdminArgs { gasStation: TransactionObjectInput; address: string | TransactionArgument }

export function assertIsAdmin( tx: Transaction, args: AssertIsAdminArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::assert_is_admin`, arguments: [ obj(tx, args.gasStation), pure(tx, args.address, `address`) ], }) }

export interface IsAdminArgs { gasStation: TransactionObjectInput; address: string | TransactionArgument }

export function isAdmin( tx: Transaction, args: IsAdminArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::gas_station::is_admin`, arguments: [ obj(tx, args.gasStation), pure(tx, args.address, `address`) ], }) }
