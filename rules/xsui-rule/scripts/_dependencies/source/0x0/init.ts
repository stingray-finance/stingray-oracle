import * as currentPrice from "./current-price/structs";
import * as oracleAggregator from "./oracle-aggregator/structs";
import * as stingrayOracle from "./stingray-oracle/structs";
import * as vsuiRule from "./vsui-rule/structs";
import {StructClassLoader} from "../../../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(currentPrice.CurrentPrice);
loader.register(oracleAggregator.PriceInfo);
loader.register(oracleAggregator.OracleAggregator);
loader.register(oracleAggregator.Oracles);
loader.register(oracleAggregator.PriceSources);
loader.register(oracleAggregator.WhitelistRule);
loader.register(stingrayOracle.AdminCap);
loader.register(stingrayOracle.StingrayOracle);
loader.register(vsuiRule.Rule);
 }
