import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeIotaType, compressIotaType} from "../../../../_framework/util";
import {String} from "../../0x1/string/structs";
import {PKG_V3} from "../index";
import {UID} from "../object/structs";
import {bcs} from "@iota/iota-sdk/bcs";
import {IotaClient, IotaObjectData, IotaParsedData} from "@iota/iota-sdk/client";
import {fromB64, fromHEX, toHEX} from "@iota/iota-sdk/utils";

/* ============================== VerifiedIssuer =============================== */

export function isVerifiedIssuer(type: string): boolean { type = compressIotaType(type); return type === `${PKG_V3}::zklogin_verified_issuer::VerifiedIssuer`; }

export interface VerifiedIssuerFields { id: ToField<UID>; owner: ToField<"address">; issuer: ToField<String> }

export type VerifiedIssuerReified = Reified< VerifiedIssuer, VerifiedIssuerFields >;

export class VerifiedIssuer implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V3}::zklogin_verified_issuer::VerifiedIssuer`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = VerifiedIssuer.$typeName; readonly $fullTypeName: `${typeof PKG_V3}::zklogin_verified_issuer::VerifiedIssuer`; readonly $typeArgs: []; readonly $isPhantom = VerifiedIssuer.$isPhantom;

 readonly id: ToField<UID>; readonly owner: ToField<"address">; readonly issuer: ToField<String>

 private constructor(typeArgs: [], fields: VerifiedIssuerFields, ) { this.$fullTypeName = composeIotaType( VerifiedIssuer.$typeName, ...typeArgs ) as `${typeof PKG_V3}::zklogin_verified_issuer::VerifiedIssuer`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.owner = fields.owner;; this.issuer = fields.issuer; }

 static reified( ): VerifiedIssuerReified { return { typeName: VerifiedIssuer.$typeName, fullTypeName: composeIotaType( VerifiedIssuer.$typeName, ...[] ) as `${typeof PKG_V3}::zklogin_verified_issuer::VerifiedIssuer`, typeArgs: [ ] as [], isPhantom: VerifiedIssuer.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => VerifiedIssuer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => VerifiedIssuer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => VerifiedIssuer.fromBcs( data, ), bcs: VerifiedIssuer.bcs, fromJSONField: (field: any) => VerifiedIssuer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => VerifiedIssuer.fromJSON( json, ), fromIotaParsedData: (content: IotaParsedData) => VerifiedIssuer.fromIotaParsedData( content, ), fromIotaObjectData: (content: IotaObjectData) => VerifiedIssuer.fromIotaObjectData( content, ), fetch: async (client: IotaClient, id: string) => VerifiedIssuer.fetch( client, id, ), new: ( fields: VerifiedIssuerFields, ) => { return new VerifiedIssuer( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return VerifiedIssuer.reified() }

 static phantom( ): PhantomReified<ToTypeStr<VerifiedIssuer>> { return phantom(VerifiedIssuer.reified( )); } static get p() { return VerifiedIssuer.phantom() }

 static get bcs() { return bcs.struct("VerifiedIssuer", {

 id: UID.bcs, owner: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), issuer: String.bcs

}) };

 static fromFields( fields: Record<string, any> ): VerifiedIssuer { return VerifiedIssuer.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), owner: decodeFromFields("address", fields.owner), issuer: decodeFromFields(String.reified(), fields.issuer) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): VerifiedIssuer { if (!isVerifiedIssuer(item.type)) { throw new Error("not a VerifiedIssuer type");

 }

 return VerifiedIssuer.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), owner: decodeFromFieldsWithTypes("address", item.fields.owner), issuer: decodeFromFieldsWithTypes(String.reified(), item.fields.issuer) } ) }

 static fromBcs( data: Uint8Array ): VerifiedIssuer { return VerifiedIssuer.fromFields( VerifiedIssuer.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,owner: this.owner,issuer: this.issuer,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): VerifiedIssuer { return VerifiedIssuer.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), owner: decodeFromJSONField("address", field.owner), issuer: decodeFromJSONField(String.reified(), field.issuer) } ) }

 static fromJSON( json: Record<string, any> ): VerifiedIssuer { if (json.$typeName !== VerifiedIssuer.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return VerifiedIssuer.fromJSONField( json, ) }

 static fromIotaParsedData( content: IotaParsedData ): VerifiedIssuer { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVerifiedIssuer(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a VerifiedIssuer object`); } return VerifiedIssuer.fromFieldsWithTypes( content ); }

 static fromIotaObjectData( data: IotaObjectData ): VerifiedIssuer { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isVerifiedIssuer(data.bcs.type)) { throw new Error(`object at is not a VerifiedIssuer object`); }

 return VerifiedIssuer.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return VerifiedIssuer.fromIotaParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: IotaClient, id: string ): Promise<VerifiedIssuer> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching VerifiedIssuer object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVerifiedIssuer(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a VerifiedIssuer object`); }

 return VerifiedIssuer.fromIotaObjectData( res.data ); }

 }
