import {i18nUtils} from "@ticatec/i18n";

const langRes = {
    app: {
        btnClose: "Close",
        btnAddNew: "New",
        btnRefresh: "Refresh",
        emptyFiltered: "There is no data that meets the filter criteria. Please set the filter criteria again.",
        emptyDataSet: "There is no data that meets the search criteria. Please set the search criteria again.",
        busyIndicator: "Loading...",
        moduleError: "Can't load the module.",
        pageNotInFrame: "Can't show the page which is not in iframe.",
        indicatorInitialing: "Loading module...",
        paginationInfo: "<span>#<b>{{pageNo}} / {{pageCount}}</b> Total: <b>{{total}}</b> records.</span>",
        rowCountLabel: "rows/page"
    }
}

const i18nRes = i18nUtils.createResourceProxy(langRes, 'uniface');

export default i18nRes;