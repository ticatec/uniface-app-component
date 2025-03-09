<script lang="ts">

    import AppManager from "./AppManager";
    import ManagedCardsPage from "$lib/managed-card-pages/ManagedCardListPage.svelte";
    import GroupCard from "./ApplicationCard.svelte";
    import {AppModule} from "$lib/module";
    import SimpleFormDemo from "../../forms/SimpleFormDemo.svelte";

    const dataMgr = new AppManager();

    let page$attrs = {
        title: "托管卡片页面演示"
    };

    let list: Array<any> = [];

    const onCreateNewClick = () => {
        AppModule.showPage(SimpleFormDemo, {})
    }

    const doFilter = (app: any, text: string): boolean => {
        return app.name.indexOf(text) > -1 || app.code.indexOf(text) > -1
    }

    $: console.log('数据列表', list);
</script>

<ManagedCardsPage dataManager={dataMgr} bind:list page$attrs="{page$attrs}" filterFun={doFilter} render={GroupCard} {onCreateNewClick}/>