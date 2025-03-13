<script lang="ts">

    import DataListTablePage from "$lib/data-table/ListPage.svelte";
    import AppManager from "../../cards/managed-common-cards/AppManager";
    import type {ActionsColumn, IndicatorColumn, RowAction} from "@ticatec/uniface-element/DataTable";
    import columns from "../managed-list-table/AppColumns";
    import {onMount} from "svelte";
    import type PageAttrs from "$lib/common/PageAttrs";

    const dataMgr = new AppManager();

    let page$attrs: PageAttrs = {
        title: "数据表格页面演示",
        style: "padding: 0"
    };

    let list: Array<any> = [];

    let selectedList: Array<any> = [];

    const onCreateNewClick = () => {

    }

    const reloadData = async () => {
        window.Indicator.show('加载数据...')
        try {
            await dataMgr.loadData();
            list = dataMgr.list;
        } finally {
            window.Indicator.hide();
        }
    }

    const doFilter = (app: any, text: string): boolean => {
        return app.name.indexOf(text) > -1 || app.code.indexOf(text) > -1
    }

    let indicatorColumn: IndicatorColumn = {
        width: 40,
        selectable: true
    }

    const actionsColumn: ActionsColumn = {
        title: '操作',
        width: 150,
        getActions: (item: any): Array<RowAction> => {
            return [
                {
                    label: '修改',
                    callback: () => {
                        console.log('操作数据...', item)
                    }
                }
            ]
        }
    }

    onMount(async() => {
        await reloadData();
    })

    $: console.log('选中应用：', selectedList);
</script>

<DataListTablePage {onCreateNewClick} {columns} {list} {indicatorColumn} onRefreshClick={reloadData} bind:selectedRows={selectedList}
                   filterFun={doFilter} page$attrs={page$attrs} {actionsColumn}>
</DataListTablePage>