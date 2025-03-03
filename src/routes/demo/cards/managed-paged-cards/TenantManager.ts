import {PagedDataManager} from "@ticatec/app-data-manager";
import type TenantService from "./TenantService";
import {service} from "./TenantService";
import type PagingDataManager from "$lib/common/PagingDataManager";

export default class TenantManager extends PagedDataManager<TenantService> implements PagingDataManager {

    constructor() {
        super(service, (o1:any, o2:any) => o1.code==o2.code);
    }
}