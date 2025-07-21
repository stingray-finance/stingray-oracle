import * as cert from "./cert/structs";
import * as nativePool from "./native-pool/structs";
import {StructClassLoader} from "../../../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(cert.CERT);
loader.register(cert.Metadata);
loader.register(nativePool.NativePool);
 }
