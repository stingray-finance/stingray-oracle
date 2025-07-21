import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/ascii/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface FetchPriceArgs { coinType: string | TransactionArgument; priceInfoObject: TransactionObjectInput; clock: TransactionObjectInput; requiredDecimals: number | TransactionArgument; toleranceMs: bigint | TransactionArgument }

export function fetchPrice( tx: Transaction, args: FetchPriceArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::pyth_price_fetcher::fetch_price`, arguments: [ pure(tx, args.coinType, `${String.$typeName}`), obj(tx, args.priceInfoObject), obj(tx, args.clock), pure(tx, args.requiredDecimals, `u8`), pure(tx, args.toleranceMs, `u64`) ], }) }
