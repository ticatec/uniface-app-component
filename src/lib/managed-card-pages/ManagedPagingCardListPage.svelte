<script lang="ts">

    import type PageAttrs from "$lib/common/PageAttrs";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import {onMount} from "svelte";
    import PagingCardListPage from "$lib/card-pages/PagingCardListPage.svelte";
    import type PagingDataManager from "$lib/common/PagingDataManager";
    import type {OnPageChange, OnRowCountChanged} from "@ticatec/uniface-element/PaginationPanel";

    export let page$attrs: PageAttrs;
    export let gap: number = 8;
    export let list: Array<any> = [];
    export let render: any;
    export let dataManager: PagingDataManager;
    export let busyIndicator: string | null = null;
    export let criteria: any;
    export let canBeClosed: boolean = false;


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
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', 'Loading data...'));
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
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', 'Loading data...'));
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
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', 'Loading data...'));
        try {
            await dataManager.setRowsPage(rows);
            showResult();
        } finally {
            window.Indicator.hide();
        }
    }

    onMount(async () => {
        await doSearch(false);
    })

</script>


<PagingCardListPage {total} {pageNo} {pageCount} {page$attrs} {gap} {list} {onPageChange} {onRowCountChanged} {canBeClosed}
                {render}>
    <slot slot="search-panel" name="search-panel"/>
</PagingCardListPage>

