import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::witness::Witness` + '<'); }

export interface WitnessFields<T extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type WitnessReified<T extends PhantomTypeArgument> = Reified< Witness<T>, WitnessFields<T> >;

export class Witness<T extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::witness::Witness`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Witness.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::witness::Witness<${PhantomToTypeStr<T>}>`; readonly $typeArgs: [PhantomToTypeStr<T>]; readonly $isPhantom = Witness.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<T>], fields: WitnessFields<T>, ) { this.$fullTypeName = composeSuiType( Witness.$typeName, ...typeArgs ) as `${typeof PKG_V1}::witness::Witness<${PhantomToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<T extends PhantomReified<PhantomTypeArgument>>( T: T ): WitnessReified<ToPhantomTypeArgument<T>> { return { typeName: Witness.$typeName, fullTypeName: composeSuiType( Witness.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::witness::Witness<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>], isPhantom: Witness.$isPhantom, reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => Witness.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => Witness.fromBcs( T, data, ), bcs: Witness.bcs, fromJSONField: (field: any) => Witness.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => Witness.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData( T, content, ), fromSuiObjectData: (content: SuiObjectData) => Witness.fromSuiObjectData( T, content, ), fetch: async (client: SuiClient, id: string) => Witness.fetch( client, T, id, ), new: ( fields: WitnessFields<ToPhantomTypeArgument<T>>, ) => { return new Witness( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Witness.reified }

 static phantom<T extends PhantomReified<PhantomTypeArgument>>( T: T ): PhantomReified<ToTypeStr<Witness<ToPhantomTypeArgument<T>>>> { return phantom(Witness.reified( T )); } static get p() { return Witness.phantom }

 static get bcs() { return bcs.struct("Witness", {

 dummy_field: bcs.bool()

}) };

 static fromFields<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, fields: Record<string, any> ): Witness<ToPhantomTypeArgument<T>> { return Witness.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, item: FieldsWithTypes ): Witness<ToPhantomTypeArgument<T>> { if (!isWitness(item.type)) { throw new Error("not a Witness type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Witness.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, data: Uint8Array ): Witness<ToPhantomTypeArgument<T>> { return Witness.fromFields( typeArg, Witness.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, field: any ): Witness<ToPhantomTypeArgument<T>> { return Witness.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, json: Record<string, any> ): Witness<ToPhantomTypeArgument<T>> { if (json.$typeName !== Witness.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Witness.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Witness.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, content: SuiParsedData ): Witness<ToPhantomTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWitness(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Witness object`); } return Witness.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, data: SuiObjectData ): Witness<ToPhantomTypeArgument<T>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isWitness(data.bcs.type)) { throw new Error(`object at is not a Witness object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Witness.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Witness.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T, id: string ): Promise<Witness<ToPhantomTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Witness object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWitness(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Witness object`); }

 return Witness.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== WitnessGenerator =============================== */

export function isWitnessGenerator(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::witness::WitnessGenerator` + '<'); }

export interface WitnessGeneratorFields<T extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type WitnessGeneratorReified<T extends PhantomTypeArgument> = Reified< WitnessGenerator<T>, WitnessGeneratorFields<T> >;

export class WitnessGenerator<T extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::witness::WitnessGenerator`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = WitnessGenerator.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::witness::WitnessGenerator<${PhantomToTypeStr<T>}>`; readonly $typeArgs: [PhantomToTypeStr<T>]; readonly $isPhantom = WitnessGenerator.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<T>], fields: WitnessGeneratorFields<T>, ) { this.$fullTypeName = composeSuiType( WitnessGenerator.$typeName, ...typeArgs ) as `${typeof PKG_V1}::witness::WitnessGenerator<${PhantomToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<T extends PhantomReified<PhantomTypeArgument>>( T: T ): WitnessGeneratorReified<ToPhantomTypeArgument<T>> { return { typeName: WitnessGenerator.$typeName, fullTypeName: composeSuiType( WitnessGenerator.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::witness::WitnessGenerator<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>], isPhantom: WitnessGenerator.$isPhantom, reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => WitnessGenerator.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WitnessGenerator.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => WitnessGenerator.fromBcs( T, data, ), bcs: WitnessGenerator.bcs, fromJSONField: (field: any) => WitnessGenerator.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => WitnessGenerator.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => WitnessGenerator.fromSuiParsedData( T, content, ), fromSuiObjectData: (content: SuiObjectData) => WitnessGenerator.fromSuiObjectData( T, content, ), fetch: async (client: SuiClient, id: string) => WitnessGenerator.fetch( client, T, id, ), new: ( fields: WitnessGeneratorFields<ToPhantomTypeArgument<T>>, ) => { return new WitnessGenerator( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return WitnessGenerator.reified }

 static phantom<T extends PhantomReified<PhantomTypeArgument>>( T: T ): PhantomReified<ToTypeStr<WitnessGenerator<ToPhantomTypeArgument<T>>>> { return phantom(WitnessGenerator.reified( T )); } static get p() { return WitnessGenerator.phantom }

 static get bcs() { return bcs.struct("WitnessGenerator", {

 dummy_field: bcs.bool()

}) };

 static fromFields<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, fields: Record<string, any> ): WitnessGenerator<ToPhantomTypeArgument<T>> { return WitnessGenerator.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, item: FieldsWithTypes ): WitnessGenerator<ToPhantomTypeArgument<T>> { if (!isWitnessGenerator(item.type)) { throw new Error("not a WitnessGenerator type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return WitnessGenerator.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, data: Uint8Array ): WitnessGenerator<ToPhantomTypeArgument<T>> { return WitnessGenerator.fromFields( typeArg, WitnessGenerator.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, field: any ): WitnessGenerator<ToPhantomTypeArgument<T>> { return WitnessGenerator.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, json: Record<string, any> ): WitnessGenerator<ToPhantomTypeArgument<T>> { if (json.$typeName !== WitnessGenerator.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(WitnessGenerator.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return WitnessGenerator.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, content: SuiParsedData ): WitnessGenerator<ToPhantomTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWitnessGenerator(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WitnessGenerator object`); } return WitnessGenerator.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, data: SuiObjectData ): WitnessGenerator<ToPhantomTypeArgument<T>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isWitnessGenerator(data.bcs.type)) { throw new Error(`object at is not a WitnessGenerator object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return WitnessGenerator.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return WitnessGenerator.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T, id: string ): Promise<WitnessGenerator<ToPhantomTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WitnessGenerator object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWitnessGenerator(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WitnessGenerator object`); }

 return WitnessGenerator.fromSuiObjectData( typeArg, res.data ); }

 }
