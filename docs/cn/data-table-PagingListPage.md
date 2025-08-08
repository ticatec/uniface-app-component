# 数据表格: 非托管分页列表 (Unmanaged PagingListPage)

`data-table/PagingListPage.svelte` 组件是分页数据表格的“非托管”版本。它通过包装 `@ticatec/uniface-element/DataTable` 提供了 UI 和基本结构，但将数据获取和状态管理的控制权通过 `PagingDataManager` 完全交给了您。

## 设计目的

当您需要完全控制数据的获取方式和时机时，应使用此组件。该组件提供了页面结构和分页控件，但您需要负责创建、管理一个 `PagingDataManager` 实例，并用您的数据来更新它。

## 关键依赖

-   **`@ticatec/uniface-element/DataTable`**: 用于渲染核心的表格结构 (`<thead>`, `<tbody>`)。
-   **`@ticatec/app-data-manager/PagingDataManager`**: 这个类是该组件的“大脑”。它持有分页状态（`pageNo`, `pageSize`, `total`）、当前页的数据以及加载/错误状态。您将直接与这个管理器交互。

## 如何使用

您需要手动创建一个 `PagingDataManager` 实例，编排 API 调用，并将结果反馈给该管理器。`PagingListPage` 组件仅负责渲染该管理器的状态。

1.  **在您的页面脚本中创建并管理一个 `PagingDataManager`。**

    ```ts
    import { PagingDataManager } from '@ticatec/app-data-manager';
    import { onMount } from 'svelte';

    const columns = [
        { key: 'name', label: '租户名称' },
        { key: 'email', label: '联系邮箱' }
    ];

    // 1. 创建管理器实例。
    const manager = new PagingDataManager({ pageSize: 10 });

    // 2. 创建一个函数从您的 API 获取数据。
    async function fetchData(pageNo: number, pageSize: number) {
        manager.loading = true;
        try {
            const response = await fetch(`/api/tenants?page=${pageNo}&size=${pageSize}`);
            const result = await response.json(); // 例如, { data: [], total: 100 }

            // 3. 使用新数据和总数来更新管理器。
            // 这将导致组件重新渲染。
            manager.updatePagedData({
                data: result.data,
                total: result.total
            });

        } catch (e) {
            manager.error = e;
        } finally {
            manager.loading = false;
        }
    }

    // 4. 监听来自管理器的 'page-changed' 事件。
    // 组件的分页栏会触发此事件。
    manager.on('page-changed', (newPage) => {
        fetchData(newPage.pageNo, newPage.pageSize);
    });

    // 5. 组件挂载时获取初始数据。
    onMount(() => {
        fetchData(manager.pageNo, manager.pageSize);
    });
    ```

2.  **在您的页面中使用该组件**

    ```svelte
    <script lang="ts">
        // ... (上面的脚本)
        import PagingListPage from '@ticatec/uniface-app-component/data-table/PagingListPage.svelte';
    </script>

    <PagingListPage
        title="非托管租户列表"
        dataManager={manager}
        {columns}
        let:row
    >
        <tr class="hover">
            <td>{row.name}</td>
            <td>{row.email}</td>
        </tr>
    </PagingListPage>
    ```

## 组件属性 (Props)

-   `title: string`: 显示在页面顶部的标题。
-   `dataManager: PagingDataManager`: 您手动控制的数据管理器实例。**(必需)**
-   `columns: any[]`: 传递给底层 `DataTable` 的列定义数组。**(必需)**
-   `showActionBar?: boolean`: 是否显示顶部的操作栏。默认为 `true`。
-   `showPagingBar?: boolean`: 是否显示底部的分页栏。默认为 `true`。