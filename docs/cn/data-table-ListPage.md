# 数据表格: 非托管列表 (Unmanaged ListPage)

`data-table/ListPage.svelte` 组件用于在表格格式中显示一个完整的、不进行分页的数据列表。它包装了底层的 `@ticatec/uniface-element/DataTable` 并使用数组直接显示数据。

## 设计目的

当您在客户端有一个不需要分页的数据集时，应使用此组件。它提供了一个包含标题和筛选栏的布局，您可以直接通过数据数组来控制。

## 关键依赖

-   **`@ticatec/uniface-element/DataTable`**: 渲染核心的表格。
-   **`@ticatec/app-data-manager/ListDataManager`**: 这个类持有完整的数据数组，并提供客户端筛选功能。组件的搜索栏会直接与这个管理器交互。

## 如何使用

该组件直接接受数据数组并使用 @ticatec/uniface-element/DataTable 以表格格式渲染它。

1.  **准备您的数据和列定义**

    ```ts
    import type { DataColumn } from "@ticatec/uniface-element";

    const columns: Array<DataColumn> = [
        {
            text: '用户名',
            field: 'name',
            width: 200,
            resizable: true
        },
        {
            text: '角色',
            field: 'role',
            width: 150,
            resizable: true
        }
    ];

    const allUsers = [
        { name: 'Alice', role: 'Admin' },
        { name: 'Bob', role: 'Developer' },
        { name: 'Charlie', role: 'User' }
    ];

    // 可选：创建客户端筛选函数
    const filterFun = (item: any, filterText: string) => {
        return item.name.toLowerCase().includes(filterText.toLowerCase()) ||
               item.role.toLowerCase().includes(filterText.toLowerCase());
    };
    ```

2.  **在您的页面中使用该组件**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/data-table/ListPage.svelte';
        
        let list = allUsers; // 您的数据数组

        let page$attrs = {
            title: "所有用户"
        };

        // 可选的刷新处理器
        const onRefreshClick = () => {
            // 在这里重新加载数据
        };
    </script>

    <ListPage
        {page$attrs}
        {list}
        {columns}
        {filterFun}
        {onRefreshClick}
        rowHeight={48}
    />
    ```

## 组件属性 (Props)

-   `page$attrs: PageAttrs`: 包含标题和其他页面级设置的页面属性。**(必需)**
-   `list: Array<any>`: 要在表格中显示的数据项数组。**(必需)**
-   `columns: Array<DataColumn>`: 来自 @ticatec/uniface-element 的列定义对象数组。**(必需)**
-   `filterFun?: FunFilter`: 用于客户端行筛选的可选函数。
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

-   使用 @ticatec/uniface-element/DataTable 进行客户端数据显示
-   内置筛选和搜索功能
-   支持行选择和操作
-   可自定义的操作按钮（创建新项、刷新）
-   具有可筛选页面栏的响应式设计
-   可选的侧边栏支持