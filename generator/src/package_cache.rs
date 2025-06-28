use std::{
    collections::{BTreeMap, BTreeSet},
    sync::Arc,
};

use anyhow::{anyhow, Result};
use move_core_types::account_address::AccountAddress;
use iota_json_rpc_types::{IotaObjectDataOptions, IotaObjectResponse, IotaRawData, IotaRawMovePackage};
use iota_sdk::{apis::ReadApi, types::base_types::ObjectID};
use tokio::sync::RwLock;

pub struct PackageCache<'a> {
    rpc_client: &'a ReadApi,
    cache: Arc<RwLock<BTreeMap<ObjectID, IotaRawMovePackage>>>,
}

impl<'a> PackageCache<'a> {
    pub fn new(rpc_client: &'a ReadApi) -> Self {
        Self {
            rpc_client,
            cache: Arc::new(RwLock::new(BTreeMap::new())),
        }
    }

    fn get_package_from_result(&self, obj_read: IotaObjectResponse) -> Result<IotaRawMovePackage> {
        let obj = obj_read
            .into_object()
            .map_err(|e| anyhow!("package object does not exist or was deleted: {}", e))?;
        let object_id = obj.object_id;
        let obj = obj.bcs.ok_or_else(|| anyhow!("bcs field not found"))?;
        match obj {
            IotaRawData::Package(pkg) => Ok(pkg),
            IotaRawData::MoveObject(_) => Err(anyhow!(
                "dependency ID contains a IOTA object, not a Move package: {}",
                object_id
            )),
        }
    }

    pub async fn get_multi(
        &mut self,
        addrs: Vec<AccountAddress>,
    ) -> Result<Vec<Result<IotaRawMovePackage>>> {
        let ids = addrs
            .into_iter()
            .map(ObjectID::from_address)
            .collect::<Vec<_>>();

        let cache = self.cache.read().await;
        let mut res_map = BTreeMap::new();
        let mut to_fetch = BTreeSet::new();
        for id in ids.iter() {
            if *id == ObjectID::ZERO {
                res_map.insert(*id, Err(anyhow!("zero address")));
            } else if let Some(pkg) = cache.get(id) {
                res_map.insert(*id, Ok(pkg.clone()));
            } else {
                to_fetch.insert(*id);
            }
        }
        drop(cache);

        let to_fetch = to_fetch.into_iter().collect::<Vec<_>>();

        let fetch_res = self
            .rpc_client
            .multi_get_object_with_options(to_fetch.clone(), IotaObjectDataOptions::new().with_bcs())
            .await?
            .into_iter()
            .map(|obj_read| self.get_package_from_result(obj_read))
            .collect::<Vec<Result<_>>>();

        res_map.extend(to_fetch.into_iter().zip(fetch_res.into_iter()));

        let mut cache = self.cache.write().await;
        for (id, res) in res_map.iter() {
            if let Ok(pkg) = res {
                cache.insert(*id, pkg.clone());
            }
        }
        drop(cache);

        let ret = ids
            .iter()
            .map(|id| match res_map.get(id).unwrap() {
                Ok(pkg) => Ok(pkg.clone()),
                Err(e) => Err(anyhow!("error fetching package: {}", e)),
            })
            .collect();

        Ok(ret)
    }

    pub async fn get(&mut self, addr: AccountAddress) -> Result<IotaRawMovePackage> {
        self.get_multi(vec![addr]).await?.pop().unwrap()
    }
}

impl Clone for PackageCache<'_> {
    fn clone(&self) -> Self {
        Self {
            rpc_client: self.rpc_client,
            cache: self.cache.clone(),
        }
    }
}
