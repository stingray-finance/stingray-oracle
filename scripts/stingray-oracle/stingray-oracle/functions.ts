import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/ascii/structs";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface GetPriceArgs { self: TransactionObjectInput; clock: TransactionObjectInput; coinType: string | TransactionArgument }

export function getPrice( tx: Transaction, args: GetPriceArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::get_price`, arguments: [ obj(tx, args.self), obj(tx, args.clock), pure(tx, args.coinType, `${String.$typeName}`) ], }) }

export function init( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::init`, arguments: [ ], }) }

export interface UpdateToleranceMsArgs { self: TransactionObjectInput; newToleranceMs: bigint | TransactionArgument }

export function updateToleranceMs( tx: Transaction, typeArg: string, args: UpdateToleranceMsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::update_tolerance_ms`, typeArguments: [typeArg], arguments: [ obj(tx, args.self), pure(tx, args.newToleranceMs, `u64`) ], }) }

export function activate( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::activate`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export interface AddVersionArgs { self: TransactionObjectInput; adminCap: TransactionObjectInput; newVersion: bigint | TransactionArgument }

export function addVersion( tx: Transaction, args: AddVersionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::add_version`, arguments: [ obj(tx, args.self), obj(tx, args.adminCap), pure(tx, args.newVersion, `u64`) ], }) }

export interface BorrowOracleAggregatorArgs { self: TransactionObjectInput; coinType: string | TransactionArgument }

export function borrowOracleAggregator( tx: Transaction, args: BorrowOracleAggregatorArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::borrow_oracle_aggregator`, arguments: [ obj(tx, args.self), pure(tx, args.coinType, `${String.$typeName}`) ], }) }

export interface BorrowOracleAggregatorMutArgs { self: TransactionObjectInput; coinType: string | TransactionArgument }

export function borrowOracleAggregatorMut( tx: Transaction, args: BorrowOracleAggregatorMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::borrow_oracle_aggregator_mut`, arguments: [ obj(tx, args.self), pure(tx, args.coinType, `${String.$typeName}`) ], }) }

export function deactivate( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::deactivate`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export function errAssetAlreadyExisted( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::err_asset_already_existed`, arguments: [ ], }) }

export function errOracleAggregatorNotActive( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::err_oracle_aggregator_not_active`, arguments: [ ], }) }

export function errPriceExpired( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::err_price_expired`, arguments: [ ], }) }

export function errVersionAlreadyExisted( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::err_version_already_existed`, arguments: [ ], }) }

export function errVersionNotAllowed( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::err_version_not_allowed`, arguments: [ ], }) }

export function errVersionNotExisted( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::err_version_not_existed`, arguments: [ ], }) }

export interface IsPriceSupportedArgs { self: TransactionObjectInput; coinType: TransactionObjectInput }

export function isPriceSupported( tx: Transaction, args: IsPriceSupportedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::is_price_supported`, arguments: [ obj(tx, args.self), obj(tx, args.coinType) ], }) }

export function isVersionAllowed( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::is_version_allowed`, arguments: [ obj(tx, self) ], }) }

export function newOracle( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::new_oracle`, arguments: [ ], }) }

export interface NewOracleAggregatorArgs { self: TransactionObjectInput; adminCap: TransactionObjectInput; pyth: (string | TransactionArgument | TransactionArgument | null); switchboard: (string | TransactionArgument | TransactionArgument | null); supra: (number | TransactionArgument | TransactionArgument | null); decimals: number | TransactionArgument; toleranceMs: bigint | TransactionArgument }

export function newOracleAggregator( tx: Transaction, typeArg: string, args: NewOracleAggregatorArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::new_oracle_aggregator`, typeArguments: [typeArg], arguments: [ obj(tx, args.self), obj(tx, args.adminCap), pure(tx, args.pyth, `${Option.$typeName}<address>`), pure(tx, args.switchboard, `${Option.$typeName}<address>`), pure(tx, args.supra, `${Option.$typeName}<u32>`), pure(tx, args.decimals, `u8`), pure(tx, args.toleranceMs, `u64`) ], }) }

export interface RemoveVersionArgs { self: TransactionObjectInput; adminCap: TransactionObjectInput; toRemoveVersion: bigint | TransactionArgument }

export function removeVersion( tx: Transaction, args: RemoveVersionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::remove_version`, arguments: [ obj(tx, args.self), obj(tx, args.adminCap), pure(tx, args.toRemoveVersion, `u64`) ], }) }

export interface UpdatePriceByPythArgs { self: TransactionObjectInput; priceInfoObject: TransactionObjectInput; clock: TransactionObjectInput }

export function updatePriceByPyth( tx: Transaction, typeArg: string, args: UpdatePriceByPythArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::update_price_by_pyth`, typeArguments: [typeArg], arguments: [ obj(tx, args.self), obj(tx, args.priceInfoObject), obj(tx, args.clock) ], }) }

export interface UpdatePriceBySupraArgs { self: TransactionObjectInput; supraHolder: TransactionObjectInput; pairId: number | TransactionArgument; clock: TransactionObjectInput }

export function updatePriceBySupra( tx: Transaction, typeArg: string, args: UpdatePriceBySupraArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::update_price_by_supra`, typeArguments: [typeArg], arguments: [ obj(tx, args.self), obj(tx, args.supraHolder), pure(tx, args.pairId, `u32`), obj(tx, args.clock) ], }) }

export interface UpdatePriceBySwitchboardArgs { self: TransactionObjectInput; aggregator: TransactionObjectInput; clock: TransactionObjectInput }

export function updatePriceBySwitchboard( tx: Transaction, typeArg: string, args: UpdatePriceBySwitchboardArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::update_price_by_switchboard`, typeArguments: [typeArg], arguments: [ obj(tx, args.self), obj(tx, args.aggregator), obj(tx, args.clock) ], }) }

export interface UpdatePythArgs { self: TransactionObjectInput; adminCap: TransactionObjectInput; newPyth: (string | TransactionArgument | TransactionArgument | null) }

export function updatePyth( tx: Transaction, typeArg: string, args: UpdatePythArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::update_pyth`, typeArguments: [typeArg], arguments: [ obj(tx, args.self), obj(tx, args.adminCap), pure(tx, args.newPyth, `${Option.$typeName}<address>`) ], }) }

export interface UpdateSupraArgs { self: TransactionObjectInput; adminCap: TransactionObjectInput; newSupra: (number | TransactionArgument | TransactionArgument | null) }

export function updateSupra( tx: Transaction, typeArg: string, args: UpdateSupraArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::update_supra`, typeArguments: [typeArg], arguments: [ obj(tx, args.self), obj(tx, args.adminCap), pure(tx, args.newSupra, `${Option.$typeName}<u32>`) ], }) }

export interface UpdateSwitchboardArgs { self: TransactionObjectInput; adminCap: TransactionObjectInput; newSwitchboard: (string | TransactionArgument | TransactionArgument | null) }

export function updateSwitchboard( tx: Transaction, typeArg: string, args: UpdateSwitchboardArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::stingray_oracle::update_switchboard`, typeArguments: [typeArg], arguments: [ obj(tx, args.self), obj(tx, args.adminCap), pure(tx, args.newSwitchboard, `${Option.$typeName}<address>`) ], }) }
