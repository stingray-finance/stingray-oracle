import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../../../_framework/util";
import {UID} from "../../0x2/object/structs";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== NativePool =============================== */

export function isNativePool(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::native_pool::NativePool`; }

export interface NativePoolFields { id: ToField<UID> }

export type NativePoolReified = Reified< NativePool, NativePoolFields >;

export class NativePool implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::native_pool::NativePool`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = NativePool.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::native_pool::NativePool`; readonly $typeArgs: []; readonly $isPhantom = NativePool.$isPhantom;

 readonly id: ToField<UID>

 private constructor(typeArgs: [], fields: NativePoolFields, ) { this.$fullTypeName = composeSuiType( NativePool.$typeName, ...typeArgs ) as `${typeof PKG_V1}::native_pool::NativePool`; this.$typeArgs = typeArgs;

 this.id = fields.id; }

 static reified( ): NativePoolReified { return { typeName: NativePool.$typeName, fullTypeName: composeSuiType( NativePool.$typeName, ...[] ) as `${typeof PKG_V1}::native_pool::NativePool`, typeArgs: [ ] as [], isPhantom: NativePool.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => NativePool.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => NativePool.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => NativePool.fromBcs( data, ), bcs: NativePool.bcs, fromJSONField: (field: any) => NativePool.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => NativePool.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => NativePool.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => NativePool.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => NativePool.fetch( client, id, ), new: ( fields: NativePoolFields, ) => { return new NativePool( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return NativePool.reified() }

 static phantom( ): PhantomReified<ToTypeStr<NativePool>> { return phantom(NativePool.reified( )); } static get p() { return NativePool.phantom() }

 static get bcs() { return bcs.struct("NativePool", {

 id: UID.bcs

}) };

 static fromFields( fields: Record<string, any> ): NativePool { return NativePool.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): NativePool { if (!isNativePool(item.type)) { throw new Error("not a NativePool type");

 }

 return NativePool.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) } ) }

 static fromBcs( data: Uint8Array ): NativePool { return NativePool.fromFields( NativePool.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): NativePool { return NativePool.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id) } ) }

 static fromJSON( json: Record<string, any> ): NativePool { if (json.$typeName !== NativePool.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return NativePool.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): NativePool { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isNativePool(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a NativePool object`); } return NativePool.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): NativePool { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isNativePool(data.bcs.type)) { throw new Error(`object at is not a NativePool object`); }

 return NativePool.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return NativePool.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<NativePool> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching NativePool object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isNativePool(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a NativePool object`); }

 return NativePool.fromSuiObjectData( res.data ); }

 }
