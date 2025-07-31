<script lang="ts">

    import PagedDataTablePage from "$lib/data-table/PagingListPage.svelte";
    import CriteriaFilterPanel from "./CriteriaFilterPanel.svelte";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import type {ActionsColumn, IndicatorColumn, RowAction} from "@ticatec/uniface-element/DataTable";
    import columns from "../managed-paged-table/TenantColumns";
    import TenantManager from "../../cards/managed-paged-cards/TenantManager";
    import {onMount} from "svelte";
    import i18n from "@ticatec/i18n";
    import langRes from "$lib/i18nRes/en_res";
    import i18nRes from "$lib/i18nRes/i18nRes";


    const dataManager = new TenantManager();

    let page$attrs = {
        title: "分页数据表页面演示"
    };


    let list: Array<any> = [];
    let pageCount: number;

    let pageNo: number;

    let total: number;

    let indicatorColumn: IndicatorColumn = {
        width: 40,
        selectable: false
    }

    const actionsColumn: ActionsColumn = {
        width: 150,
        getActions: (item: any): Array<RowAction> => {
            return []
        }
    }

    const onRowCountChanged = async (rows: number) => {
        window.Indicator.show(i18nRes.app.busyIndicator);
        try {
            await dataManager.setRowsPage(rows);
            showResult();
        } finally {
            window.Indicator.hide();
        }
    }

    const onPageChange = async (no: number) => {
        window.Indicator.show(i18nRes.app.busyIndicator);
        try {
            await dataManager.setPageNo(no);
            showResult();
        } finally {
            window.Indicator.hide();
        }
    }

    let criteria: any = {}

    const doSearch = (reset: boolean = false) => async (): Promise<void> => {
        if (reset) {
            criteria = dataManager.resetCriteria();
        }
        console.log('查询条件', criteria, reset)
        window.Indicator.show(i18nRes.app.busyIndicator);
        try {
            await dataManager.search(criteria);
            showResult();
        } finally {
            window.Indicator?.hide();
        }
    }

    /**
     * 显示返回的结果
     */
    const showResult = () => {
        list = dataManager.list;
        total = dataManager.count;
        pageNo = dataManager.pageNo;
        pageCount = dataManager.pageCount;
        criteria = dataManager.criteria;
    }


    let actions: ButtonActions = [
        {label: '新增', type: 'primary', handler: ()=> {}}
    ]

    onMount(async () => {
        await (doSearch())();
    })

</script>

<PagedDataTablePage {total} {onPageChange} {onRowCountChanged} {pageCount} {pageNo} {list} page$attrs={page$attrs} {columns}
                    {indicatorColumn} {actionsColumn}>
    <CriteriaFilterPanel bind:criteria slot="search-panel" {actions} resetClickHandler={doSearch(true)} searchClickHandler={doSearch()}/>
</PagedDataTablePage>
