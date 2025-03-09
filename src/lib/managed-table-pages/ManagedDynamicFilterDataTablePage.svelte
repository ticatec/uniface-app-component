<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import ManagedPaginationDataTablePage from "$lib/managed-table-pages/ManagedPagingDataTablePage.svelte";
    import type {ActionsColumn, IndicatorColumn, MouseClickHandler} from "@ticatec/uniface-element";
    import type {DataColumn} from "@ticatec/uniface-element";
    import DynamicFilterPanel from "@ticatec/uniface-filter-panel/DynamicFilterPanel";
    import type {MetaCriteriaField} from "@ticatec/uniface-filter-panel";
    import type PageAttrs from "$lib/common/PageAttrs";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import type PagingDataManager from "$lib/common/PagingDataManager";

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

    export let rowHeight: number = null as unknown as number;
    export let roundTable: boolean = false;

    const resetClickHandler: MouseClickHandler = async () => {
        dataPage.reset();
    }
    const searchClickHandler: MouseClickHandler = async () => {
        dataPage.search();
    }

    let dataPage: any;


</script>

<ManagedPaginationDataTablePage bind:this={dataPage} {list} bind:selectedRows {dataManager} page$attrs={page$attrs} {busyIndicator} {roundTable}
                                {actionsColumn} {rowHeight} {indicatorColumn} {columns} bind:criteria>

    <DynamicFilterPanel slot="search-panel" bind:criteria {fields} {resetClickHandler} {searchClickHandler} {variant} {actions}
                        {advancedCriteriaTitle}/>
</ManagedPaginationDataTablePage>