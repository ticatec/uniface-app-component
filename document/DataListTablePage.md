# 分页查询页面组件

## 组件概述

该组件用于展示常规的二维表格数据展现页面，页面结构包括：
- **快速过滤框**：提供文字输入框等完成过滤匹配。
- **操作按钮区**：包含新建、刷新等操作按钮。
- **数据表格**：用于展示查询结果数据。


## 使用方法

### 1. 引入组件
```ts
import DataTable from "@ticatec/uniface-element/DataTable";
import Box from "@ticatec/uniface-element/Box";
import Page from "@ticatec/uniface-element/Page";
import Button from "@ticatec/uniface-element/Button";
import SearchBox from "@ticatec/uniface-element/SearchBox";
import Separator from "@ticatec/uniface-element/Separator";
```

### 2. 组件参数

| 参数名称         | 类型            | 说明 |
|----------------|---------------|-----|
| `indicatorColumn` | `IndicatorColumn` | 指示列 |
| `columns`        | `Array<DataColumn>` | 数据列定义 |
| `actionsColumn`  | `ActionsColumn` | 操作列（可选） |
| `selectedRows`   | `Array<any>`   | 选中的行 |
| `list`          | `Array<any>`   | 数据列表 |
| `onCreateNewClick` | `MouseClickHandler` | 新建按钮点击事件 |
| `onRefreshClick`  | `MouseClickHandler` | 刷新按钮点击事件 |
| `roundTable`     | `boolean`      | 是否显示圆角表格 |
| `filterFun`      | `FunFilter`    | 过滤函数 |
| `page$attrs`     | `PageAttrs`    | 页面属性 |
| `rowHeight`      | `number`       | 行高 |

### 3. 事件处理

- **关闭页面**
```ts
const closePage = (event: MouseEvent) => {
    AppModule.closeActivePage();
}
```

- **过滤数据**
```ts
const doFilter = (arr: Array<any>, m: string) => {
    if (!m) {
        filteredList = [...list];
    } else {
        filteredList = list.filter(item => filterFun?.(item, m));
    }
}
```

### 4. 组件示例
```svelte
<script lang="ts">

    import DataListTablePage from "$lib/data-table-pages/DataListTablePage.svelte";
    import AppManager from "../../cards/managed-common-cards/AppManager";
    import type {ActionsColumn, IndicatorColumn, RowAction} from "@ticatec/uniface-element/DataTable";
    import columns from "../managed-list-table/AppColumns";
    import {onMount} from "svelte";

    const dataMgr = new AppManager();

    let page$attrs = {
        title: "数据表格页面演示"
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
```


