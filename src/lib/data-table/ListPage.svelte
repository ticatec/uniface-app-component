<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import type {MouseClickHandler} from "@ticatec/uniface-element/types";
    import type {FunFilter} from "@ticatec/uniface-element/ListBox";
    import type {ActionsColumn, DataColumn, IndicatorColumn} from "@ticatec/uniface-element/DataTable";
    import type PageAttrs from "$lib/common/PageAttrs";
    import CommonPage from "$lib/common/CommonPage.svelte";
    import DataTableBoard from "$lib/data-table/DataTableBoard.svelte";
    import FilterablePageBar from "$lib/common/FilterablePageBar.svelte";

    export let indicatorColumn: IndicatorColumn | null = null;
    export let columns: Array<DataColumn>;
    export let actionsColumn: ActionsColumn | null = null;
    export let selectedRows: Array<any> = [];
    export let list: Array<any>;
    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let onRefreshClick: MouseClickHandler;
    export let roundTable: boolean = false;

    export let filterFun: FunFilter | null = null;
    export let page$attrs: PageAttrs;
    export let canBeClosed: boolean = false;
    export let rowHeight: number = null as unknown as number;

    export let placeholder: string = '';


    export let emptyIndicator: string | undefined = undefined;
    ;

    let filterText: string = '';


</script>
<CommonPage page$attrs={page$attrs} {canBeClosed} content$style="padding: 12px; box-sizing: border-box; overflow: hidden">
    <slot name="sidebar" slot="sidebar"/>
    <FilterablePageBar slot="header-ext" bind:filter={filterText} filterable={filterFun!=null} {placeholder} {onCreateNewClick}
                       {onRefreshClick}/>
    <DataTableBoard {filterFun} {list} {filterText} {rowHeight} {indicatorColumn} {columns} {actionsColumn} {roundTable} {selectedRows}
                    {emptyIndicator} showHeader={false}/>
</CommonPage>