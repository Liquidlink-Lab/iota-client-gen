import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeIotaType, compressIotaType} from "../../../../_framework/util";
import {PKG_V3} from "../index";
import {bcs} from "@iota/iota-sdk/bcs";
import {IotaClient, IotaObjectData, IotaParsedData} from "@iota/iota-sdk/client";
import {fromB64, fromHEX, toHEX} from "@iota/iota-sdk/utils";

/* ============================== ID =============================== */

export function isID(type: string): boolean { type = compressIotaType(type); return type === `${PKG_V3}::object::ID`; }

export interface IDFields { bytes: ToField<"address"> }

export type IDReified = Reified< ID, IDFields >;

export class ID implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V3}::object::ID`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ID.$typeName; readonly $fullTypeName: `${typeof PKG_V3}::object::ID`; readonly $typeArgs: []; readonly $isPhantom = ID.$isPhantom;

 readonly bytes: ToField<"address">

 private constructor(typeArgs: [], fields: IDFields, ) { this.$fullTypeName = composeIotaType( ID.$typeName, ...typeArgs ) as `${typeof PKG_V3}::object::ID`; this.$typeArgs = typeArgs;

 this.bytes = fields.bytes; }

 static reified( ): IDReified { return { typeName: ID.$typeName, fullTypeName: composeIotaType( ID.$typeName, ...[] ) as `${typeof PKG_V3}::object::ID`, typeArgs: [ ] as [], isPhantom: ID.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ID.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ID.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ID.fromBcs( data, ), bcs: ID.bcs, fromJSONField: (field: any) => ID.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ID.fromJSON( json, ), fromIotaParsedData: (content: IotaParsedData) => ID.fromIotaParsedData( content, ), fromIotaObjectData: (content: IotaObjectData) => ID.fromIotaObjectData( content, ), fetch: async (client: IotaClient, id: string) => ID.fetch( client, id, ), new: ( fields: IDFields, ) => { return new ID( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ID.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ID>> { return phantom(ID.reified( )); } static get p() { return ID.phantom() }

 static get bcs() { return bcs.struct("ID", {

 bytes: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): ID { return ID.reified( ).new( { bytes: decodeFromFields("address", fields.bytes) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ID { if (!isID(item.type)) { throw new Error("not a ID type");

 }

 return ID.reified( ).new( { bytes: decodeFromFieldsWithTypes("address", item.fields.bytes) } ) }

 static fromBcs( data: Uint8Array ): ID { return ID.fromFields( ID.bcs.parse(data) ) }

 toJSONField() { return {

 bytes: this.bytes,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ID { return ID.reified( ).new( { bytes: decodeFromJSONField("address", field.bytes) } ) }

 static fromJSON( json: Record<string, any> ): ID { if (json.$typeName !== ID.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ID.fromJSONField( json, ) }

 static fromIotaParsedData( content: IotaParsedData ): ID { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isID(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ID object`); } return ID.fromFieldsWithTypes( content ); }

 static fromIotaObjectData( data: IotaObjectData ): ID { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isID(data.bcs.type)) { throw new Error(`object at is not a ID object`); }

 return ID.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ID.fromIotaParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: IotaClient, id: string ): Promise<ID> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ID object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isID(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ID object`); }

 return ID.fromIotaObjectData( res.data ); }

 }

/* ============================== UID =============================== */

export function isUID(type: string): boolean { type = compressIotaType(type); return type === `${PKG_V3}::object::UID`; }

export interface UIDFields { id: ToField<ID> }

export type UIDReified = Reified< UID, UIDFields >;

export class UID implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V3}::object::UID`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UID.$typeName; readonly $fullTypeName: `${typeof PKG_V3}::object::UID`; readonly $typeArgs: []; readonly $isPhantom = UID.$isPhantom;

 readonly id: ToField<ID>

 private constructor(typeArgs: [], fields: UIDFields, ) { this.$fullTypeName = composeIotaType( UID.$typeName, ...typeArgs ) as `${typeof PKG_V3}::object::UID`; this.$typeArgs = typeArgs;

 this.id = fields.id; }

 static reified( ): UIDReified { return { typeName: UID.$typeName, fullTypeName: composeIotaType( UID.$typeName, ...[] ) as `${typeof PKG_V3}::object::UID`, typeArgs: [ ] as [], isPhantom: UID.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UID.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UID.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UID.fromBcs( data, ), bcs: UID.bcs, fromJSONField: (field: any) => UID.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UID.fromJSON( json, ), fromIotaParsedData: (content: IotaParsedData) => UID.fromIotaParsedData( content, ), fromIotaObjectData: (content: IotaObjectData) => UID.fromIotaObjectData( content, ), fetch: async (client: IotaClient, id: string) => UID.fetch( client, id, ), new: ( fields: UIDFields, ) => { return new UID( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UID.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UID>> { return phantom(UID.reified( )); } static get p() { return UID.phantom() }

 static get bcs() { return bcs.struct("UID", {

 id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): UID { return UID.reified( ).new( { id: decodeFromFields(ID.reified(), fields.id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UID { if (!isUID(item.type)) { throw new Error("not a UID type");

 }

 return UID.reified( ).new( { id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id) } ) }

 static fromBcs( data: Uint8Array ): UID { return UID.fromFields( UID.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UID { return UID.reified( ).new( { id: decodeFromJSONField(ID.reified(), field.id) } ) }

 static fromJSON( json: Record<string, any> ): UID { if (json.$typeName !== UID.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UID.fromJSONField( json, ) }

 static fromIotaParsedData( content: IotaParsedData ): UID { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUID(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UID object`); } return UID.fromFieldsWithTypes( content ); }

 static fromIotaObjectData( data: IotaObjectData ): UID { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUID(data.bcs.type)) { throw new Error(`object at is not a UID object`); }

 return UID.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UID.fromIotaParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: IotaClient, id: string ): Promise<UID> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UID object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUID(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UID object`); }

 return UID.fromIotaObjectData( res.data ); }

 }
