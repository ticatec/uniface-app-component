<script lang="ts">

    import CommonCardsPage from "$lib/cards/ListPage.svelte";
    import utils from "@ticatec/uniface-element/utils";
    import RoleCard from "./RoleCard.svelte";
    import RoleDetailPanel from "./RoleDetailPanel.svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import {AppModule} from "$lib/module";
    import ManagedPagedTableDemo from "../../data-table/managed-paged-table";

    export let canBeClosed: boolean = false;

    let page$attrs: PageAttrs = {
        title: "卡片页面演示"
    };

    const onRefreshClick = async () => {
        AppModule.showPage(ManagedPagedTableDemo, {canBeClosed: true})
    }

    let roles = [
        {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
        {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
        {name: "运维人员"}
    ]

    const saveCallback = (data: any, isNew: boolean) => {
        window.Toast.show('创建成功', 'success')
    }


    const onCreateNewClick = () => {
        let data = {};
        window.Dialog.showModal(RoleDetailPanel, {saveCallback, data})
    }

    const doFilter = (role: any, text: string): boolean => {
        return role.name.indexOf(text) > -1 || role.note?.indexOf(text) > -1
    }

</script>

<CommonCardsPage list={roles} page$attrs={page$attrs} {onRefreshClick} {canBeClosed} filterFun={doFilter} render={RoleCard} {onCreateNewClick}/>
