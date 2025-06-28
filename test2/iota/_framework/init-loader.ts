import * as package_onchain_1 from "../_dependencies/onchain/0x1/init";
import * as package_onchain_2 from "../_dependencies/onchain/0x2/init";
import * as package_onchain_b94921abcde04f7a69f20bdf67497bfe238ec034f26dccf4970e89d102ca151d from "../my-package/init";
import {StructClassLoader} from "./loader";

function registerClassesOnchain(loader: StructClassLoader) { package_onchain_1.registerClasses(loader);
package_onchain_2.registerClasses(loader);
package_onchain_b94921abcde04f7a69f20bdf67497bfe238ec034f26dccf4970e89d102ca151d.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesOnchain(loader); }
