# 数据表格: 非托管列表 (Unmanaged ListPage)

`data-table/ListPage.svelte` 组件用于在表格中显示一个完整的、不进行分页的数据列表。它包装了底层的 `@ticatec/uniface-element/DataTable` 并使用一个 `ListDataManager` 来持有数据和状态。

## 设计目的

当您在客户端有一个不需要分页的数据集时，应使用此组件。它提供了一个包含标题和筛选栏的布局，而您通过 `ListDataManager` 来控制数据。

## 关键依赖

-   **`@ticatec/uniface-element/DataTable`**: 渲染核心的表格。
-   **`@ticatec/app-data-manager/ListDataManager`**: 这个类持有完整的数据数组，并提供客户端筛选功能。组件的搜索栏会直接与这个管理器交互。

## 如何使用

您需要创建一个 `ListDataManager` 实例，用您的数据数组填充它，然后将其传递给组件。组件会渲染 `manager.filtered` 的数据。

1.  **设置您的 `ListDataManager` 并填入数据。**

    ```ts
    import { ListDataManager } from '@ticatec/app-data-manager';

    const columns = [
        { key: 'name', label: '用户名' },
        { key: 'role', label: '角色' }
    ];

    const allUsers = [
        { name: 'Alice', role: 'Admin' },
        { name: 'Bob', role: 'Developer' },
        { name: 'Charlie', role: 'User' }
    ];

    // 1. 创建管理器实例并提供完整数据集。
    const manager = new ListDataManager({
        data: allUsers,
        // 2. 可选: 定义哪些字段可以被搜索栏筛选。
        filterableFields: ['name', 'role']
    });
    ```

2.  **在您的页面中使用该组件**

    ```svelte
    <script lang="ts">
        // ... (上面的脚本)
        import ListPage from '@ticatec/uniface-app-component/data-table/ListPage.svelte';
    </script>

    <ListPage
        title="所有用户"
        dataManager={manager}
        {columns}
        let:row
    >
        <tr class="hover">
            <td>{row.name}</td>
            <td>{row.role}</td>
        </tr>
    </ListPage>
    ```

## 组件属性 (Props)

-   `title: string`: 显示在页面顶部的标题。
-   `dataManager: ListDataManager`: 您手动控制的数据管理器实例。**(必需)**
-   `columns: any[]`: 列定义对象的数组。**(必需)**
-   `showActionBar?: boolean`: 是否显示顶部的操作栏。默认为 `true`。
-   `showFilterBar?: boolean`: 是否显示筛选/搜索栏。默认为 `true`。