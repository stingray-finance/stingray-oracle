import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/ascii/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface FetchPriceArgs { coinType: string | TransactionArgument; aggregator: TransactionObjectInput; requiredDecimals: number | TransactionArgument }

export function fetchPrice( tx: Transaction, args: FetchPriceArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::switchboard_price_fetcher::fetch_price`, arguments: [ pure(tx, args.coinType, `${String.$typeName}`), obj(tx, args.aggregator), pure(tx, args.requiredDecimals, `u8`) ], }) }
