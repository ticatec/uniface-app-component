<script lang="ts">

    import TenantManager from "./TenantManager";
    import GroupCard from "./TenantCard.svelte";
    import ManagedPagedCardsPage from "$lib/cards/managed/PagingListPage.svelte";
    import CriteriaFilterPanel from "./CriteriaFilterPanel.svelte";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";

    const dataMgr = new TenantManager();

    let page$attrs = {
        title: "托管卡片页面演示"
    };

    let list: Array<any> = [];
    let cardPage: any;

    const onCreateNewClick = () => {

    }

    let criteria: any = {}

    const doResetSearch = async () => {
        cardPage.reset();
    }

    const doSearch = async () => {
        cardPage.search()
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


    $: console.log('数据列表', cardPage);
</script>

<ManagedPagedCardsPage bind:this={cardPage} dataManager={dataMgr} bind:list page$attrs="{page$attrs}" {actions} render={{component: GroupCard}}
                       bind:criteria>
    <CriteriaFilterPanel bind:criteria slot="search-panel"/>
</ManagedPagedCardsPage>