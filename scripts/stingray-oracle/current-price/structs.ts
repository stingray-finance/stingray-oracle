import {String} from "../../_dependencies/source/0x1/ascii/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== CurrentPrice =============================== */

export function isCurrentPrice(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::current_price::CurrentPrice`; }

export interface CurrentPriceFields { coinType: ToField<String>; price: ToField<"u64">; decimals: ToField<"u8">; timestampMs: ToField<"u64"> }

export type CurrentPriceReified = Reified< CurrentPrice, CurrentPriceFields >;

export class CurrentPrice implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::current_price::CurrentPrice`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = CurrentPrice.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::current_price::CurrentPrice`; readonly $typeArgs: []; readonly $isPhantom = CurrentPrice.$isPhantom;

 readonly coinType: ToField<String>; readonly price: ToField<"u64">; readonly decimals: ToField<"u8">; readonly timestampMs: ToField<"u64">

 private constructor(typeArgs: [], fields: CurrentPriceFields, ) { this.$fullTypeName = composeSuiType( CurrentPrice.$typeName, ...typeArgs ) as `${typeof PKG_V1}::current_price::CurrentPrice`; this.$typeArgs = typeArgs;

 this.coinType = fields.coinType;; this.price = fields.price;; this.decimals = fields.decimals;; this.timestampMs = fields.timestampMs; }

 static reified( ): CurrentPriceReified { return { typeName: CurrentPrice.$typeName, fullTypeName: composeSuiType( CurrentPrice.$typeName, ...[] ) as `${typeof PKG_V1}::current_price::CurrentPrice`, typeArgs: [ ] as [], isPhantom: CurrentPrice.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => CurrentPrice.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CurrentPrice.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => CurrentPrice.fromBcs( data, ), bcs: CurrentPrice.bcs, fromJSONField: (field: any) => CurrentPrice.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => CurrentPrice.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => CurrentPrice.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => CurrentPrice.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => CurrentPrice.fetch( client, id, ), new: ( fields: CurrentPriceFields, ) => { return new CurrentPrice( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return CurrentPrice.reified() }

 static phantom( ): PhantomReified<ToTypeStr<CurrentPrice>> { return phantom(CurrentPrice.reified( )); } static get p() { return CurrentPrice.phantom() }

 static get bcs() { return bcs.struct("CurrentPrice", {

 coin_type: String.bcs, price: bcs.u64(), decimals: bcs.u8(), timestamp_ms: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): CurrentPrice { return CurrentPrice.reified( ).new( { coinType: decodeFromFields(String.reified(), fields.coin_type), price: decodeFromFields("u64", fields.price), decimals: decodeFromFields("u8", fields.decimals), timestampMs: decodeFromFields("u64", fields.timestamp_ms) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): CurrentPrice { if (!isCurrentPrice(item.type)) { throw new Error("not a CurrentPrice type");

 }

 return CurrentPrice.reified( ).new( { coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type), price: decodeFromFieldsWithTypes("u64", item.fields.price), decimals: decodeFromFieldsWithTypes("u8", item.fields.decimals), timestampMs: decodeFromFieldsWithTypes("u64", item.fields.timestamp_ms) } ) }

 static fromBcs( data: Uint8Array ): CurrentPrice { return CurrentPrice.fromFields( CurrentPrice.bcs.parse(data) ) }

 toJSONField() { return {

 coinType: this.coinType,price: this.price.toString(),decimals: this.decimals,timestampMs: this.timestampMs.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): CurrentPrice { return CurrentPrice.reified( ).new( { coinType: decodeFromJSONField(String.reified(), field.coinType), price: decodeFromJSONField("u64", field.price), decimals: decodeFromJSONField("u8", field.decimals), timestampMs: decodeFromJSONField("u64", field.timestampMs) } ) }

 static fromJSON( json: Record<string, any> ): CurrentPrice { if (json.$typeName !== CurrentPrice.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return CurrentPrice.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): CurrentPrice { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCurrentPrice(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CurrentPrice object`); } return CurrentPrice.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): CurrentPrice { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCurrentPrice(data.bcs.type)) { throw new Error(`object at is not a CurrentPrice object`); }

 return CurrentPrice.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CurrentPrice.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<CurrentPrice> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CurrentPrice object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCurrentPrice(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CurrentPrice object`); }

 return CurrentPrice.fromSuiObjectData( res.data ); }

 }
