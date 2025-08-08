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

1.  **创建一个 `PagedDataService`**

    ```ts
    // src/services/TenantService.ts
    import { PagedDataService } from '@ticatec/app-data-service';

    export class TenantService extends PagedDataService<any> {
        constructor() {
            super('/api/tenants');
        }
    }
    ```

2.  **定义你的列**

    ```ts
    // src/config/TenantColumns.ts
    export const tenantColumns = [
        { key: 'name', label: '租户名称' },
        { key: 'email', label: '联系邮箱' },
        { key: 'status', label: '状态' }
    ];
    ```

3.  **在你的页面中使用该组件**

    ```svelte
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/data-table/managed/PagingListPage.svelte';
        import { TenantService } from '../services/TenantService';
        import { tenantColumns } from '../config/TenantColumns';

        const tenantService = new TenantService();
    </script>

    <PagingListPage
        title="托管租户列表"
        service={tenantService}
        columns={tenantColumns}
        let:row
        let:index
    >
        <!--
            这个插槽被直接传递给底层的 DataTable。
            您需要负责为每一行数据 `row` 渲染 `<tr>` 和 `<td>` 元素。
        -->
        <tr class="hover">
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.status}</td>
        </tr>
    </PagingListPage>
    ```

## 组件属性 (Props)

-   `title: string`: 显示在页面顶部的标题。
-   `service: PagedDataService`: 您的数据服务实例。**(必需)**
-   `columns: any[]`: 传递给底层 `DataTable` 用于渲染 `<thead>` 的列定义数组。**(必需)**
-   `pageNo?: number`: 初始加载的页码（从1开始）。默认为 `1`。
-   `pageSize?: number`: 每页的项目数。默认为 `10`。
-   `showActionBar?: boolean`: 是否显示顶部的操作栏。默认为 `true`。
-   `showPagingBar?: boolean`: 是否显示底部的分页栏。默认为 `true`。

## 插槽属性 (Slot Properties)

-   `let:row`: 当前行的数据对象。
-   `let:index`: 当前行在页面内的索引（从0开始）。