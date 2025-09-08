import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {UID} from "../../0x2/object/structs";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== CERT =============================== */

export function isCERT(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::cert::CERT`; }

export interface CERTFields { dummyField: ToField<"bool"> }

export type CERTReified = Reified< CERT, CERTFields >;

export class CERT implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::cert::CERT`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = CERT.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::cert::CERT`; readonly $typeArgs: []; readonly $isPhantom = CERT.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: CERTFields, ) { this.$fullTypeName = composeSuiType( CERT.$typeName, ...typeArgs ) as `${typeof PKG_V1}::cert::CERT`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): CERTReified { return { typeName: CERT.$typeName, fullTypeName: composeSuiType( CERT.$typeName, ...[] ) as `${typeof PKG_V1}::cert::CERT`, typeArgs: [ ] as [], isPhantom: CERT.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => CERT.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CERT.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => CERT.fromBcs( data, ), bcs: CERT.bcs, fromJSONField: (field: any) => CERT.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => CERT.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => CERT.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => CERT.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => CERT.fetch( client, id, ), new: ( fields: CERTFields, ) => { return new CERT( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return CERT.reified() }

 static phantom( ): PhantomReified<ToTypeStr<CERT>> { return phantom(CERT.reified( )); } static get p() { return CERT.phantom() }

 static get bcs() { return bcs.struct("CERT", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): CERT { return CERT.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): CERT { if (!isCERT(item.type)) { throw new Error("not a CERT type");

 }

 return CERT.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): CERT { return CERT.fromFields( CERT.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): CERT { return CERT.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): CERT { if (json.$typeName !== CERT.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return CERT.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): CERT { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCERT(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CERT object`); } return CERT.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): CERT { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCERT(data.bcs.type)) { throw new Error(`object at is not a CERT object`); }

 return CERT.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CERT.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<CERT> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CERT object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCERT(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CERT object`); }

 return CERT.fromSuiObjectData( res.data ); }

 }

/* ============================== Metadata =============================== */

export function isMetadata(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::cert::Metadata` + '<'); }

export interface MetadataFields<T extends PhantomTypeArgument> { id: ToField<UID> }

export type MetadataReified<T extends PhantomTypeArgument> = Reified< Metadata<T>, MetadataFields<T> >;

export class Metadata<T extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::cert::Metadata`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Metadata.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::cert::Metadata<${PhantomToTypeStr<T>}>`; readonly $typeArgs: [PhantomToTypeStr<T>]; readonly $isPhantom = Metadata.$isPhantom;

 readonly id: ToField<UID>

 private constructor(typeArgs: [PhantomToTypeStr<T>], fields: MetadataFields<T>, ) { this.$fullTypeName = composeSuiType( Metadata.$typeName, ...typeArgs ) as `${typeof PKG_V1}::cert::Metadata<${PhantomToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id; }

 static reified<T extends PhantomReified<PhantomTypeArgument>>( T: T ): MetadataReified<ToPhantomTypeArgument<T>> { return { typeName: Metadata.$typeName, fullTypeName: composeSuiType( Metadata.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::cert::Metadata<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>], isPhantom: Metadata.$isPhantom, reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => Metadata.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Metadata.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => Metadata.fromBcs( T, data, ), bcs: Metadata.bcs, fromJSONField: (field: any) => Metadata.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => Metadata.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => Metadata.fromSuiParsedData( T, content, ), fromSuiObjectData: (content: SuiObjectData) => Metadata.fromSuiObjectData( T, content, ), fetch: async (client: SuiClient, id: string) => Metadata.fetch( client, T, id, ), new: ( fields: MetadataFields<ToPhantomTypeArgument<T>>, ) => { return new Metadata( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Metadata.reified }

 static phantom<T extends PhantomReified<PhantomTypeArgument>>( T: T ): PhantomReified<ToTypeStr<Metadata<ToPhantomTypeArgument<T>>>> { return phantom(Metadata.reified( T )); } static get p() { return Metadata.phantom }

 static get bcs() { return bcs.struct("Metadata", {

 id: UID.bcs

}) };

 static fromFields<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, fields: Record<string, any> ): Metadata<ToPhantomTypeArgument<T>> { return Metadata.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id) } ) }

 static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, item: FieldsWithTypes ): Metadata<ToPhantomTypeArgument<T>> { if (!isMetadata(item.type)) { throw new Error("not a Metadata type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Metadata.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) } ) }

 static fromBcs<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, data: Uint8Array ): Metadata<ToPhantomTypeArgument<T>> { return Metadata.fromFields( typeArg, Metadata.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, field: any ): Metadata<ToPhantomTypeArgument<T>> { return Metadata.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id) } ) }

 static fromJSON<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, json: Record<string, any> ): Metadata<ToPhantomTypeArgument<T>> { if (json.$typeName !== Metadata.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Metadata.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Metadata.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, content: SuiParsedData ): Metadata<ToPhantomTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMetadata(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Metadata object`); } return Metadata.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, data: SuiObjectData ): Metadata<ToPhantomTypeArgument<T>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMetadata(data.bcs.type)) { throw new Error(`object at is not a Metadata object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Metadata.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Metadata.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T, id: string ): Promise<Metadata<ToPhantomTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Metadata object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMetadata(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Metadata object`); }

 return Metadata.fromSuiObjectData( typeArg, res.data ); }

 }
