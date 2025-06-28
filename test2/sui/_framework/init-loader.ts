import * as package_onchain_1 from "../_dependencies/onchain/0x1/init";
import * as package_onchain_2 from "../_dependencies/onchain/0x2/init";
import * as package_onchain_740c7523c52f2ff22d32c3420513dcbe1538498ef9c9fba701da1e4e790b101e from "../my-package/init";
import {StructClassLoader} from "./loader";

function registerClassesOnchain(loader: StructClassLoader) { package_onchain_1.registerClasses(loader);
package_onchain_2.registerClasses(loader);
package_onchain_740c7523c52f2ff22d32c3420513dcbe1538498ef9c9fba701da1e4e790b101e.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesOnchain(loader); }
