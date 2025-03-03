<script lang="ts">

    import TenantManager from "../../cards/managed-paged-cards/TenantManager";
    import CriteriaFilterPanel from "../../cards/managed-paged-cards/CriteriaFilterPanel.svelte";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import ManagedPagedDataTablePage from "$lib/managed-pages/ManagedPagedDataTablePage.svelte";
    import type {ActionsColumn, IndicatorColumn, RowAction} from "@ticatec/uniface-element";
    import columns from "./TenantColumns";

    const dataMgr = new TenantManager();

    let page$attrs = {
        title: "托管卡片页面演示"
    };

    let list: Array<any> = [];
    let tablePage: any;

    const onCreateNewClick = () => {

    }

    let criteria: any = {}

    const doResetSearch = async () => {
        tablePage.reset();
    }

    const doSearch = async () => {
        tablePage.search()
    }

    const saveCallback = (data: any, isNew: boolean) => {

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
        title: '操作',
        width: 150,
        getActions: (item: any): Array<RowAction> => {
            return []
        }
    }



    $: console.log('数据列表', tablePage);
</script>

<ManagedPagedDataTablePage bind:this={tablePage} {actionsColumn} {indicatorColumn} dataManager={dataMgr} bind:list page$attrs="{page$attrs}"
                           bind:criteria {columns} rowHeight={48}>
    <CriteriaFilterPanel bind:criteria slot="search-panel" {actions} resetClickHandler={doResetSearch} searchClickHandler={doSearch}/>
</ManagedPagedDataTablePage>