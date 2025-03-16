<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import ListPage from "$lib/data-table/ListPage.svelte";
    import type {ActionsColumn, FunFilter, IndicatorColumn, MouseClickHandler} from "@ticatec/uniface-element";
    import type {DataColumn} from "@ticatec/uniface-element";
    import {FullListDataManager} from "@ticatec/app-data-manager";
    import {onMount} from "svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import type {FullListDataService} from "@ticatec/app-data-service";
    import i18n from "@ticatec/i18n";
    import langRes from "$lib/i18n_resources/en_res";
    import type {PageInitialize} from "$lib/common";
    import ModuleErrorPage from "$lib/common/ModuleErrorPage.svelte";

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
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', langRes.uniface.app.busyIndicator));
        try {
            await initializeData?.();
            await dataManager.loadData(queryParams);
            list = dataManager.list;
        } catch (ex) {
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
        <ListPage {onCreateNewClick} {filterFun} {page$attrs} {rowHeight} {roundTable} {canBeClosed}
                  {indicatorColumn} {columns} {actionsColumn} bind:selectedRows {list} {onRefreshClick}/>

    {/if}
{/if}