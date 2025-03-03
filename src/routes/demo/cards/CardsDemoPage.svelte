<script lang="ts">

    import CommonCardsPage from "$lib/card-pages/CardsPage.svelte";
    import type {FunFilter, MouseClickHandler} from "@ticatec/uniface-element";
    import FlexFormCard from "./FlexFormCard.svelte";
    import utils from "@ticatec/uniface-element/utils";
    import SimpleFormDemo from "../forms/SimpleFormDemo.svelte";
    import AppModule from "$lib/module/AppModule";


    let onCreateNewClick: MouseClickHandler = (event: MouseEvent) => {
        console.log('新增条目');
        AppModule.showPage(SimpleFormDemo)
    };
    export let onRefreshClick: MouseClickHandler = async (event: MouseEvent) => {
        console.log('新增条目');
        window.Indicator.show('读取数据...');
        try {
            await utils.sleep(3);
            list = [...list];
        } finally {
            window.Indicator.hide();
        }
    };

    let title: string = '卒中表单';

    let comment: string = '国家标准版本';

    let list: Array<any> = [
        {title: '河北', comment: '这是河北版本1'},
        {title: '山东', comment: '这是山东版本1'},
        {title: '山东青岛', comment: '这是山东青岛版本'},
        {title: '版本1', comment: '这是版本1'},
        {title: '版本2', comment: '这是河北版本2'},
        {title: '版本3', comment: '这是版本3'},
        {title: '版本4', comment: '这是版本4'},
        {title: '版本5', comment: '这是版本5'},
        {title: '河北', comment: '这是河北版本1'},
        {title: '山东', comment: '这是山东版本1'},
        {title: '山东青岛', comment: '这是山东青岛版本'},
        {title: '版本1', comment: '这是版本1'},
        {title: '版本2', comment: '这是河北版本2'},
        {title: '版本3', comment: '这是版本3'},
        {title: '版本4', comment: '这是版本4'},
        {title: '版本5', comment: '这是版本5'}
    ];

    let filterFun: FunFilter = (item: any, text: string): boolean => {
        return (item.title ?? '').indexOf(text) > -1 || (item.comment ?? '').indexOf(text) > -1;
    }

    let page$attrs = {
        title: "卡片列表",
        canClose: true
    }
    //

</script>

<CommonCardsPage {onCreateNewClick} {onRefreshClick} page$attrs={page$attrs} {list} {filterFun} gap={12}
                   cardComponent={FlexFormCard}/>
