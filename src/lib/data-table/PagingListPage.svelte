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
    import CommonPage from "$lib/common/CommonPage.svelte";
    import DataTableBoard from "$lib/data-table/DataTableBoard.svelte";

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

    export let emptyIndicator: string | undefined = undefined;;


    onMount(async ()=>{

    })

</script>
<CommonPage page$attrs={page$attrs} {canBeClosed} content$style=" padding: 0 12px; box-sizing: border-box">
    <slot name="sidebar" slot="sidebar"/>
    <DataTableBoard {list} {rowHeight} {indicatorColumn} {columns} {actionsColumn} {roundTable} bind:selectedRows {emptyIndicator}>
        <slot name="search-panel" slot="header"/>
        <div slot="footer" style="width: 100%; padding: 8px 12px; box-sizing: border-box; flex: 0 0 auto; border-top: 1px solid var(--uniface-page-divid-color, #F0F0F0)">
            <PaginationPanel {pageCount} {pageNo} {total} {onRowCountChanged} {onPageChange} generateInfo={uniAppCtx.generateInfo}
                             rowCountLabel={uniAppCtx.rowCountLabel}/>
        </div>
    </DataTableBoard>
</CommonPage>