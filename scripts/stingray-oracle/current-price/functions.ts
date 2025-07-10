import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/ascii/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function coinType( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::current_price::coin_type`, arguments: [ obj(tx, self) ], }) }

export function decimals( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::current_price::decimals`, arguments: [ obj(tx, self) ], }) }

export interface NewCurrentPriceArgs { coinType: string | TransactionArgument; price: bigint | TransactionArgument; decimals: number | TransactionArgument; timestampMs: bigint | TransactionArgument }

export function newCurrentPrice( tx: Transaction, args: NewCurrentPriceArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::current_price::new_current_price`, arguments: [ pure(tx, args.coinType, `${String.$typeName}`), pure(tx, args.price, `u64`), pure(tx, args.decimals, `u8`), pure(tx, args.timestampMs, `u64`) ], }) }

export function price( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::current_price::price`, arguments: [ obj(tx, self) ], }) }

export function timestampMs( tx: Transaction, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::current_price::timestamp_ms`, arguments: [ obj(tx, self) ], }) }
