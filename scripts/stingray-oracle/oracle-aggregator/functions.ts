import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/ascii/structs";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function decimals( tx: Transaction, priceInfo: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::decimals`, arguments: [ obj(tx, priceInfo) ], }) }

export function price( tx: Transaction, priceInfo: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::price`, arguments: [ obj(tx, priceInfo) ], }) }

export interface NewArgs { coinType: string | TransactionArgument; pyth: (string | TransactionArgument | TransactionArgument | null); switchboard: (string | TransactionArgument | TransactionArgument | null); supra: (number | TransactionArgument | TransactionArgument | null); decimals: number | TransactionArgument; toleranceMs: bigint | TransactionArgument }

export function new_( tx: Transaction, args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::new`, arguments: [ pure(tx, args.coinType, `${String.$typeName}`), pure(tx, args.pyth, `${Option.$typeName}<address>`), pure(tx, args.switchboard, `${Option.$typeName}<address>`), pure(tx, args.supra, `${Option.$typeName}<u32>`), pure(tx, args.decimals, `u8`), pure(tx, args.toleranceMs, `u64`) ], }) }

export function priceInfo( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::price_info`, arguments: [ obj(tx, self) ], }) }

export function isActive( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::is_active`, arguments: [ obj(tx, self) ], }) }

export function toleranceMs( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::tolerance_ms`, arguments: [ obj(tx, self) ], }) }

export function activateAggregator( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::activate_aggregator`, arguments: [ obj(tx, self) ], }) }

export interface AddPriceFromPythArgs { sources: TransactionObjectInput; coinType: TransactionObjectInput; oracleAggregator: TransactionObjectInput; priceInfoObject: TransactionObjectInput; clock: TransactionObjectInput }

export function addPriceFromPyth( tx: Transaction, args: AddPriceFromPythArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::add_price_from_pyth`, arguments: [ obj(tx, args.sources), obj(tx, args.coinType), obj(tx, args.oracleAggregator), obj(tx, args.priceInfoObject), obj(tx, args.clock) ], }) }

export interface AddPriceFromSupraArgs { sources: TransactionObjectInput; coinType: TransactionObjectInput; oracleAggregator: TransactionObjectInput; supraHolder: TransactionObjectInput; pairId: number | TransactionArgument }

export function addPriceFromSupra( tx: Transaction, args: AddPriceFromSupraArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::add_price_from_supra`, arguments: [ obj(tx, args.sources), obj(tx, args.coinType), obj(tx, args.oracleAggregator), obj(tx, args.supraHolder), pure(tx, args.pairId, `u32`) ], }) }

export interface AddPriceFromSwitchboardArgs { sources: TransactionObjectInput; coinType: TransactionObjectInput; oracleAggregator: TransactionObjectInput; aggregator: TransactionObjectInput }

export function addPriceFromSwitchboard( tx: Transaction, args: AddPriceFromSwitchboardArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::add_price_from_switchboard`, arguments: [ obj(tx, args.sources), obj(tx, args.coinType), obj(tx, args.oracleAggregator), obj(tx, args.aggregator) ], }) }

export function addRule( tx: Transaction, typeArg: string, oracleAggregator: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::add_rule`, typeArguments: [typeArg], arguments: [ obj(tx, oracleAggregator) ], }) }

export function borrowPyth( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::borrow_pyth`, arguments: [ obj(tx, self) ], }) }

export function borrowSupra( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::borrow_supra`, arguments: [ obj(tx, self) ], }) }

export function borrowSwitchboard( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::borrow_switchboard`, arguments: [ obj(tx, self) ], }) }

export function deactivateAggregator( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::deactivate_aggregator`, arguments: [ obj(tx, self) ], }) }

export function errNoValidPrice( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::err_no_valid_price`, arguments: [ ], }) }

export function errRuleNotSupported( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::err_rule_not_supported`, arguments: [ ], }) }

export function errSignificantPriceDiff( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::err_significant_price_diff`, arguments: [ ], }) }

export function errWrongSource( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::err_wrong_source`, arguments: [ ], }) }

export function latestUpdateMs( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::latest_update_ms`, arguments: [ obj(tx, self) ], }) }

export function newPriceSources( tx: Transaction, coinType: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::new_price_sources`, arguments: [ obj(tx, coinType) ], }) }

export function oracleAmount( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::oracle_amount`, arguments: [ obj(tx, self) ], }) }

export function removeRule( tx: Transaction, typeArg: string, oracleAggregator: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::remove_rule`, typeArguments: [typeArg], arguments: [ obj(tx, oracleAggregator) ], }) }

export interface SetPythArgs { self: TransactionObjectInput; newPyth: (string | TransactionArgument | TransactionArgument | null) }

export function setPyth( tx: Transaction, args: SetPythArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::set_pyth`, arguments: [ obj(tx, args.self), pure(tx, args.newPyth, `${Option.$typeName}<address>`) ], }) }

export interface SetSupraArgs { self: TransactionObjectInput; newSupra: (number | TransactionArgument | TransactionArgument | null) }

export function setSupra( tx: Transaction, args: SetSupraArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::set_supra`, arguments: [ obj(tx, args.self), pure(tx, args.newSupra, `${Option.$typeName}<u32>`) ], }) }

export interface SetSwitchboardArgs { self: TransactionObjectInput; newSwitchboard: (string | TransactionArgument | TransactionArgument | null) }

export function setSwitchboard( tx: Transaction, args: SetSwitchboardArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::set_switchboard`, arguments: [ obj(tx, args.self), pure(tx, args.newSwitchboard, `${Option.$typeName}<address>`) ], }) }

export interface UpdateOraclePriceWithRuleArgs { self: TransactionObjectInput; ruleT: GenericArg; clock: TransactionObjectInput; price: bigint | TransactionArgument }

export function updateOraclePriceWithRule( tx: Transaction, typeArg: string, args: UpdateOraclePriceWithRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::update_oracle_price_with_rule`, typeArguments: [typeArg], arguments: [ obj(tx, args.self), generic(tx, `${typeArg}`, args.ruleT), obj(tx, args.clock), pure(tx, args.price, `u64`) ], }) }

export interface UpdatePriceArgs { self: TransactionObjectInput; clock: TransactionObjectInput; sources: TransactionObjectInput }

export function updatePrice( tx: Transaction, args: UpdatePriceArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::update_price`, arguments: [ obj(tx, args.self), obj(tx, args.clock), obj(tx, args.sources) ], }) }

export interface UpdateToleranceMsArgs { self: TransactionObjectInput; newToleranceMs: bigint | TransactionArgument }

export function updateToleranceMs( tx: Transaction, args: UpdateToleranceMsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::oracle_aggregator::update_tolerance_ms`, arguments: [ obj(tx, args.self), pure(tx, args.newToleranceMs, `u64`) ], }) }
