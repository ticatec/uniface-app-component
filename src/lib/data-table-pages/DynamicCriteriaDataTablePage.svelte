<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import CommonPaginationDataTablePage from "./PagedDataTablePage.svelte";
    import type {OnRowCountChanged, OnPageChange} from "@ticatec/uniface-element/PaginationPanel";
    import type {ActionsColumn, IndicatorColumn, MouseClickHandler} from "@ticatec/uniface-element";
    import type {DataColumn} from "@ticatec/uniface-element";
    import DynamicFilterPanel from "$lib/filter-panel/DynamicFilterPanel.svelte";
    import type MetaCriteriaField from "$lib/filter-panel/MetaCriteriaField";
    import type PageAttrs from "$lib/common/PageAttrs";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";

    export let indicatorColumn: IndicatorColumn;
    export let columns: Array<DataColumn>;
    export let criteria: any;
    export let fields: Array<MetaCriteriaField> = [];

    export let resetClickHandler: MouseClickHandler;
    export let searchClickHandler: MouseClickHandler;
    export let variant: 'outlined' | 'filled' = 'outlined';
    export let actionsColumn: ActionsColumn | null;
    export let selectedRows: Array<any> = [];
    export let list: Array<any>;
    export let total: number;
    export let pageCount: number;
    export let pageNo: number;
    export let onRowCountChanged: OnRowCountChanged;
    export let onPageChange: OnPageChange;
    export let page$attrs: PageAttrs;

    export let actions: ButtonActions = [];

    export let advancedCriteriaTitle: string = 'More';

    export let rowHeight: number = null as unknown as number;

</script>

<CommonPaginationDataTablePage page$attrs={page$attrs} {onPageChange} {onRowCountChanged} {pageNo} {pageCount} {total}
                               {list} bind:selectedRows {actionsColumn} {indicatorColumn} {columns} {rowHeight}>
    <DynamicFilterPanel slot="search-panel" style="flex: 0 0 auto" bind:criteria {fields} {actions} {resetClickHandler} {searchClickHandler}
                        {variant} {advancedCriteriaTitle}>
    </DynamicFilterPanel>
</CommonPaginationDataTablePage>