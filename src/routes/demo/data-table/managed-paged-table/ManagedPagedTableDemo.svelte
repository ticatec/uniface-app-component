<script lang="ts">

    import TenantManager from "../../cards/managed-paged-cards/TenantManager";
    import CriteriaFilterPanel from "../../cards/managed-paged-cards/CriteriaFilterPanel.svelte";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import PagingListPage from "$lib/data-table/managed/PagingListPage.svelte";
    import type {ActionsColumn, IndicatorColumn, RowAction} from "@ticatec/uniface-element";
    import columns from "./TenantColumns";

    export let canBeClosed: boolean = false;

    const dataMgr = new TenantManager();

    let page$attrs = {
        title: "托管卡片页面演示"
    };

    let list: Array<any> = [];
    let tablePage: any;

    let criteria: any = {}

    const doResetSearch = async () => {
        tablePage.reset();
    }

    const doSearch = async () => {
        tablePage.search()
    }

    const addNewRole = () => {
        let data = {};
        //window.Dialog.showModal(RoleDetailPanel, {saveCallback, data})
    }

    let actions: ButtonActions = [
        {label: '新增', type: 'primary', handler: addNewRole}
    ]

    let indicatorColumn: IndicatorColumn = {
        width: 40,
        selectable: false
    }

    const actionsColumn: ActionsColumn = {
        width: 150,
        getActions: (item: any): Array<RowAction> => {
            return []
        }
    }
</script>

<PagingListPage bind:this={tablePage} {actionsColumn} {indicatorColumn} dataManager={dataMgr} bind:list page$attrs="{page$attrs}"
                           bind:criteria {columns} rowHeight={48} {canBeClosed} {actions}>
    <div style="width: 300px; height: 100%; box-sizing: border-box; padding: 12px 0 12px 12px" slot="sidebar">
        <div style="width: 100%; height: 100%; overflow: auto; border: 1px solid var(--uniface-plain-border-color, #f0f0f0);">

        </div>
    </div>
    <CriteriaFilterPanel bind:criteria slot="search-panel"/>
</PagingListPage>