import * as priceDataPullV2 from "./price-data-pull-v2/structs";
import * as priceDataPull from "./price-data-pull/structs";
import * as supraSValueFeed from "./suprasvaluefeed/structs";
import {StructClassLoader} from "../../../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(supraSValueFeed.Price);
loader.register(supraSValueFeed.OracleHolder);
loader.register(priceDataPull.PriceData);
loader.register(priceDataPullV2.PriceData);
loader.register(priceDataPullV2.MerkleRootHash);
 }
