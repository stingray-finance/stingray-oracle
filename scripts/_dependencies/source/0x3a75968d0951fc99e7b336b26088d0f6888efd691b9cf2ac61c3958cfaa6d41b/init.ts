import * as validatorV2 from "./validator-v2/structs";
import * as validator from "./validator/structs";
import {StructClassLoader} from "../../../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(validator.DkgState);
loader.register(validatorV2.DkgState);
 }
