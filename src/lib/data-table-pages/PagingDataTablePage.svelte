<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import DataTable from "@ticatec/uniface-element/DataTable";
    import type {OnPageChange, OnRowCountChanged} from "@ticatec/uniface-element/PaginationPanel";
    import PaginationPanel from "@ticatec/uniface-element/PaginationPanel";
    import Box from "@ticatec/uniface-element/Box";
    import type {ActionsColumn, DataColumn, IndicatorColumn} from "@ticatec/uniface-element";
    import type PageAttrs from "$lib/common/PageAttrs";
    import uniAppCtx from "$lib/common/uniAppCtx";
    import {onMount} from "svelte";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import AppModule from "../module/AppModule";
    import CommonPage from "$lib/common/CommonPage.svelte";

    export let indicatorColumn: IndicatorColumn;
    export let columns: Array<DataColumn>;
    export let actionsColumn: ActionsColumn | null;
    export let selectedRows: Array<any> = [];
    export let list: Array<any>;
    export let total: number;
    export let pageCount: number;
    export let pageNo: number;
    export let onRowCountChanged: OnRowCountChanged;
    export let onPageChange: OnPageChange;
    export let page$attrs: PageAttrs;
    export let canBeClosed: boolean = false;
    export let roundTable: boolean = false;
    export let rowHeight: number = null as unknown as number;

    onMount(async ()=>{
        indicatorColumn.emptyIndicator = indicatorColumn.emptyIndicator ?? i18n.getText('uniface.app.emptyDataSet', 'There is no data that meets the search criteria. Please set the search criteria again.')
    })

    const closePage = (event: MouseEvent) => {
        AppModule.closeActivePage();
    }

</script>
<CommonPage page$attrs={page$attrs} {canBeClosed} content$style=" padding: 0 12px; box-sizing: border-box">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden">
        <slot name="search-panel"/>
        <Box style="border: 1px solid var(--uniface-editor-border-color, #F8FAFC); width: 100%; height: 100%"  round={roundTable}>
            <DataTable {rowHeight} {columns} {indicatorColumn}
                       {actionsColumn} bind:selectedRows {list}></DataTable>
        </Box>
        <div style="width: 100%; padding: 8px 0; box-sizing: border-box; flex: 0 0 auto">
            <PaginationPanel {pageCount} {pageNo} {total} {onRowCountChanged} {onPageChange} generateInfo={uniAppCtx.generateInfo}
                             rowCountLabel={uniAppCtx.rowCountLabel}/>
        </div>
    </div>
</CommonPage>