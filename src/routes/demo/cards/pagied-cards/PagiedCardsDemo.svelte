<script lang="ts">

    import PaginationCardsPage from "$lib/card-pages/PagedCardsPage.svelte";
    import utils from "@ticatec/uniface-element/utils";
    import RoleCard from "../common-cards/RoleCard.svelte";
    import CriteriaFilterPanel from "./CriteriaFilterPanel.svelte";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import RoleDetailPanel from "../common-cards/RoleDetailPanel.svelte";
    import {AppModule} from "$lib/module";
    import CommonCardsDemo from "../common-cards";

    let page$attrs = {
        title: "卡片页面演示"
    };

    let roles = [
        {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
        {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
        {name: "运维人员"},
        {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
        {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
        {name: "运维人员"},
        {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
        {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
        {name: "运维人员"},
        {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
        {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
        {name: "运维人员"},
        {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
        {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
        {name: "运维人员"},
        {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
        {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
        {name: "运维人员"},
        {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
        {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
        {name: "运维人员"},
        {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
        {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
        {name: "运维人员"},
        {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
        {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
        {name: "运维人员"}
    ]


    let total: number = 500;
    let pageCount: number = 10;
    let pageNo: number = 5;

    const onRowCountChanged = async (rows: number) => {
        window.Indicator.show('刷新数据...');
        await utils.sleep(3);
        window.Indicator.hide();
    }

    const onPageChange = async (no: number) => {
        window.Indicator.show('刷新数据...');
        await utils.sleep(3);
        window.Indicator.hide();
        pageNo = no;
    }

    let criteria: any = {}

    const doResetSearch = async () => {
        criteria = {};
        window.Indicator.show('刷新数据...');
        await utils.sleep(3);
        window.Indicator.hide();
        pageNo = 1;
    }

    const doSearch = async () => {
        criteria = {};
        window.Indicator.show('刷新数据...');
        await utils.sleep(3);
        window.Indicator.hide();
        pageNo = 1;
    }

    const saveCallback = (data: any, isNew: boolean) => {

    }

    const addNewRole = () => {
        let data = {};
        window.Dialog.showModal(RoleDetailPanel, {saveCallback, data})
    }

    let actions: ButtonActions = [
        {label: '新增', type: 'primary', handler: ()=> {AppModule.showPage(CommonCardsDemo, {canBeClosed: true})}}
    ]

</script>

<PaginationCardsPage {total} {onPageChange} {onRowCountChanged} {pageCount} {pageNo} list={roles} page$attrs={page$attrs}
                     card={RoleCard}>
    <CriteriaFilterPanel bind:criteria slot="search-panel" {actions} resetClickHandler={doResetSearch} searchClickHandler={doSearch}/>
</PaginationCardsPage>
