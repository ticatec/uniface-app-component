<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import type {OnRowCountChanged, OnPageChange} from "@ticatec/uniface-element/PaginationPanel";
    import type {ActionsColumn, IndicatorColumn} from "@ticatec/uniface-element";
    import type {DataColumn} from "@ticatec/uniface-element";
    import CommonPaginationDataTablePage from "$lib/data-table-pages/PagedDataTablePage.svelte";
    import {PagingDataService} from "@ticatec/app-data-service";
    import {onMount} from "svelte";
    import {PagedDataManager} from "@ticatec/app-data-manager";
    import type PageAttrs from "$lib/common/PageAttrs";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import type PagingDataManager from "$lib/common/PagingDataManager";

    export let indicatorColumn: IndicatorColumn;
    export let columns: Array<DataColumn>;
    export let actionsColumn: ActionsColumn = null as unknown as ActionsColumn;
    export let selectedRows: Array<any> = [];
    export let list: Array<any>;
    export let dataManager: PagingDataManager;
    export let criteria: any;
    export let rowHeight: number = null as unknown as number;

    export let busyIndicator: string | null = null;
    export let page$attrs: PageAttrs;
    export let roundTable: boolean = false;


    export const reset: any = async () => {
        await doSearch(true);
    }

    /**
     * 执行查询
     */
    export const search = async (): Promise<void> => {
        await doSearch();
    }

    const doSearch = async (reset: boolean = false): Promise<void> => {
        if (reset) {
            criteria = dataManager.resetCriteria();
        }
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.busyIndicator', 'Loading data...'));
        try {
            await dataManager.search(criteria);
            showResult();
        } finally {
            window.Indicator?.hide();
        }
    }

    let pageCount: number;

    let pageNo: number;

    let total: number;

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

    /**
     * 当页码发生变化的时候
     * @param page
     */
    const onPageChange: OnPageChange = async (page: number) => {
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.busyIndicator', 'Loading data...'));
        try {
            await dataManager.setPageNo(page);
            showResult();
        } finally {
            window.Indicator.hide();
        }
    };

    /**
     * 当每页的行数发生变化的时候
     * @param rows
     */
    let onRowCountChanged: OnRowCountChanged = async (rows: number) => {
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.busyIndicator', 'Loading data...'));
        try {
            await dataManager.setRowsPage(rows);
            showResult();
        } finally {
            window.Indicator.hide();
        }
    }


    onMount(async () => {
        await doSearch(false)
    })


</script>

<CommonPaginationDataTablePage page$attrs={page$attrs} {indicatorColumn} {rowHeight} {columns} {actionsColumn} bind:selectedRows {list}
                               {pageCount} {pageNo} {roundTable} {total} {onRowCountChanged} {onPageChange}>
    <slot name="search-panel" slot="search-panel">
    </slot>
</CommonPaginationDataTablePage>