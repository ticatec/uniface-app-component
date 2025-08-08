# 数据表格: 托管动态分页列表 (Managed DynamicPagingListPage)

`data-table/managed/DynamicPagingListPage.svelte` 是本库中最高级的数据表格组件。它包装了 `@ticatec/uniface-element/DataTable` 并将其与动态筛选面板集成，允许用户动态构建复杂的查询。

## 设计目的

在高级搜索场景中使用此组件。它将筛选面板与分页数据表格集成，底层的 `PagedDataService` 会在每次数据请求时接收到筛选条件。底层的 `DataTable` 用于最终的渲染。


## 核心功能

-   **动态筛选**: 包含一个用于放置筛选面板组件（如 `@ticatec/uniface-filter-panel`）的插槽。
-   **自动集成**: 在每次数据获取时，自动将面板中的筛选条件传递给 `PagedDataService`。
-   **完全自动化**: 与其他托管组件一样，它能自动处理分页、加载状态和错误。

## 如何使用

该组件需要一个 `PagedDataService` 和一个能暴露其筛选条件的筛选面板组件。

1.  **创建一个 `PagedDataService`**

    该服务将自动以 `POST` 请求体的方式接收筛选条件。您的后端 API 必须能处理这种请求。

    ```ts
    // src/services/DynamicTenantService.ts
    import { PagedDataService } from '@ticatec/app-data-service';

    export class DynamicTenantService extends PagedDataService<any> {
        constructor() {
            // 服务会向此 URL 发送 POST 请求，请求体中包含筛选条件
            super('/api/tenants/search');
        }
    }
    ```

2.  **在您的页面中使用该组件**

    您需要在 `criteria` 插槽中提供一个筛选面板组件。`DynamicPagingListPage` 将会管理它。

    ```svelte
    <script lang="ts">
        import DynamicPagingListPage from '@ticatec/uniface-app-component/data-table/managed/DynamicPagingListPage.svelte';
        import { DynamicTenantService } from '../services/DynamicTenantService';
        import { tenantColumns } from '../config/TenantColumns';

        // 假设 CriteriaFilterPanel 是一个允许用户构建查询
        // 并通过 `getCriteria()` 方法暴露筛选条件的组件。
        import CriteriaFilterPanel from './CriteriaFilterPanel.svelte';

        const tenantService = new DynamicTenantService();
    </script>

    <DynamicPagingListPage
        title="动态租户搜索"
        service={tenantService}
        columns={tenantColumns}
        let:row
    >
        <div slot="criteria">
            <CriteriaFilterPanel />
        </div>

        <!-- 行渲染插槽 -->
        <tr class="hover">
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.status}</td>
        </tr>
    </DynamicPagingListPage>
    ```

## 组件属性 (Props)

-   `title: string`: 页面的标题。
-   `service: PagedDataService`: 您的数据服务实例。**(必需)**
-   `columns: any[]`: 列定义对象的数组。**(必需)**
-   `pageNo?: number`: 初始页码。默认为 `1`。
-   `pageSize?: number`: 每页项目数。默认为 `10`。
-   `showActionBar?: boolean`: 是否显示顶部的操作栏。默认为 `true`。
-   `showPagingBar?: boolean`: 是否显示底部的分页栏。默认为 `true`。

## 插槽 (Slots)

-   `criteria`: 在此放置您的筛选面板组件。它必须是一个可以被页面管理的组件。
-   `default` (`let:row`, `let:index`): 用于渲染表格每一行的插槽。
