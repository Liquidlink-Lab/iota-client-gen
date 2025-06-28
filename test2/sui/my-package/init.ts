import * as gasStation from "./gas-station/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(gasStation.GasStation);
loader.register(gasStation.AdminAddedEvent);
loader.register(gasStation.AdminRemovedEvent);
loader.register(gasStation.GasStationFundsAddedEvent);
loader.register(gasStation.GasStationFundsRemovedEvent);
loader.register(gasStation.GasObjectFundsRefilledEvent);
loader.register(gasStation.GasObjectFundsDecreasedEvent);
loader.register(gasStation.SignatureData);
 }
