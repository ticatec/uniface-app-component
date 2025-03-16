<script lang="ts">


    import type {ActionsColumn, DataColumn, FunFilter, IndicatorColumn, MouseClickHandler} from "@ticatec/uniface-element";
    import Box from "@ticatec/uniface-element/Box";
    import DataTable from "@ticatec/uniface-element/DataTable";
    import utils from "@ticatec/uniface-element/utils";

    export let indicatorColumn: IndicatorColumn | null = null;
    export let columns: Array<DataColumn>;
    export let actionsColumn: ActionsColumn | null = null;
    export let selectedRows: Array<any> = [];
    export let list: Array<any>;
    export let showHeader: boolean = true;
    export let roundTable: boolean = false;

    export let filterFun: FunFilter | null = null;
    export let rowHeight: number = null as unknown as number;

    export let filterText: string | null = null;


    let filteredList: Array<any> = [];

    const doFilter = (arr: Array<any>, text: string | null) => {
        text = (text ?? '').trim();
        if (utils.isEmpty(text) || filterFun == null || !arr) {
            filteredList = [...arr];
        } else {
            filteredList = arr.filter(item => filterFun?.(item, text));
        }
    }

    $: doFilter(list, filterText);
</script>

<div class="common-page-container">
    {#if $$slots.header && showHeader}
        <div class="card_board_header">
            <slot name="header"/>
        </div>
    {/if}
    <Box style="border: 1px solid var(--uniface-editor-border-color, #F8FAFC); width: 100%; height: 100%" round={roundTable}>
        <DataTable style="height: 100%; width: 100%" {rowHeight} {columns} {indicatorColumn} {actionsColumn} bind:selectedRows
                   list={filteredList}></DataTable>
    </Box>
    {#if $$slots.footer}
        <div class="card_board_footer">
            <slot name="footer"/>
        </div>
    {/if}
</div>
