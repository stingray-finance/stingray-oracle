import * as reified from "../../../../_framework/reified";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs, ToTypeStr as ToPhantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {Option} from "../../0x1/option/structs";
import {UID} from "../../0x2/object/structs";
import {Table} from "../../0x2/table/structs";
import {VecSet} from "../../0x2/vec-set/structs";
import {PKG_V1} from "../index";
import {BcsType, bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== WitTable =============================== */

export function isWitTable(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::wit_table::WitTable` + '<'); }

export interface WitTableFields<T extends PhantomTypeArgument, K extends TypeArgument, V extends PhantomTypeArgument> { id: ToField<UID>; table: ToField<Table<ToPhantom<K>, V>>; keys: ToField<Option<VecSet<K>>>; withKeys: ToField<"bool"> }

export type WitTableReified<T extends PhantomTypeArgument, K extends TypeArgument, V extends PhantomTypeArgument> = Reified< WitTable<T, K, V>, WitTableFields<T, K, V> >;

export class WitTable<T extends PhantomTypeArgument, K extends TypeArgument, V extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::wit_table::WitTable`; static readonly $numTypeParams = 3; static readonly $isPhantom = [true,false,true,] as const;

 readonly $typeName = WitTable.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::wit_table::WitTable<${PhantomToTypeStr<T>}, ${ToTypeStr<K>}, ${PhantomToTypeStr<V>}>`; readonly $typeArgs: [PhantomToTypeStr<T>, ToTypeStr<K>, PhantomToTypeStr<V>]; readonly $isPhantom = WitTable.$isPhantom;

 readonly id: ToField<UID>; readonly table: ToField<Table<ToPhantom<K>, V>>; readonly keys: ToField<Option<VecSet<K>>>; readonly withKeys: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<T>, ToTypeStr<K>, PhantomToTypeStr<V>], fields: WitTableFields<T, K, V>, ) { this.$fullTypeName = composeSuiType( WitTable.$typeName, ...typeArgs ) as `${typeof PKG_V1}::wit_table::WitTable<${PhantomToTypeStr<T>}, ${ToTypeStr<K>}, ${PhantomToTypeStr<V>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.table = fields.table;; this.keys = fields.keys;; this.withKeys = fields.withKeys; }

 static reified<T extends PhantomReified<PhantomTypeArgument>, K extends Reified<TypeArgument, any>, V extends PhantomReified<PhantomTypeArgument>>( T: T, K: K, V: V ): WitTableReified<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> { return { typeName: WitTable.$typeName, fullTypeName: composeSuiType( WitTable.$typeName, ...[extractType(T), extractType(K), extractType(V)] ) as `${typeof PKG_V1}::wit_table::WitTable<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}, ${ToTypeStr<ToTypeArgument<K>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<V>>}>`, typeArgs: [ extractType(T), extractType(K), extractType(V) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>, ToTypeStr<ToTypeArgument<K>>, PhantomToTypeStr<ToPhantomTypeArgument<V>>], isPhantom: WitTable.$isPhantom, reifiedTypeArgs: [T, K, V], fromFields: (fields: Record<string, any>) => WitTable.fromFields( [T, K, V], fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WitTable.fromFieldsWithTypes( [T, K, V], item, ), fromBcs: (data: Uint8Array) => WitTable.fromBcs( [T, K, V], data, ), bcs: WitTable.bcs(toBcs(K)), fromJSONField: (field: any) => WitTable.fromJSONField( [T, K, V], field, ), fromJSON: (json: Record<string, any>) => WitTable.fromJSON( [T, K, V], json, ), fromSuiParsedData: (content: SuiParsedData) => WitTable.fromSuiParsedData( [T, K, V], content, ), fromSuiObjectData: (content: SuiObjectData) => WitTable.fromSuiObjectData( [T, K, V], content, ), fetch: async (client: SuiClient, id: string) => WitTable.fetch( client, [T, K, V], id, ), new: ( fields: WitTableFields<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>>, ) => { return new WitTable( [extractType(T), extractType(K), extractType(V)], fields ) }, kind: "StructClassReified", } }

 static get r() { return WitTable.reified }

 static phantom<T extends PhantomReified<PhantomTypeArgument>, K extends Reified<TypeArgument, any>, V extends PhantomReified<PhantomTypeArgument>>( T: T, K: K, V: V ): PhantomReified<ToTypeStr<WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>>>> { return phantom(WitTable.reified( T, K, V )); } static get p() { return WitTable.phantom }

 static get bcs() { return <K extends BcsType<any>>(K: K) => bcs.struct(`WitTable<${K.name}>`, {

 id: UID.bcs, table: Table.bcs, keys: Option.bcs(VecSet.bcs(K)), with_keys: bcs.bool()

}) };

 static fromFields<T extends PhantomReified<PhantomTypeArgument>, K extends Reified<TypeArgument, any>, V extends PhantomReified<PhantomTypeArgument>>( typeArgs: [T, K, V], fields: Record<string, any> ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> { return WitTable.reified( typeArgs[0], typeArgs[1], typeArgs[2], ).new( { id: decodeFromFields(UID.reified(), fields.id), table: decodeFromFields(Table.reified(reified.phantom(typeArgs[1]), typeArgs[2]), fields.table), keys: decodeFromFields(Option.reified(VecSet.reified(typeArgs[1])), fields.keys), withKeys: decodeFromFields("bool", fields.with_keys) } ) }

 static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>, K extends Reified<TypeArgument, any>, V extends PhantomReified<PhantomTypeArgument>>( typeArgs: [T, K, V], item: FieldsWithTypes ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> { if (!isWitTable(item.type)) { throw new Error("not a WitTable type");

 } assertFieldsWithTypesArgsMatch(item, typeArgs);

 return WitTable.reified( typeArgs[0], typeArgs[1], typeArgs[2], ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), table: decodeFromFieldsWithTypes(Table.reified(reified.phantom(typeArgs[1]), typeArgs[2]), item.fields.table), keys: decodeFromFieldsWithTypes(Option.reified(VecSet.reified(typeArgs[1])), item.fields.keys), withKeys: decodeFromFieldsWithTypes("bool", item.fields.with_keys) } ) }

 static fromBcs<T extends PhantomReified<PhantomTypeArgument>, K extends Reified<TypeArgument, any>, V extends PhantomReified<PhantomTypeArgument>>( typeArgs: [T, K, V], data: Uint8Array ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> { return WitTable.fromFields( typeArgs, WitTable.bcs( toBcs(typeArgs[1]) ).parse(data) ) }

 toJSONField() { return {

 id: this.id,table: this.table.toJSONField(),keys: fieldToJSON<Option<VecSet<K>>>(`${Option.$typeName}<${VecSet.$typeName}<${this.$typeArgs[1]}>>`, this.keys),withKeys: this.withKeys,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends PhantomReified<PhantomTypeArgument>, K extends Reified<TypeArgument, any>, V extends PhantomReified<PhantomTypeArgument>>( typeArgs: [T, K, V], field: any ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> { return WitTable.reified( typeArgs[0], typeArgs[1], typeArgs[2], ).new( { id: decodeFromJSONField(UID.reified(), field.id), table: decodeFromJSONField(Table.reified(reified.phantom(typeArgs[1]), typeArgs[2]), field.table), keys: decodeFromJSONField(Option.reified(VecSet.reified(typeArgs[1])), field.keys), withKeys: decodeFromJSONField("bool", field.withKeys) } ) }

 static fromJSON<T extends PhantomReified<PhantomTypeArgument>, K extends Reified<TypeArgument, any>, V extends PhantomReified<PhantomTypeArgument>>( typeArgs: [T, K, V], json: Record<string, any> ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> { if (json.$typeName !== WitTable.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(WitTable.$typeName, ...typeArgs.map(extractType)), json.$typeArgs, typeArgs, )

 return WitTable.fromJSONField( typeArgs, json, ) }

 static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>, K extends Reified<TypeArgument, any>, V extends PhantomReified<PhantomTypeArgument>>( typeArgs: [T, K, V], content: SuiParsedData ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWitTable(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WitTable object`); } return WitTable.fromFieldsWithTypes( typeArgs, content ); }

 static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>, K extends Reified<TypeArgument, any>, V extends PhantomReified<PhantomTypeArgument>>( typeArgs: [T, K, V], data: SuiObjectData ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isWitTable(data.bcs.type)) { throw new Error(`object at is not a WitTable object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 3) { throw new Error(`type argument mismatch: expected 3 type arguments but got ${gotTypeArgs.length}`); }; for (let i = 0; i < 3; i++) { const gotTypeArg = compressSuiType(gotTypeArgs[i]); const expectedTypeArg = compressSuiType(extractType(typeArgs[i])); if (gotTypeArg !== expectedTypeArg) { throw new Error(`type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); } };

 return WitTable.fromBcs( typeArgs, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return WitTable.fromSuiParsedData( typeArgs, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T extends PhantomReified<PhantomTypeArgument>, K extends Reified<TypeArgument, any>, V extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArgs: [T, K, V], id: string ): Promise<WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WitTable object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWitTable(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WitTable object`); }

 return WitTable.fromSuiObjectData( typeArgs, res.data ); }

 }
