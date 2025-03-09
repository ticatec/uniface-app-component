<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import DataTable from "@ticatec/uniface-element/DataTable";
    import Box from "@ticatec/uniface-element/Box";
    import type {ActionsColumn, DataColumn, FunFilter, IndicatorColumn, MouseClickHandler} from "@ticatec/uniface-element";
    import Button from "@ticatec/uniface-element/Button";
    import SearchBox from "@ticatec/uniface-element/SearchBox";
    import type PageAttrs from "$lib/common/PageAttrs";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import Separator from "@ticatec/uniface-element/Separator";
    import {onMount} from "svelte";
    import CommonPage from "$lib/common/CommonPage.svelte";

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

    let filter: string = '';
    let filteredList: Array<any> = [];

    const doFilter = (arr: Array<any>, m: string) => {
        if (!m) {
            filteredList = [...list];
        } else {
            filteredList = list.filter(item => filterFun?.(item, m));
        }
    }

    onMount(async ()=>{
        indicatorColumn.emptyIndicator = indicatorColumn.emptyIndicator ?? i18n.getText('uniface.app.emptyFiltered', 'There is no data that meets the filter criteria. Please set the filter criteria again.')
    })

    $: doFilter(list, filter);


</script>
<CommonPage page$attrs={page$attrs} {canBeClosed} content$style="padding: 12px; box-sizing: border-box; overflow: hidden">
    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        {#if filterFun}
            <SearchBox variant="outlined" compact bind:value={filter} style="width: 240px"/>
            <Separator/>
        {/if}
        {#if onCreateNewClick}
            <Button type="third" icon="uniface-icon-plus" label={i18n.getText('uniface.app.btnNew', 'New')}
                    onClick={onCreateNewClick}></Button>
            <Separator/>
        {/if}

        <Button type="primary" label={i18n.getText('uniface.app.btnRefresh', 'Refresh')} onClick={onRefreshClick}></Button>
    </div>

    <Box style="border: 1px solid var(--uniface-editor-border-color, #F8FAFC); width: 100%; height: 100%" round={roundTable}>
        <DataTable style="height: 100%; width: 100%" {rowHeight} {columns} {indicatorColumn} {actionsColumn} bind:selectedRows
                   list={filteredList}></DataTable>
    </Box>
</CommonPage>