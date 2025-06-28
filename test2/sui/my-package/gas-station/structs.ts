import * as reified from "../../_framework/reified";
import {Balance} from "../../_dependencies/onchain/0x2/balance/structs";
import {ID, UID} from "../../_dependencies/onchain/0x2/object/structs";
import {SUI} from "../../_dependencies/onchain/0x2/sui/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom, ToTypeStr as ToPhantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== GasStation =============================== */

export function isGasStation(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::gas_station::GasStation`; }

export interface GasStationFields { id: ToField<UID>; availableFunds: ToField<Balance<ToPhantom<SUI>>>; admins: ToField<Vector<"address">>; gasSigner: ToField<"address">; refillToValue: ToField<"u64">; publicKey: ToField<Vector<"u8">> }

export type GasStationReified = Reified< GasStation, GasStationFields >;

export class GasStation implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::gas_station::GasStation`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = GasStation.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::gas_station::GasStation`; readonly $typeArgs: []; readonly $isPhantom = GasStation.$isPhantom;

 readonly id: ToField<UID>; readonly availableFunds: ToField<Balance<ToPhantom<SUI>>>; readonly admins: ToField<Vector<"address">>; readonly gasSigner: ToField<"address">; readonly refillToValue: ToField<"u64">; readonly publicKey: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: GasStationFields, ) { this.$fullTypeName = composeSuiType( GasStation.$typeName, ...typeArgs ) as `${typeof PKG_V1}::gas_station::GasStation`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.availableFunds = fields.availableFunds;; this.admins = fields.admins;; this.gasSigner = fields.gasSigner;; this.refillToValue = fields.refillToValue;; this.publicKey = fields.publicKey; }

 static reified( ): GasStationReified { return { typeName: GasStation.$typeName, fullTypeName: composeSuiType( GasStation.$typeName, ...[] ) as `${typeof PKG_V1}::gas_station::GasStation`, typeArgs: [ ] as [], isPhantom: GasStation.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => GasStation.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => GasStation.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => GasStation.fromBcs( data, ), bcs: GasStation.bcs, fromJSONField: (field: any) => GasStation.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => GasStation.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => GasStation.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => GasStation.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => GasStation.fetch( client, id, ), new: ( fields: GasStationFields, ) => { return new GasStation( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return GasStation.reified() }

 static phantom( ): PhantomReified<ToTypeStr<GasStation>> { return phantom(GasStation.reified( )); } static get p() { return GasStation.phantom() }

 static get bcs() { return bcs.struct("GasStation", {

 id: UID.bcs, available_funds: Balance.bcs, admins: bcs.vector(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })), gas_signer: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), refill_to_value: bcs.u64(), public_key: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): GasStation { return GasStation.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), availableFunds: decodeFromFields(Balance.reified(reified.phantom(SUI.reified())), fields.available_funds), admins: decodeFromFields(reified.vector("address"), fields.admins), gasSigner: decodeFromFields("address", fields.gas_signer), refillToValue: decodeFromFields("u64", fields.refill_to_value), publicKey: decodeFromFields(reified.vector("u8"), fields.public_key) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): GasStation { if (!isGasStation(item.type)) { throw new Error("not a GasStation type");

 }

 return GasStation.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), availableFunds: decodeFromFieldsWithTypes(Balance.reified(reified.phantom(SUI.reified())), item.fields.available_funds), admins: decodeFromFieldsWithTypes(reified.vector("address"), item.fields.admins), gasSigner: decodeFromFieldsWithTypes("address", item.fields.gas_signer), refillToValue: decodeFromFieldsWithTypes("u64", item.fields.refill_to_value), publicKey: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.public_key) } ) }

 static fromBcs( data: Uint8Array ): GasStation { return GasStation.fromFields( GasStation.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,availableFunds: this.availableFunds.toJSONField(),admins: fieldToJSON<Vector<"address">>(`vector<address>`, this.admins),gasSigner: this.gasSigner,refillToValue: this.refillToValue.toString(),publicKey: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.publicKey),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): GasStation { return GasStation.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), availableFunds: decodeFromJSONField(Balance.reified(reified.phantom(SUI.reified())), field.availableFunds), admins: decodeFromJSONField(reified.vector("address"), field.admins), gasSigner: decodeFromJSONField("address", field.gasSigner), refillToValue: decodeFromJSONField("u64", field.refillToValue), publicKey: decodeFromJSONField(reified.vector("u8"), field.publicKey) } ) }

 static fromJSON( json: Record<string, any> ): GasStation { if (json.$typeName !== GasStation.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return GasStation.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): GasStation { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isGasStation(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a GasStation object`); } return GasStation.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): GasStation { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isGasStation(data.bcs.type)) { throw new Error(`object at is not a GasStation object`); }

 return GasStation.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return GasStation.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<GasStation> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching GasStation object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isGasStation(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a GasStation object`); }

 return GasStation.fromSuiObjectData( res.data ); }

 }

/* ============================== AdminAddedEvent =============================== */

export function isAdminAddedEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::gas_station::AdminAddedEvent`; }

export interface AdminAddedEventFields { gasStation: ToField<ID>; admin: ToField<"address"> }

export type AdminAddedEventReified = Reified< AdminAddedEvent, AdminAddedEventFields >;

export class AdminAddedEvent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::gas_station::AdminAddedEvent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = AdminAddedEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::gas_station::AdminAddedEvent`; readonly $typeArgs: []; readonly $isPhantom = AdminAddedEvent.$isPhantom;

 readonly gasStation: ToField<ID>; readonly admin: ToField<"address">

 private constructor(typeArgs: [], fields: AdminAddedEventFields, ) { this.$fullTypeName = composeSuiType( AdminAddedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::gas_station::AdminAddedEvent`; this.$typeArgs = typeArgs;

 this.gasStation = fields.gasStation;; this.admin = fields.admin; }

 static reified( ): AdminAddedEventReified { return { typeName: AdminAddedEvent.$typeName, fullTypeName: composeSuiType( AdminAddedEvent.$typeName, ...[] ) as `${typeof PKG_V1}::gas_station::AdminAddedEvent`, typeArgs: [ ] as [], isPhantom: AdminAddedEvent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AdminAddedEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AdminAddedEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AdminAddedEvent.fromBcs( data, ), bcs: AdminAddedEvent.bcs, fromJSONField: (field: any) => AdminAddedEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AdminAddedEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AdminAddedEvent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => AdminAddedEvent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => AdminAddedEvent.fetch( client, id, ), new: ( fields: AdminAddedEventFields, ) => { return new AdminAddedEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AdminAddedEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AdminAddedEvent>> { return phantom(AdminAddedEvent.reified( )); } static get p() { return AdminAddedEvent.phantom() }

 static get bcs() { return bcs.struct("AdminAddedEvent", {

 gas_station: ID.bcs, admin: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): AdminAddedEvent { return AdminAddedEvent.reified( ).new( { gasStation: decodeFromFields(ID.reified(), fields.gas_station), admin: decodeFromFields("address", fields.admin) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AdminAddedEvent { if (!isAdminAddedEvent(item.type)) { throw new Error("not a AdminAddedEvent type");

 }

 return AdminAddedEvent.reified( ).new( { gasStation: decodeFromFieldsWithTypes(ID.reified(), item.fields.gas_station), admin: decodeFromFieldsWithTypes("address", item.fields.admin) } ) }

 static fromBcs( data: Uint8Array ): AdminAddedEvent { return AdminAddedEvent.fromFields( AdminAddedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 gasStation: this.gasStation,admin: this.admin,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AdminAddedEvent { return AdminAddedEvent.reified( ).new( { gasStation: decodeFromJSONField(ID.reified(), field.gasStation), admin: decodeFromJSONField("address", field.admin) } ) }

 static fromJSON( json: Record<string, any> ): AdminAddedEvent { if (json.$typeName !== AdminAddedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AdminAddedEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AdminAddedEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAdminAddedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AdminAddedEvent object`); } return AdminAddedEvent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): AdminAddedEvent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAdminAddedEvent(data.bcs.type)) { throw new Error(`object at is not a AdminAddedEvent object`); }

 return AdminAddedEvent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AdminAddedEvent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<AdminAddedEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AdminAddedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAdminAddedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AdminAddedEvent object`); }

 return AdminAddedEvent.fromSuiObjectData( res.data ); }

 }

/* ============================== AdminRemovedEvent =============================== */

export function isAdminRemovedEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::gas_station::AdminRemovedEvent`; }

export interface AdminRemovedEventFields { gasStation: ToField<ID>; admin: ToField<"address"> }

export type AdminRemovedEventReified = Reified< AdminRemovedEvent, AdminRemovedEventFields >;

export class AdminRemovedEvent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::gas_station::AdminRemovedEvent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = AdminRemovedEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::gas_station::AdminRemovedEvent`; readonly $typeArgs: []; readonly $isPhantom = AdminRemovedEvent.$isPhantom;

 readonly gasStation: ToField<ID>; readonly admin: ToField<"address">

 private constructor(typeArgs: [], fields: AdminRemovedEventFields, ) { this.$fullTypeName = composeSuiType( AdminRemovedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::gas_station::AdminRemovedEvent`; this.$typeArgs = typeArgs;

 this.gasStation = fields.gasStation;; this.admin = fields.admin; }

 static reified( ): AdminRemovedEventReified { return { typeName: AdminRemovedEvent.$typeName, fullTypeName: composeSuiType( AdminRemovedEvent.$typeName, ...[] ) as `${typeof PKG_V1}::gas_station::AdminRemovedEvent`, typeArgs: [ ] as [], isPhantom: AdminRemovedEvent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AdminRemovedEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AdminRemovedEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AdminRemovedEvent.fromBcs( data, ), bcs: AdminRemovedEvent.bcs, fromJSONField: (field: any) => AdminRemovedEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AdminRemovedEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AdminRemovedEvent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => AdminRemovedEvent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => AdminRemovedEvent.fetch( client, id, ), new: ( fields: AdminRemovedEventFields, ) => { return new AdminRemovedEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AdminRemovedEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AdminRemovedEvent>> { return phantom(AdminRemovedEvent.reified( )); } static get p() { return AdminRemovedEvent.phantom() }

 static get bcs() { return bcs.struct("AdminRemovedEvent", {

 gas_station: ID.bcs, admin: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): AdminRemovedEvent { return AdminRemovedEvent.reified( ).new( { gasStation: decodeFromFields(ID.reified(), fields.gas_station), admin: decodeFromFields("address", fields.admin) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AdminRemovedEvent { if (!isAdminRemovedEvent(item.type)) { throw new Error("not a AdminRemovedEvent type");

 }

 return AdminRemovedEvent.reified( ).new( { gasStation: decodeFromFieldsWithTypes(ID.reified(), item.fields.gas_station), admin: decodeFromFieldsWithTypes("address", item.fields.admin) } ) }

 static fromBcs( data: Uint8Array ): AdminRemovedEvent { return AdminRemovedEvent.fromFields( AdminRemovedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 gasStation: this.gasStation,admin: this.admin,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AdminRemovedEvent { return AdminRemovedEvent.reified( ).new( { gasStation: decodeFromJSONField(ID.reified(), field.gasStation), admin: decodeFromJSONField("address", field.admin) } ) }

 static fromJSON( json: Record<string, any> ): AdminRemovedEvent { if (json.$typeName !== AdminRemovedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AdminRemovedEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AdminRemovedEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAdminRemovedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AdminRemovedEvent object`); } return AdminRemovedEvent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): AdminRemovedEvent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAdminRemovedEvent(data.bcs.type)) { throw new Error(`object at is not a AdminRemovedEvent object`); }

 return AdminRemovedEvent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AdminRemovedEvent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<AdminRemovedEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AdminRemovedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAdminRemovedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AdminRemovedEvent object`); }

 return AdminRemovedEvent.fromSuiObjectData( res.data ); }

 }

/* ============================== GasStationFundsAddedEvent =============================== */

export function isGasStationFundsAddedEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::gas_station::GasStationFundsAddedEvent`; }

export interface GasStationFundsAddedEventFields { gasStation: ToField<ID>; workspaceId: ToField<"u64">; amount: ToField<"u64"> }

export type GasStationFundsAddedEventReified = Reified< GasStationFundsAddedEvent, GasStationFundsAddedEventFields >;

export class GasStationFundsAddedEvent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::gas_station::GasStationFundsAddedEvent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = GasStationFundsAddedEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::gas_station::GasStationFundsAddedEvent`; readonly $typeArgs: []; readonly $isPhantom = GasStationFundsAddedEvent.$isPhantom;

 readonly gasStation: ToField<ID>; readonly workspaceId: ToField<"u64">; readonly amount: ToField<"u64">

 private constructor(typeArgs: [], fields: GasStationFundsAddedEventFields, ) { this.$fullTypeName = composeSuiType( GasStationFundsAddedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::gas_station::GasStationFundsAddedEvent`; this.$typeArgs = typeArgs;

 this.gasStation = fields.gasStation;; this.workspaceId = fields.workspaceId;; this.amount = fields.amount; }

 static reified( ): GasStationFundsAddedEventReified { return { typeName: GasStationFundsAddedEvent.$typeName, fullTypeName: composeSuiType( GasStationFundsAddedEvent.$typeName, ...[] ) as `${typeof PKG_V1}::gas_station::GasStationFundsAddedEvent`, typeArgs: [ ] as [], isPhantom: GasStationFundsAddedEvent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => GasStationFundsAddedEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => GasStationFundsAddedEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => GasStationFundsAddedEvent.fromBcs( data, ), bcs: GasStationFundsAddedEvent.bcs, fromJSONField: (field: any) => GasStationFundsAddedEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => GasStationFundsAddedEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => GasStationFundsAddedEvent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => GasStationFundsAddedEvent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => GasStationFundsAddedEvent.fetch( client, id, ), new: ( fields: GasStationFundsAddedEventFields, ) => { return new GasStationFundsAddedEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return GasStationFundsAddedEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<GasStationFundsAddedEvent>> { return phantom(GasStationFundsAddedEvent.reified( )); } static get p() { return GasStationFundsAddedEvent.phantom() }

 static get bcs() { return bcs.struct("GasStationFundsAddedEvent", {

 gas_station: ID.bcs, workspace_id: bcs.u64(), amount: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): GasStationFundsAddedEvent { return GasStationFundsAddedEvent.reified( ).new( { gasStation: decodeFromFields(ID.reified(), fields.gas_station), workspaceId: decodeFromFields("u64", fields.workspace_id), amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): GasStationFundsAddedEvent { if (!isGasStationFundsAddedEvent(item.type)) { throw new Error("not a GasStationFundsAddedEvent type");

 }

 return GasStationFundsAddedEvent.reified( ).new( { gasStation: decodeFromFieldsWithTypes(ID.reified(), item.fields.gas_station), workspaceId: decodeFromFieldsWithTypes("u64", item.fields.workspace_id), amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs( data: Uint8Array ): GasStationFundsAddedEvent { return GasStationFundsAddedEvent.fromFields( GasStationFundsAddedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 gasStation: this.gasStation,workspaceId: this.workspaceId.toString(),amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): GasStationFundsAddedEvent { return GasStationFundsAddedEvent.reified( ).new( { gasStation: decodeFromJSONField(ID.reified(), field.gasStation), workspaceId: decodeFromJSONField("u64", field.workspaceId), amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON( json: Record<string, any> ): GasStationFundsAddedEvent { if (json.$typeName !== GasStationFundsAddedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return GasStationFundsAddedEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): GasStationFundsAddedEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isGasStationFundsAddedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a GasStationFundsAddedEvent object`); } return GasStationFundsAddedEvent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): GasStationFundsAddedEvent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isGasStationFundsAddedEvent(data.bcs.type)) { throw new Error(`object at is not a GasStationFundsAddedEvent object`); }

 return GasStationFundsAddedEvent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return GasStationFundsAddedEvent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<GasStationFundsAddedEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching GasStationFundsAddedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isGasStationFundsAddedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a GasStationFundsAddedEvent object`); }

 return GasStationFundsAddedEvent.fromSuiObjectData( res.data ); }

 }

/* ============================== GasStationFundsRemovedEvent =============================== */

export function isGasStationFundsRemovedEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::gas_station::GasStationFundsRemovedEvent`; }

export interface GasStationFundsRemovedEventFields { gasStation: ToField<ID>; amount: ToField<"u64"> }

export type GasStationFundsRemovedEventReified = Reified< GasStationFundsRemovedEvent, GasStationFundsRemovedEventFields >;

export class GasStationFundsRemovedEvent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::gas_station::GasStationFundsRemovedEvent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = GasStationFundsRemovedEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::gas_station::GasStationFundsRemovedEvent`; readonly $typeArgs: []; readonly $isPhantom = GasStationFundsRemovedEvent.$isPhantom;

 readonly gasStation: ToField<ID>; readonly amount: ToField<"u64">

 private constructor(typeArgs: [], fields: GasStationFundsRemovedEventFields, ) { this.$fullTypeName = composeSuiType( GasStationFundsRemovedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::gas_station::GasStationFundsRemovedEvent`; this.$typeArgs = typeArgs;

 this.gasStation = fields.gasStation;; this.amount = fields.amount; }

 static reified( ): GasStationFundsRemovedEventReified { return { typeName: GasStationFundsRemovedEvent.$typeName, fullTypeName: composeSuiType( GasStationFundsRemovedEvent.$typeName, ...[] ) as `${typeof PKG_V1}::gas_station::GasStationFundsRemovedEvent`, typeArgs: [ ] as [], isPhantom: GasStationFundsRemovedEvent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => GasStationFundsRemovedEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => GasStationFundsRemovedEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => GasStationFundsRemovedEvent.fromBcs( data, ), bcs: GasStationFundsRemovedEvent.bcs, fromJSONField: (field: any) => GasStationFundsRemovedEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => GasStationFundsRemovedEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => GasStationFundsRemovedEvent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => GasStationFundsRemovedEvent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => GasStationFundsRemovedEvent.fetch( client, id, ), new: ( fields: GasStationFundsRemovedEventFields, ) => { return new GasStationFundsRemovedEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return GasStationFundsRemovedEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<GasStationFundsRemovedEvent>> { return phantom(GasStationFundsRemovedEvent.reified( )); } static get p() { return GasStationFundsRemovedEvent.phantom() }

 static get bcs() { return bcs.struct("GasStationFundsRemovedEvent", {

 gas_station: ID.bcs, amount: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): GasStationFundsRemovedEvent { return GasStationFundsRemovedEvent.reified( ).new( { gasStation: decodeFromFields(ID.reified(), fields.gas_station), amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): GasStationFundsRemovedEvent { if (!isGasStationFundsRemovedEvent(item.type)) { throw new Error("not a GasStationFundsRemovedEvent type");

 }

 return GasStationFundsRemovedEvent.reified( ).new( { gasStation: decodeFromFieldsWithTypes(ID.reified(), item.fields.gas_station), amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs( data: Uint8Array ): GasStationFundsRemovedEvent { return GasStationFundsRemovedEvent.fromFields( GasStationFundsRemovedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 gasStation: this.gasStation,amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): GasStationFundsRemovedEvent { return GasStationFundsRemovedEvent.reified( ).new( { gasStation: decodeFromJSONField(ID.reified(), field.gasStation), amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON( json: Record<string, any> ): GasStationFundsRemovedEvent { if (json.$typeName !== GasStationFundsRemovedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return GasStationFundsRemovedEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): GasStationFundsRemovedEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isGasStationFundsRemovedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a GasStationFundsRemovedEvent object`); } return GasStationFundsRemovedEvent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): GasStationFundsRemovedEvent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isGasStationFundsRemovedEvent(data.bcs.type)) { throw new Error(`object at is not a GasStationFundsRemovedEvent object`); }

 return GasStationFundsRemovedEvent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return GasStationFundsRemovedEvent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<GasStationFundsRemovedEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching GasStationFundsRemovedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isGasStationFundsRemovedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a GasStationFundsRemovedEvent object`); }

 return GasStationFundsRemovedEvent.fromSuiObjectData( res.data ); }

 }

/* ============================== GasObjectFundsRefilledEvent =============================== */

export function isGasObjectFundsRefilledEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::gas_station::GasObjectFundsRefilledEvent`; }

export interface GasObjectFundsRefilledEventFields { gasStation: ToField<ID>; amount: ToField<"u64"> }

export type GasObjectFundsRefilledEventReified = Reified< GasObjectFundsRefilledEvent, GasObjectFundsRefilledEventFields >;

export class GasObjectFundsRefilledEvent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::gas_station::GasObjectFundsRefilledEvent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = GasObjectFundsRefilledEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::gas_station::GasObjectFundsRefilledEvent`; readonly $typeArgs: []; readonly $isPhantom = GasObjectFundsRefilledEvent.$isPhantom;

 readonly gasStation: ToField<ID>; readonly amount: ToField<"u64">

 private constructor(typeArgs: [], fields: GasObjectFundsRefilledEventFields, ) { this.$fullTypeName = composeSuiType( GasObjectFundsRefilledEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::gas_station::GasObjectFundsRefilledEvent`; this.$typeArgs = typeArgs;

 this.gasStation = fields.gasStation;; this.amount = fields.amount; }

 static reified( ): GasObjectFundsRefilledEventReified { return { typeName: GasObjectFundsRefilledEvent.$typeName, fullTypeName: composeSuiType( GasObjectFundsRefilledEvent.$typeName, ...[] ) as `${typeof PKG_V1}::gas_station::GasObjectFundsRefilledEvent`, typeArgs: [ ] as [], isPhantom: GasObjectFundsRefilledEvent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => GasObjectFundsRefilledEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => GasObjectFundsRefilledEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => GasObjectFundsRefilledEvent.fromBcs( data, ), bcs: GasObjectFundsRefilledEvent.bcs, fromJSONField: (field: any) => GasObjectFundsRefilledEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => GasObjectFundsRefilledEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => GasObjectFundsRefilledEvent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => GasObjectFundsRefilledEvent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => GasObjectFundsRefilledEvent.fetch( client, id, ), new: ( fields: GasObjectFundsRefilledEventFields, ) => { return new GasObjectFundsRefilledEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return GasObjectFundsRefilledEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<GasObjectFundsRefilledEvent>> { return phantom(GasObjectFundsRefilledEvent.reified( )); } static get p() { return GasObjectFundsRefilledEvent.phantom() }

 static get bcs() { return bcs.struct("GasObjectFundsRefilledEvent", {

 gas_station: ID.bcs, amount: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): GasObjectFundsRefilledEvent { return GasObjectFundsRefilledEvent.reified( ).new( { gasStation: decodeFromFields(ID.reified(), fields.gas_station), amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): GasObjectFundsRefilledEvent { if (!isGasObjectFundsRefilledEvent(item.type)) { throw new Error("not a GasObjectFundsRefilledEvent type");

 }

 return GasObjectFundsRefilledEvent.reified( ).new( { gasStation: decodeFromFieldsWithTypes(ID.reified(), item.fields.gas_station), amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs( data: Uint8Array ): GasObjectFundsRefilledEvent { return GasObjectFundsRefilledEvent.fromFields( GasObjectFundsRefilledEvent.bcs.parse(data) ) }

 toJSONField() { return {

 gasStation: this.gasStation,amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): GasObjectFundsRefilledEvent { return GasObjectFundsRefilledEvent.reified( ).new( { gasStation: decodeFromJSONField(ID.reified(), field.gasStation), amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON( json: Record<string, any> ): GasObjectFundsRefilledEvent { if (json.$typeName !== GasObjectFundsRefilledEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return GasObjectFundsRefilledEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): GasObjectFundsRefilledEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isGasObjectFundsRefilledEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a GasObjectFundsRefilledEvent object`); } return GasObjectFundsRefilledEvent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): GasObjectFundsRefilledEvent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isGasObjectFundsRefilledEvent(data.bcs.type)) { throw new Error(`object at is not a GasObjectFundsRefilledEvent object`); }

 return GasObjectFundsRefilledEvent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return GasObjectFundsRefilledEvent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<GasObjectFundsRefilledEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching GasObjectFundsRefilledEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isGasObjectFundsRefilledEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a GasObjectFundsRefilledEvent object`); }

 return GasObjectFundsRefilledEvent.fromSuiObjectData( res.data ); }

 }

/* ============================== GasObjectFundsDecreasedEvent =============================== */

export function isGasObjectFundsDecreasedEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::gas_station::GasObjectFundsDecreasedEvent`; }

export interface GasObjectFundsDecreasedEventFields { gasStation: ToField<ID>; amount: ToField<"u64"> }

export type GasObjectFundsDecreasedEventReified = Reified< GasObjectFundsDecreasedEvent, GasObjectFundsDecreasedEventFields >;

export class GasObjectFundsDecreasedEvent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::gas_station::GasObjectFundsDecreasedEvent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = GasObjectFundsDecreasedEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::gas_station::GasObjectFundsDecreasedEvent`; readonly $typeArgs: []; readonly $isPhantom = GasObjectFundsDecreasedEvent.$isPhantom;

 readonly gasStation: ToField<ID>; readonly amount: ToField<"u64">

 private constructor(typeArgs: [], fields: GasObjectFundsDecreasedEventFields, ) { this.$fullTypeName = composeSuiType( GasObjectFundsDecreasedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::gas_station::GasObjectFundsDecreasedEvent`; this.$typeArgs = typeArgs;

 this.gasStation = fields.gasStation;; this.amount = fields.amount; }

 static reified( ): GasObjectFundsDecreasedEventReified { return { typeName: GasObjectFundsDecreasedEvent.$typeName, fullTypeName: composeSuiType( GasObjectFundsDecreasedEvent.$typeName, ...[] ) as `${typeof PKG_V1}::gas_station::GasObjectFundsDecreasedEvent`, typeArgs: [ ] as [], isPhantom: GasObjectFundsDecreasedEvent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => GasObjectFundsDecreasedEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => GasObjectFundsDecreasedEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => GasObjectFundsDecreasedEvent.fromBcs( data, ), bcs: GasObjectFundsDecreasedEvent.bcs, fromJSONField: (field: any) => GasObjectFundsDecreasedEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => GasObjectFundsDecreasedEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => GasObjectFundsDecreasedEvent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => GasObjectFundsDecreasedEvent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => GasObjectFundsDecreasedEvent.fetch( client, id, ), new: ( fields: GasObjectFundsDecreasedEventFields, ) => { return new GasObjectFundsDecreasedEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return GasObjectFundsDecreasedEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<GasObjectFundsDecreasedEvent>> { return phantom(GasObjectFundsDecreasedEvent.reified( )); } static get p() { return GasObjectFundsDecreasedEvent.phantom() }

 static get bcs() { return bcs.struct("GasObjectFundsDecreasedEvent", {

 gas_station: ID.bcs, amount: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): GasObjectFundsDecreasedEvent { return GasObjectFundsDecreasedEvent.reified( ).new( { gasStation: decodeFromFields(ID.reified(), fields.gas_station), amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): GasObjectFundsDecreasedEvent { if (!isGasObjectFundsDecreasedEvent(item.type)) { throw new Error("not a GasObjectFundsDecreasedEvent type");

 }

 return GasObjectFundsDecreasedEvent.reified( ).new( { gasStation: decodeFromFieldsWithTypes(ID.reified(), item.fields.gas_station), amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs( data: Uint8Array ): GasObjectFundsDecreasedEvent { return GasObjectFundsDecreasedEvent.fromFields( GasObjectFundsDecreasedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 gasStation: this.gasStation,amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): GasObjectFundsDecreasedEvent { return GasObjectFundsDecreasedEvent.reified( ).new( { gasStation: decodeFromJSONField(ID.reified(), field.gasStation), amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON( json: Record<string, any> ): GasObjectFundsDecreasedEvent { if (json.$typeName !== GasObjectFundsDecreasedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return GasObjectFundsDecreasedEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): GasObjectFundsDecreasedEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isGasObjectFundsDecreasedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a GasObjectFundsDecreasedEvent object`); } return GasObjectFundsDecreasedEvent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): GasObjectFundsDecreasedEvent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isGasObjectFundsDecreasedEvent(data.bcs.type)) { throw new Error(`object at is not a GasObjectFundsDecreasedEvent object`); }

 return GasObjectFundsDecreasedEvent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return GasObjectFundsDecreasedEvent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<GasObjectFundsDecreasedEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching GasObjectFundsDecreasedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isGasObjectFundsDecreasedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a GasObjectFundsDecreasedEvent object`); }

 return GasObjectFundsDecreasedEvent.fromSuiObjectData( res.data ); }

 }

/* ============================== SignatureData =============================== */

export function isSignatureData(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::gas_station::SignatureData`; }

export interface SignatureDataFields { gasCoinObjectId: ToField<ID>; timestamp: ToField<"u64"> }

export type SignatureDataReified = Reified< SignatureData, SignatureDataFields >;

export class SignatureData implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::gas_station::SignatureData`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = SignatureData.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::gas_station::SignatureData`; readonly $typeArgs: []; readonly $isPhantom = SignatureData.$isPhantom;

 readonly gasCoinObjectId: ToField<ID>; readonly timestamp: ToField<"u64">

 private constructor(typeArgs: [], fields: SignatureDataFields, ) { this.$fullTypeName = composeSuiType( SignatureData.$typeName, ...typeArgs ) as `${typeof PKG_V1}::gas_station::SignatureData`; this.$typeArgs = typeArgs;

 this.gasCoinObjectId = fields.gasCoinObjectId;; this.timestamp = fields.timestamp; }

 static reified( ): SignatureDataReified { return { typeName: SignatureData.$typeName, fullTypeName: composeSuiType( SignatureData.$typeName, ...[] ) as `${typeof PKG_V1}::gas_station::SignatureData`, typeArgs: [ ] as [], isPhantom: SignatureData.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => SignatureData.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => SignatureData.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => SignatureData.fromBcs( data, ), bcs: SignatureData.bcs, fromJSONField: (field: any) => SignatureData.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => SignatureData.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => SignatureData.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => SignatureData.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => SignatureData.fetch( client, id, ), new: ( fields: SignatureDataFields, ) => { return new SignatureData( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return SignatureData.reified() }

 static phantom( ): PhantomReified<ToTypeStr<SignatureData>> { return phantom(SignatureData.reified( )); } static get p() { return SignatureData.phantom() }

 static get bcs() { return bcs.struct("SignatureData", {

 gas_coin_object_id: ID.bcs, timestamp: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): SignatureData { return SignatureData.reified( ).new( { gasCoinObjectId: decodeFromFields(ID.reified(), fields.gas_coin_object_id), timestamp: decodeFromFields("u64", fields.timestamp) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): SignatureData { if (!isSignatureData(item.type)) { throw new Error("not a SignatureData type");

 }

 return SignatureData.reified( ).new( { gasCoinObjectId: decodeFromFieldsWithTypes(ID.reified(), item.fields.gas_coin_object_id), timestamp: decodeFromFieldsWithTypes("u64", item.fields.timestamp) } ) }

 static fromBcs( data: Uint8Array ): SignatureData { return SignatureData.fromFields( SignatureData.bcs.parse(data) ) }

 toJSONField() { return {

 gasCoinObjectId: this.gasCoinObjectId,timestamp: this.timestamp.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): SignatureData { return SignatureData.reified( ).new( { gasCoinObjectId: decodeFromJSONField(ID.reified(), field.gasCoinObjectId), timestamp: decodeFromJSONField("u64", field.timestamp) } ) }

 static fromJSON( json: Record<string, any> ): SignatureData { if (json.$typeName !== SignatureData.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return SignatureData.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): SignatureData { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isSignatureData(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a SignatureData object`); } return SignatureData.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): SignatureData { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isSignatureData(data.bcs.type)) { throw new Error(`object at is not a SignatureData object`); }

 return SignatureData.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return SignatureData.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<SignatureData> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching SignatureData object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isSignatureData(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a SignatureData object`); }

 return SignatureData.fromSuiObjectData( res.data ); }

 }
