<!--
    常规的分页查询页面，上部为查询条件面板和操作按钮区，中间为数据表格，底部为分页指示器
-->
<script lang="ts">

    import DataTable from "@ticatec/uniface-element/DataTable";
    import Box from "@ticatec/uniface-element/Box";
    import type {ActionsColumn, DataColumn, FunFilter, IndicatorColumn, MouseClickHandler} from "@ticatec/uniface-element";
    import Page from "@ticatec/uniface-element/Page";
    import Button from "@ticatec/uniface-element/Button";
    import SearchBox from "@ticatec/uniface-element/SearchBox";
    import type PageAttrs from "$lib/common/PageAttrs";
    import uniAppCtx from "$lib/common/uniAppCtx";
    import AppModule from "$lib/module/AppModule";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import Separator from "@ticatec/uniface-element/Separator";

    export let indicatorColumn: IndicatorColumn;
    export let columns: Array<DataColumn>;
    export let actionsColumn: ActionsColumn = null as unknown as ActionsColumn;
    export let selectedRows: Array<any> = [];
    export let list: Array<any>;
    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let onRefreshClick: MouseClickHandler;
    export let roundTable: boolean = false;

    export let filterFun: FunFilter | null = null;
    export let page$attrs: PageAttrs;
    export let rowHeight: number = null as unknown as number;

    let filter: string = '';
    let filteredList: Array<any> = [];

    const closePage = (event: MouseEvent) => {
        AppModule.closeActivePage();
    }

    const doFilter = (arr: Array<any>, m: string) => {
        if (!m) {
            filteredList = [...list];
        } else {
            filteredList = list.filter(item => filterFun?.(item, m));
        }
    }

    $: doFilter(list, filter);


</script>
<Page round={uniAppCtx.roundPage} title={page$attrs?.title} comment={page$attrs?.comment} style={page$attrs?.style}
      shadow={uniAppCtx.shadowPage} content$style="padding: 12px; box-sizing: border-box; overflow: hidden">
    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        {#if filterFun}
            <SearchBox variant="outlined" compact bind:value={filter} style="width: 240px"/>
            <Separator/>
        {/if}
        {#if onCreateNewClick}
            <Button type="third" icon="uniface-icon-plus" label={i18n.getText('uniface.appTemplate.btnNew', 'Create New')}
                    onClick={onCreateNewClick}></Button>
            <Separator/>
        {/if}

        <Button type="primary" label={i18n.getText('uniface.appTemplate.btnRefresh', 'Refresh')} onClick={onRefreshClick}></Button>
        {#if page$attrs.canClose}
            <Button type="default" label={i18n.getText('uniface.appTemplate.btnClose', 'Close')} onClick={closePage}></Button>
        {/if}

    </div>

    <Box style="border: 1px solid var(--uniface-editor-border-color, #F8FAFC); width: 100%; height: 100%" round={roundTable}>
        <DataTable {rowHeight} {columns} {indicatorColumn} {actionsColumn} bind:selectedRows
                   list={filteredList}></DataTable>
    </Box>
</Page>