<script lang="ts">

    import type PageAttrs from "$lib/common/PageAttrs";
    import i18n from "@ticatec/i18n";
    import {onMount} from "svelte";
    import PagingListPage from "$lib/cards/PagingListPage.svelte";
    import type PagingDataManager from "$lib/common/PagingDataManager";
    import type {OnPageChange, OnRowCountChanged} from "@ticatec/uniface-element/PaginationPanel";
    import type {PageInitialize} from "$lib/common";
    import FilterPanel from "@ticatec/uniface-filter-panel";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import ModuleErrorPage from "$lib/common/ModuleErrorPage.svelte";
    import langRes from "$lib/i18n_resources/en_res";

    export let page$attrs: PageAttrs;
    export let initializeData: PageInitialize | null = null;
    export let gap: number = 8;
    export let list: Array<any> = [];
    export let render: any;
    export let dataManager: PagingDataManager;
    export let busyIndicator: string | null = null;
    export let criteria: any;
    export let canBeClosed: boolean = false;
    export let actions: ButtonActions;
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

    let error: any = null;
    let loaded: boolean = false;

    onMount(async () => {
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', langRes.uniface.app.busyIndicator));
        try {
            await initializeData?.();
            await dataManager.search(criteria);
            showResult();
        } catch (ex) {
            console.log('读取数据发生错误', ex)
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
        <PagingListPage {total} {pageNo} {pageCount} {page$attrs} {gap} {list} {onPageChange} {onRowCountChanged} {canBeClosed} {render}>
            <FilterPanel slot="search-panel" {actions} resetClickHandler={()=>{doSearch(true)}} searchClickHandler={()=>doSearch()}
                         advancedCriteriaTitle={advancedTitle} hasAdvanced={$$slots['advanced-panel']!=null}
                         style=" border-radius: 0; border-bottom: 1px solid var(--uniface-page-divid-color, #F0F0F0)">
                <slot name="search-panel"/>
                <slot name="advanced-panel" slot="advanced-panel"/>
            </FilterPanel>

        </PagingListPage>
    {/if}
{/if}