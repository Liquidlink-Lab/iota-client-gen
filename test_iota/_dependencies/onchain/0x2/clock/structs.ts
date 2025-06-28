import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeIotaType, compressIotaType} from "../../../../_framework/util";
import {PKG_V3} from "../index";
import {UID} from "../object/structs";
import {bcs} from "@iota/iota-sdk/bcs";
import {IotaClient, IotaObjectData, IotaParsedData} from "@iota/iota-sdk/client";
import {fromB64} from "@iota/iota-sdk/utils";

/* ============================== Clock =============================== */

export function isClock(type: string): boolean { type = compressIotaType(type); return type === `${PKG_V3}::clock::Clock`; }

export interface ClockFields { id: ToField<UID>; timestampMs: ToField<"u64"> }

export type ClockReified = Reified< Clock, ClockFields >;

export class Clock implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V3}::clock::Clock`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Clock.$typeName; readonly $fullTypeName: `${typeof PKG_V3}::clock::Clock`; readonly $typeArgs: []; readonly $isPhantom = Clock.$isPhantom;

 readonly id: ToField<UID>; readonly timestampMs: ToField<"u64">

 private constructor(typeArgs: [], fields: ClockFields, ) { this.$fullTypeName = composeIotaType( Clock.$typeName, ...typeArgs ) as `${typeof PKG_V3}::clock::Clock`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.timestampMs = fields.timestampMs; }

 static reified( ): ClockReified { return { typeName: Clock.$typeName, fullTypeName: composeIotaType( Clock.$typeName, ...[] ) as `${typeof PKG_V3}::clock::Clock`, typeArgs: [ ] as [], isPhantom: Clock.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Clock.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Clock.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Clock.fromBcs( data, ), bcs: Clock.bcs, fromJSONField: (field: any) => Clock.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Clock.fromJSON( json, ), fromIotaParsedData: (content: IotaParsedData) => Clock.fromIotaParsedData( content, ), fromIotaObjectData: (content: IotaObjectData) => Clock.fromIotaObjectData( content, ), fetch: async (client: IotaClient, id: string) => Clock.fetch( client, id, ), new: ( fields: ClockFields, ) => { return new Clock( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Clock.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Clock>> { return phantom(Clock.reified( )); } static get p() { return Clock.phantom() }

 static get bcs() { return bcs.struct("Clock", {

 id: UID.bcs, timestamp_ms: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): Clock { return Clock.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), timestampMs: decodeFromFields("u64", fields.timestamp_ms) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Clock { if (!isClock(item.type)) { throw new Error("not a Clock type");

 }

 return Clock.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), timestampMs: decodeFromFieldsWithTypes("u64", item.fields.timestamp_ms) } ) }

 static fromBcs( data: Uint8Array ): Clock { return Clock.fromFields( Clock.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,timestampMs: this.timestampMs.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Clock { return Clock.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), timestampMs: decodeFromJSONField("u64", field.timestampMs) } ) }

 static fromJSON( json: Record<string, any> ): Clock { if (json.$typeName !== Clock.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Clock.fromJSONField( json, ) }

 static fromIotaParsedData( content: IotaParsedData ): Clock { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isClock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Clock object`); } return Clock.fromFieldsWithTypes( content ); }

 static fromIotaObjectData( data: IotaObjectData ): Clock { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isClock(data.bcs.type)) { throw new Error(`object at is not a Clock object`); }

 return Clock.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Clock.fromIotaParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: IotaClient, id: string ): Promise<Clock> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Clock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isClock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Clock object`); }

 return Clock.fromIotaObjectData( res.data ); }

 }
