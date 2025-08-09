# 数据表格: 非托管分页列表 (Unmanaged PagingListPage)

`data-table/PagingListPage.svelte` 组件是分页数据表格的"非托管"版本。它通过包装 `@ticatec/uniface-element/DataTable` 提供了 UI 和基本结构，但将数据获取和状态管理的控制权通过 `PagingDataManager` 完全交给了您。

## 设计目的

当您需要完全控制数据的获取方式和时机时，应使用此组件。该组件提供了页面结构和分页控件，但您需要负责创建、管理一个 `PagingDataManager` 实例，并用您的数据来更新它。

## 关键依赖

-   **`@ticatec/uniface-element/DataTable`**: 用于渲染核心的表格结构 (`<thead>`, `<tbody>`)。
-   **`@ticatec/app-data-manager/PagingDataManager`**: 这个类是该组件的"大脑"。它持有分页状态（`pageNo`, `pageSize`, `total`）、当前页的数据以及加载/错误状态。您将直接与这个管理器交互。

## 如何使用

您需要手动创建一个 `PagingDataManager` 实例，编排 API 调用，并将结果反馈给该管理器。`PagingListPage` 组件仅负责渲染该管理器的状态。

1.  **准备您的数据和列定义**

    ```ts
    import type { DataColumn } from "@ticatec/uniface-element";
    import { PagingDataManager } from '@ticatec/app-data-manager';
    import { onMount } from 'svelte';

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
        }
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

        let page$attrs = {
            title: "非托管租户列表"
        };

        // 可选的操作按钮处理器
        const onCreateNewClick = () => {
            // 创建新项目的逻辑
        };

        const onRefreshClick = () => {
            fetchData(manager.pageNo, manager.pageSize);
        };
    </script>

    <PagingListPage
        {page$attrs}
        list={manager.pagedData.data}
        {columns}
        {onCreateNewClick}
        {onRefreshClick}
        rowHeight={48}
        canBeClosed={false}
    />
    ```

## 组件属性 (Props)

-   `page$attrs: PageAttrs`: 包含标题和其他页面级设置的页面属性。**(必需)**
-   `list: Array<any>`: 要在表格中显示的数据项数组。**(必需)**
-   `columns: Array<DataColumn>`: 来自 @ticatec/uniface-element 的列定义对象数组。**(必需)**
-   `onCreateNewClick?: MouseClickHandler`: "创建新项" 按钮的处理器。
-   `onRefreshClick?: MouseClickHandler`: 刷新按钮的处理器。
-   `indicatorColumn?: IndicatorColumn`: 选择指示器的配置。
-   `actionsColumn?: ActionsColumn`: 行操作按钮的配置。
-   `selectedRows?: Array<any>`: 要绑定选定行的数组。
-   `rowHeight?: number`: 每行的像素高度。
-   `canBeClosed?: boolean`: 页面是否可以关闭。默认为 `false`。
-   `roundTable?: boolean`: 是否使用圆角表格边角。默认为 `false`。
-   `placeholder?: string`: 搜索输入框的占位符文本。
-   `emptyIndicator?: string`: 空状态的自定义文本。

## 插槽 (Slots)

-   `sidebar`: 可选的侧边栏内容。

## 功能特性

-   使用 @ticatec/uniface-element/DataTable 进行数据显示
-   基于 PagingDataManager 的分页控件和加载状态管理
-   内置筛选和搜索功能
-   支持行选择和操作
-   可自定义的操作按钮（创建新项、刷新）
-   具有可筛选页面栏的响应式设计
-   可选的侧边栏支持