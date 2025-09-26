export const PACKAGE_ID = "0xfda12d6f008d547b1badd6024dc4fcede4a4a8ddeb24dc186a36e55f8da7a4ca"; 
export const PUBLISHED_AT = "0xfda12d6f008d547b1badd6024dc4fcede4a4a8ddeb24dc186a36e55f8da7a4ca";
export const PKG_V1 = "0xfda12d6f008d547b1badd6024dc4fcede4a4a8ddeb24dc186a36e55f8da7a4ca";  
import {obj, pure} from "./_framework/util";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { METADATA, STAKING, STINGRAY_ORACLE, STINGRAY_ORACLE_PACKAGE, SUI_PAIR_ID, SUPRA_ORACLE_HOLDER } from "./constants";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

const client = new SuiClient({
    url: getFullnodeUrl('mainnet')
});

const signer = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);

const updateHaSuiPriceOperate = async(tx: Transaction, )=>{
    tx.moveCall({
        target: `${PUBLISHED_AT}::hasui_rule::update_price`,
        arguments: [
            obj(tx, STINGRAY_ORACLE),
            obj(tx, STAKING),
            obj(tx, SUI_CLOCK_OBJECT_ID),
        ]
    });
}


const updateSuiPrice = async(tx: Transaction)=>{
    const suiCoinType = "0x2::sui::SUI";
    tx.moveCall({
        target: `${STINGRAY_ORACLE_PACKAGE}::stingray_oracle::update_price_by_supra`,
        arguments: [
            obj(tx, STINGRAY_ORACLE),
            obj(tx, SUPRA_ORACLE_HOLDER),
            pure(tx, SUI_PAIR_ID, 'u32'),
            obj(tx, SUI_CLOCK_OBJECT_ID),
        ],typeArguments: [
            suiCoinType
        ]
    });
}

const updatePriceMain = async()=>{
    const tx = new Transaction();
    await updateSuiPrice(tx);
    await updateHaSuiPriceOperate(tx);

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
