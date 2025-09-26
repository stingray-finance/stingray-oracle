export const PACKAGE_ID = "0x628f3a0b11d429672fa820f582d21c6def0caccbe3267e8880286db994d47883"; 
export const PUBLISHED_AT = "0x628f3a0b11d429672fa820f582d21c6def0caccbe3267e8880286db994d47883";
export const PKG_V1 = "0x628f3a0b11d429672fa820f582d21c6def0caccbe3267e8880286db994d47883";  
import {obj, pure} from "./_framework/util";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { LIQUID_STAKING_INFO, STINGRAY_ORACLE, STINGRAY_ORACLE_PACKAGE, SUI_PAIR_ID, SUPRA_ORACLE_HOLDER } from "./constants";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

const client = new SuiClient({
    url: getFullnodeUrl('mainnet')
});

const signer = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);

const updateHaSuiPriceOperate = async(tx: Transaction )=>{
    tx.moveCall({
        target: `${PUBLISHED_AT}::ssui_rule::update_price`,
        arguments: [
            obj(tx, STINGRAY_ORACLE),
            obj(tx, LIQUID_STAKING_INFO),
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
