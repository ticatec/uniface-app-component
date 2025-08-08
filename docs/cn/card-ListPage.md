# 卡片视图: 非托管列表 (Unmanaged ListPage)

`card/ListPage.svelte` 组件用于在卡片式布局中显示一个完整的、不进行分页的项目列表。它使用一个 `ListDataManager` 来持有数据和状态。

## 设计目的

该组件是 `ListPage` 表格视图的卡片版本。它适用于将客户端数据数组显示为卡片，并提供由 `ListDataManager` 控制的可选客户端筛选功能。

## 工作原理
该组件是一个**UI外壳**，负责渲染您所提供的 `ListDataManager` 的状态。
- **您控制数据：** 您负责创建管理器并为其提供一个完整的数据数组。
- **管理器持有状态：** `ListDataManager` 实例持有完整的数据集和经过筛选的数据集。组件的搜索栏与此管理器交互以执行筛选。
- **组件渲染状态：** `ListPage` 提供外围的UI，而您使用 `CardListBoard` 来渲染 `manager.filtered` 数据。

## 关键依赖
-   **`@ticatec/app-data-manager/ListDataManager`**: 该组件的“大脑”。它持有数据并执行筛选。
-   **`CardListBoard`**: 一个简单的循环组件，用于渲染您的卡片。

## 如何使用

1.  **设置您的 `ListDataManager`。**

    ```ts
    import { ListDataManager } from '@ticatec/app-data-manager';

    const allItems = [
        { id: 1, name: '产品 A', category: '电子产品' },
        { id: 2, name: '产品 B', category: '书籍' },
        { id: 3, name: '产品 C', category: '电子产品' }
    ];

    const manager = new ListDataManager({
        data: allItems,
        filterableFields: ['name', 'category']
    });
    ```

2.  **在您的页面中使用该组件**

    ```svelte
    <script lang="ts">
        // ... (上面的脚本)
        import ListPage from '@ticatec/uniface-app-component/card/ListPage.svelte';
        import CardListBoard from '@ticatec/uniface-app-component/card/CardListBoard.svelte';
        import YourCardComponent from './YourCardComponent.svelte';
    </script>

    <ListPage
        title="所有产品"
        dataManager={manager}
    >
        <CardListBoard
            items={manager.filtered}
            let:item
        >
            <YourCardComponent product={item} />
        </CardListBoard>
    </ListPage>
    ```

## 组件属性 (Props)

-   `title: string`: 显示在页面顶部的标题。
-   `dataManager: ListDataManager`: 您手动控制的数据管理器实例。**(必需)**
-   `showActionBar?: boolean`: 是否显示顶部的操作栏。默认为 `true`。
-   `showFilterBar?: boolean`: 是否显示筛选/搜索栏。默认为 `true`。