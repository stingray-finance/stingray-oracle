import {PUBLISHED_AT} from "..";
import {obj, pure} from "../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";
import { STINGRAY_ORACLE } from "../constants";

export interface updatePriceByRuleArgs {
    self: TransactionObjectInput,
    stakePool: TransactionObjectInput,
    metadata: TransactionObjectInput,
    clock: TransactionObjectInput
}

export const updatePriceWithRule = async(tx: Transaction, args: updatePriceByRuleArgs)=>{
    return tx.moveCall({
        target: `${PUBLISHED_AT}::vsui_rule::update_price`,
        arguments: [
            obj(tx, args.self),
            obj(tx, args.stakePool),
            obj(tx, args.metadata),
            obj(tx, args.clock) 
        ]
    });
}