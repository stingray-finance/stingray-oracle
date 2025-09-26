export const PACKAGE_ID = "0x5619dce372c8fe6a9132706ea1a5bc406e6fa2990bb7f9ad6ffedd55cd7358dc"; 
export const PUBLISHED_AT = "0x5619dce372c8fe6a9132706ea1a5bc406e6fa2990bb7f9ad6ffedd55cd7358dc";
export const PKG_V1 = "0x5619dce372c8fe6a9132706ea1a5bc406e6fa2990bb7f9ad6ffedd55cd7358dc";  
import {obj, pure} from "./_framework/util";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { updatePriceWithRule } from "./vsui-rule/functions";
import { METADATA, STAKE_POOL, STINGRAY_ORACLE, STINGRAY_ORACLE_PACKAGE, SUI_PAIR_ID, SUPRA_ORACLE_HOLDER } from "./constants";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

const client = new SuiClient({
    url: getFullnodeUrl('mainnet')
});

const signer = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);

const updatePriceOperate = async(tx: Transaction, )=>{
    await updatePriceWithRule(tx, {
        self: STINGRAY_ORACLE,
        stakePool: STAKE_POOL,
        metadata: METADATA,
        clock: SUI_CLOCK_OBJECT_ID,
    } );
}

const checkVSUIPriceMain = async()=>{
    const tx = new Transaction();

    tx.moveCall({
        target: `${PUBLISHED_AT}::vsui_rule::check_share`,
        arguments: [
            obj(tx, STAKE_POOL),
            obj(tx, METADATA),
        ],
    });

    const res = await client.signAndExecuteTransaction({
        transaction: tx, 
        signer,
    });

    await client.waitForTransaction({
        digest: res.digest
    });

    console.log(res);
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
    await updatePriceOperate(tx);

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
// checkVSUIPriceMain();
