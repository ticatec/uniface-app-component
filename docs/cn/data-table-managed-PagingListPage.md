# 数据表格: 托管分页列表 (Managed PagingListPage)

`data-table/managed/PagingListPage.svelte` 组件是一个功能强大的高级工具，用于显示来自服务端的分页数据。它包装了底层的 `@ticatec/uniface-element/DataTable` 组件，以完全自动化数据获取、分页和状态管理的整个流程。

## 设计目的

该组件专为从 API 分页查询大型数据集的常见用例而设计。它抽象了实现以下功能所需的样板代码：
- 调用数据服务。
- 处理加载和错误状态。
- 管理分页控件。
- 刷新数据。
- 显示空状态。

## 工作原理

该组件扮演着一个“智能”包装器的角色。它会在内部自动创建并管理自己的 `PagingDataManager` 实例。它使用您提供的 `service` 来获取数据并填充内部的管理器，该管理器随后驱动底层的 `@ticatec/uniface-element/DataTable` 组件。

您的 `let:row` 插槽被直接传递给底层的 `DataTable`，让您能完全控制行的渲染。


## 如何使用

1.  **创建一个 `PagingDataService`**

    ```ts
    // src/services/TenantService.ts
    import { PagingDataService } from '@ticatec/app-data-service';

    export default class TenantService extends PagingDataService {
        constructor() {
            super('/api/tenants');
        }
    }

    export const service = new TenantService();
    ```

2.  **创建一个 `PagedDataManager`**

    ```ts
    // src/managers/TenantManager.ts
    import { PagedDataManager } from '@ticatec/app-data-manager';
    import { service } from '../services/TenantService';

    export default class TenantManager extends PagedDataManager {
        constructor() {
            super(service, 'id');
        }
    }
    ```

3.  **定义你的列配置**

    ```ts
    // src/config/TenantColumns.ts
    import type { DataColumn } from "@ticatec/uniface-element";

    const columns: Array<DataColumn> = [
        {
            text: '租户名称',
            field: 'name',
            width: 200,
            resizable: true
        },
        {
            text: '联系邮箱',
            field: 'email',
            width: 250,
            resizable: true
        },
        {
            text: '状态',
            field: 'status',
            width: 120,
            align: 'center'
        }
    ];

    export default columns;
    ```

4.  **在你的页面中使用该组件**

    ```svelte
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/data-table/managed/PagingListPage.svelte';
        import TenantManager from '../managers/TenantManager';
        import columns from '../config/TenantColumns';

        const dataManager = new TenantManager();

        let page$attrs = {
            title: "托管租户列表"
        };
    </script>

    <PagingListPage
        {dataManager}
        {columns}
        {page$attrs}
        rowHeight={48}
    />
    ```

## 组件属性 (Props)

-   `dataManager: PagedDataManager`: 您的数据管理器实例。**(必需)**
-   `columns: DataColumn[]`: 来自 @ticatec/uniface-element 的列定义对象数组。**(必需)**
-   `page$attrs: object`: 包含标题和其他页面级设置的页面属性。**(必需)**
-   `rowHeight?: number`: 每行的像素高度。默认为 `40`。
-   `canBeClosed?: boolean`: 页面是否可以关闭。默认为 `false`。
-   `actions?: ButtonActions`: 顶部操作栏的操作按钮数组。
-   `indicatorColumn?: IndicatorColumn`: 选择指示器的配置。
-   `actionsColumn?: ActionsColumn`: 行操作按钮的配置。

## 功能特性

-   使用 PagedDataManager 自动数据获取
-   内置分页控件
-   服务端数据加载和搜索
-   加载和错误状态管理
-   使用 @ticatec/uniface-element/DataTable 进行渲染
-   支持行选择和操作
-   带有操作栏的响应式布局