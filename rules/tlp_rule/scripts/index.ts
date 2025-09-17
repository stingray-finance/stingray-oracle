export const PACKAGE_ID = "0x70d4b731a598e728d97bf0d855da02e337d6923579c02884750253547dd71868"; 
export const PUBLISHED_AT = "0x70d4b731a598e728d97bf0d855da02e337d6923579c02884750253547dd71868";
export const PKG_V1 = "0x70d4b731a598e728d97bf0d855da02e337d6923579c02884750253547dd71868";  
import {obj, pure} from "./_framework/util";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import { STINGRAY_ORACLE, TYPUS_REGISTRY, TYPUS_VERSION } from "./constants";

const client = new SuiClient({
    url: getFullnodeUrl('mainnet')
});

const signer = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);

const updateTlpPriceOperate = async(tx: Transaction )=>{
    tx.moveCall({
        target: `${PUBLISHED_AT}::tlp_rule::update_price`,
        arguments: [
            obj(tx, STINGRAY_ORACLE),
            obj(tx, TYPUS_VERSION),
            obj(tx, TYPUS_REGISTRY),
            pure(tx, 0, 'u64'), // pool index
            obj(tx, SUI_CLOCK_OBJECT_ID)
        ]
    });
}

const updatePriceMain = async()=>{
    const tx = new Transaction();
    await updateTlpPriceOperate(tx);

    const res = await client.signAndExecuteTransaction({
        transaction: tx, 
        signer,
    });
    await client.waitForTransaction({
        digest: res.digest
    });

    console.log(res);
}

updatePriceMain();
