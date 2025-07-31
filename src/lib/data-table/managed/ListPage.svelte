<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import ListPage from "$lib/data-table/ListPage.svelte";
    import type {MouseClickHandler} from "@ticatec/uniface-element/types";
    import type {FunFilter} from "@ticatec/uniface-element/ListBox";

    import type {ActionsColumn, DataColumn, IndicatorColumn} from "@ticatec/uniface-element/DataTable";
    import {FullListDataManager} from "@ticatec/app-data-manager";
    import {onMount} from "svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import type {FullListDataService} from "@ticatec/app-data-service";
    import type {PageInitialize} from "$lib/common";
    import ModuleErrorPage from "$lib/common/ModuleErrorPage.svelte";
    import i18nRes from "$lib/i18nRes";

    export let dataManager: FullListDataManager<FullListDataService>;
    export let initializeData: PageInitialize | null = null;
    export let indicatorColumn: IndicatorColumn;
    export let columns: Array<DataColumn>;
    export let actionsColumn: ActionsColumn = null as unknown as ActionsColumn;
    export let selectedRows: Array<any> = [];
    export let list: Array<any>;
    export let queryParams: any = null;
    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let filterFun: FunFilter | null = null;
    export let page$attrs: PageAttrs;
    export let busyIndicator: string | null = null;
    export let rowHeight: number = null as unknown as number;
    export let roundTable: boolean = false;
    export let canBeClosed: boolean = false;
    export let emptyIndicator: string | undefined = undefined;
    export let placeholder: string = '';
    let loaded: boolean = false;
    let error: any;

    export const loadList = async () => {
        window.Indicator.show(busyIndicator ?? 'Loading...');
        try {
            await dataManager.loadData(queryParams);
            list = dataManager.list;
        } finally {
            window.Indicator.hide();
        }
    }

    onMount(async () => {
        window.Indicator.show(busyIndicator ?? i18nRes.app.busyIndicator);
        try {
            await initializeData?.();
            await dataManager.loadData(queryParams);
            list = dataManager.list;
        } catch (ex) {
            console.error('Module loading with error', ex);
            error = ex;
        } finally {
            loaded = true;
            window.Indicator?.hide();
        }
    })


    let onRefreshClick: MouseClickHandler = async () => {
        await loadList();
    }


</script>
{#if loaded}
    {#if error}
        <ModuleErrorPage {error} {canBeClosed}/>
    {:else }
        <ListPage {onCreateNewClick} {filterFun} {page$attrs} {rowHeight} {roundTable} {canBeClosed} {emptyIndicator} {placeholder}
                  {indicatorColumn} {columns} {actionsColumn} bind:selectedRows {list} {onRefreshClick}>
            <slot name="sidebar" slot="sidebar"/>
        </ListPage>

    {/if}
{/if}