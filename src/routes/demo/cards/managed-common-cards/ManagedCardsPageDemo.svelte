<script lang="ts">

    import AppManager from "./AppManager";
    import ManagedCardsPage from "$lib/cards/managed/ListPage.svelte";
    import GroupCard from "./ApplicationCard.svelte";
    import {AppModule} from "$lib/module";
    import SimpleFormDemo from "../../forms/SimpleFormDemo.svelte";
    import Breadcrumbs from "@ticatec/uniface-element/Breadcrumbs";

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

    let render = {
        component: GroupCard,
        props: null
    }

    let breadcrumbs = [
        {
            label: "中国",
            data: {}
        },
        {
            label: "河北省",
            data: {}
        },
        {
            label: "石家庄市",
            data: {}
        },
        {
            label: "桥西区",
            data: {}
        },
        {
            label: "西里派出所",
            data: {}
        }
    ]


    const handleItemClick = (item: any) => (event: MouseEvent) => {
        console.log(item)
    }
</script>

<ManagedCardsPage dataManager={dataMgr} bind:list page$attrs="{page$attrs}" filterFun={doFilter} {render} {onCreateNewClick}>
    <Breadcrumbs style="border-bottom: 1px solid #f0f0f0" slot="header" items={breadcrumbs} onItemClick={handleItemClick}/>
</ManagedCardsPage>