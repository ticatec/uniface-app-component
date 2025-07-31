import type {GenerateTotalInfo} from "@ticatec/uniface-element/PaginationPanel";
import i18nRes from "$lib/i18nRes";
import {i18nUtils} from "@ticatec/i18n";

const generateInfo: GenerateTotalInfo = (total: number, pageCount: number, pageNo: number, rows: number) => i18nUtils.formatText(i18nRes.app.paginationInfo, {
    total,
    pageCount,
    pageNo,
    rows
});


export default {
    generateInfo
}