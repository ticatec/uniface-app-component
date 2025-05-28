import {PagingDataService} from "@ticatec/app-data-service";

export default class TenantService extends PagingDataService {

    constructor() {
        super('/webservice/tenants');
    }

    buildCriteria(options?: any): any {
        return {...options}
    }
}

const service = new TenantService();

export {service}