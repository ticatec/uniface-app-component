<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import PaginationPanel, {type OnRowCountChanged, type OnPageChange} from "@ticatec/uniface-element/PaginationPanel";
    import type {ActionsColumn, IndicatorColumn} from "@ticatec/uniface-element/DataTable";
    import type {DataColumn} from "@ticatec/uniface-element/DataTable";
    import PagingListPage from "$lib/data-table/PagingListPage.svelte";
    import {onMount} from "svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import type PagingDataManager from "$lib/common/PagingDataManager";
    import FilterPanel from "@ticatec/uniface-filter-panel";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import type {PageInitialize} from "$lib/common";
    import ModuleErrorPage from "$lib/common/ModuleErrorPage.svelte";
    import DataTableBoard from "$lib/data-table";
    import CommonPage from "../../common/CommonPage.svelte";
    import i18nRes from "$lib/i18nRes";
    import utils from "$lib/common/utils";


    export let indicatorColumn: IndicatorColumn;
    export let initializeData: PageInitialize | null = null;
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

    export let canBeClosed: boolean = false;
    export let actions: ButtonActions;
    export let advancedTitle: string | undefined = undefined;

    export let emptyIndicator: string | undefined = undefined;

    export const doSearch = async (reset: boolean = false): Promise<void> => {
        if (reset) {
            criteria = dataManager.resetCriteria();
        }
        window.Indicator.show(busyIndicator ?? i18nRes.app.busyIndicator);
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
        window.Indicator.show(busyIndicator ?? i18nRes.app.busyIndicator);
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
        window.Indicator.show(busyIndicator ?? i18nRes.app.busyIndicator);
        try {
            await dataManager.setRowsPage(rows);
            showResult();
        } finally {
            window.Indicator.hide();
        }
    }

    let loaded: boolean = false;
    let error: any;

    onMount(async () => {
        window.Indicator.show(busyIndicator ?? i18nRes.app.busyIndicator);
        try {
            await initializeData?.();
            await dataManager.search(criteria);
            showResult();
        } catch (ex) {
            console.error('Module loading with error', ex);
            error = ex;
        } finally {
            loaded = true;
            window.Indicator?.hide();
        }
    })

</script>
{#if loaded}
    {#if error}
        <ModuleErrorPage {error} {canBeClosed}/>
    {:else }
        <CommonPage page$attrs={page$attrs} {canBeClosed} content$style=" padding: 0 12px; box-sizing: border-box">
            <slot name="sidebar" slot="sidebar"/>
            <DataTableBoard {list} {rowHeight} {indicatorColumn} {columns} {actionsColumn} {roundTable} bind:selectedRows {emptyIndicator}>
                <FilterPanel slot="header" {actions} resetClickHandler={()=>{doSearch(true)}} searchClickHandler={()=>doSearch()}
                             advancedCriteriaTitle={advancedTitle} hasAdvanced={$$slots['advanced-panel']!=null}>
                    <slot name="search-panel"/>
                    <slot name="advanced-panel" slot="advanced-panel"/>
                </FilterPanel>
                <div slot="footer"
                     style="width: 100%; padding: 8px 12px; box-sizing: border-box; flex: 0 0 auto; border-top: 1px solid var(--uniface-page-divid-color, #F0F0F0)">
                    <PaginationPanel {pageCount} {pageNo} {total} {onRowCountChanged} {onPageChange} generateInfo={utils.generateInfo}
                                     rowCountLabel={i18nRes.app.rowCountLabel}/>
                </div>
            </DataTableBoard>
        </CommonPage>
    {/if}
{/if}