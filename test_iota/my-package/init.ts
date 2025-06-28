import * as vault from "./vault/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(vault.ClaimPass);
loader.register(vault.ClaimPassVerifyMessage);
loader.register(vault.CoinAddedEvent);
loader.register(vault.CoinGivenEvent);
loader.register(vault.CoinWithdrawnEvent);
loader.register(vault.NumberOfReceiversUpdatedEvent);
loader.register(vault.ObjectsAddedEvent);
loader.register(vault.ObjectsGivenEvent);
loader.register(vault.ObjectsWithdrawnEvent);
loader.register(vault.ObjectsWrapper);
loader.register(vault.Vault);
loader.register(vault.VaultCreatedEvent);
loader.register(vault.VaultDestroyedEvent);
 }
