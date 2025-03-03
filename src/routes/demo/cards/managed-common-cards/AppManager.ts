import {FullListDataManager} from "@ticatec/app-data-manager";
import type AppService from "./AppService";
import {service} from "./AppService";
import type ListDataManager from "$lib/common/ListDataManager";

export default class AppManager extends FullListDataManager<AppService> implements ListDataManager{

    constructor() {
        super(service, (o1:any, o2:any) => o1.code==o2.code);
    }
}