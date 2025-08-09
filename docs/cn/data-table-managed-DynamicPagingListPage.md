# 数据表格: 托管动态分页列表 (Managed DynamicPagingListPage)

`data-table/managed/DynamicPagingListPage.svelte` 是本库中最高级的数据表格组件。它包装了 `@ticatec/uniface-element/DataTable` 并将其与动态筛选面板集成，允许用户动态构建复杂的查询。

## 设计目的

在高级搜索场景中使用此组件。它将筛选面板与分页数据表格集成，底层的 `PagedDataService` 会在每次数据请求时接收到筛选条件。底层的 `DataTable` 用于最终的渲染。


## 核心功能

-   **动态筛选**: 包含一个用于放置筛选面板组件（如 `@ticatec/uniface-filter-panel`）的插槽。
-   **自动集成**: 在每次数据获取时，自动将面板中的筛选条件传递给 `PagedDataService`。
-   **完全自动化**: 与其他托管组件一样，它能自动处理分页、加载状态和错误。

## 如何使用

该组件需要一个 `PagingDataService`、一个 `PagedDataManager` 以及一个能暴露其筛选条件的筛选面板组件。

1.  **创建一个 `PagingDataService`**

    ```ts
    // src/services/DynamicTenantService.ts
    import { PagingDataService } from '@ticatec/app-data-service';

    export default class DynamicTenantService extends PagingDataService {
        constructor() {
            super('/api/tenants/search');
        }
    }

    export const service = new DynamicTenantService();
    ```

2.  **创建一个 `PagedDataManager`**

    ```ts
    // src/managers/DynamicTenantManager.ts
    import { PagedDataManager } from '@ticatec/app-data-manager';
    import { service } from '../services/DynamicTenantService';

    export default class DynamicTenantManager extends PagedDataManager {
        constructor() {
            super(service, 'id');
        }
    }
    ```

3.  **定义您的列配置**

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

4.  **在您的页面中使用该组件**

    ```svelte
    <script lang="ts">
        import DynamicPagingListPage from '@ticatec/uniface-app-component/data-table/managed/DynamicPagingListPage.svelte';
        import DynamicTenantManager from '../managers/DynamicTenantManager';
        import columns from '../config/TenantColumns';
        import CriteriaFilterPanel from './CriteriaFilterPanel.svelte';

        const dataManager = new DynamicTenantManager();

        let page$attrs = {
            title: "动态租户搜索"
        };
    </script>

    <DynamicPagingListPage
        {dataManager}
        {columns}
        {page$attrs}
        rowHeight={48}
    >
        <CriteriaFilterPanel slot="search-panel" />
    </DynamicPagingListPage>
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

## 插槽 (Slots)

-   `search-panel`: 在此放置您的筛选面板组件。可用于提供动态搜索条件。
-   `sidebar`: 可选的侧边栏内容。

## 功能特性

-   使用 PagedDataManager 自动数据获取
-   内置分页控件
-   动态搜索和筛选功能
-   使用自定义条件的服务端数据加载
-   加载和错误状态管理
-   使用 @ticatec/uniface-element/DataTable 进行渲染
-   支持行选择和操作
-   带有操作栏和侧边栏支持的响应式布局
