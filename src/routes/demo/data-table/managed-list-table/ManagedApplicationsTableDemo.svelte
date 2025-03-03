<script lang="ts">

    import ManagedDataTable from "$lib/managed-pages/ManagedDataTablePage.svelte";
    import AppManager from "../../cards/managed-common-cards/AppManager";
    import type {ActionsColumn, DataColumn, IndicatorColumn, RowAction} from "@ticatec/uniface-element";
    import type PageAttrs from "$lib/common/PageAttrs";
    import columns from "./AppColumns";

    const dataMgr = new AppManager();

    let page$attrs = {
        title: "托管数据表格页面演示"
    };

    let list: Array<any> = [];

    const onCreateNewClick = () => {

    }

    const doFilter = (app: any, text: string): boolean => {
        return app.name.indexOf(text) > -1 || app.code.indexOf(text) > -1
    }

    let indicatorColumn: IndicatorColumn = {
        width: 40,
        selectable: false
    }

    const actionsColumn: ActionsColumn = {
        title: '操作',
        width: 150,
        getActions: (item: any) : Array<RowAction> => {
            return []
        }
    }
</script>

<ManagedDataTable {onCreateNewClick} {columns} {list} {indicatorColumn} dataManager={dataMgr} filterFun={doFilter} page$attrs={page$attrs} {actionsColumn}>
</ManagedDataTable>