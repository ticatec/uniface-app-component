<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import PagingListPage from "$lib/data-table/PagingListPage.svelte";
    import type {ActionsColumn, IndicatorColumn, MouseClickHandler} from "@ticatec/uniface-element";
    import type {DataColumn} from "@ticatec/uniface-element";
    import DynamicFilterPanel from "@ticatec/uniface-filter-panel/DynamicFilterPanel";
    import type {MetaCriteriaField} from "@ticatec/uniface-filter-panel";
    import type PageAttrs from "$lib/common/PageAttrs";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import type PagingDataManager from "$lib/common/PagingDataManager";
    import type {PageInitialize} from "$lib/common";
    import i18n from "@ticatec/i18n";
    import langRes from "$lib/i18n_resources/en_res";
    import type {OnPageChange, OnRowCountChanged} from "@ticatec/uniface-element/PaginationPanel";
    import {onMount} from "svelte";
    import ModuleErrorPage from "$lib/common/ModuleErrorPage.svelte";

    export let dataManager: PagingDataManager;
    export let criteria: any;
    export let indicatorColumn: IndicatorColumn;
    export let columns: Array<DataColumn>;
    export let fields: Array<MetaCriteriaField> = [];
    export let variant: 'outlined' | 'filled' = 'outlined';
    export let actionsColumn: ActionsColumn = null as unknown as ActionsColumn;
    export let selectedRows: Array<any> = [];
    export let list: Array<any>;
    export let busyIndicator: string | null = null;
    export let page$attrs: PageAttrs;

    export let actions: ButtonActions = [];

    export let advancedCriteriaTitle: string = 'More';


    export let initializeData: PageInitialize | null = null;

    export let rowHeight: number = null as unknown as number;


    export let roundTable: boolean = false;

    export let canBeClosed: boolean = false;

    export let advancedTitle: string | undefined = undefined;

    const doSearch = async (reset: boolean = false): Promise<void> => {
        if (reset) {
            criteria = dataManager.resetCriteria();
        }
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', langRes.uniface.app.busyIndicator));
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
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', langRes.uniface.app.busyIndicator));
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
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', langRes.uniface.app.busyIndicator));
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
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', langRes.uniface.app.busyIndicator));
        try {
            await initializeData?.();
            await dataManager.search(criteria);
            showResult();
        } catch (ex) {
            error = ex;
        } finally {
            loaded = true;
            window.Indicator?.hide();
        }
    });

    const resetClickHandler = () => {
        doSearch(true)
    }

    const searchClickHandler = () => {
        doSearch()
    }


</script>

{#if loaded}
    {#if error}
        <ModuleErrorPage {error} {canBeClosed}/>
    {:else }
        <PagingListPage bind:list bind:selectedRows {page$attrs} {roundTable} {total} {pageNo} {onRowCountChanged} {onPageChange} {canBeClosed}
                        {pageCount} {actionsColumn} {rowHeight} {indicatorColumn} {columns}>

            <DynamicFilterPanel slot="search-panel" bind:criteria {fields} {resetClickHandler} {searchClickHandler} {variant} {actions}
                                {advancedCriteriaTitle}/>
        </PagingListPage>
    {/if}
{/if}