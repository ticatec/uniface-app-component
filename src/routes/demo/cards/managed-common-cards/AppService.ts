import {FullListDataService} from "@ticatec/app-data-service";

export default class AppService extends FullListDataService {

    constructor() {
        super('/webservice/platform/application');
    }
}

const service = new AppService();

export {service}