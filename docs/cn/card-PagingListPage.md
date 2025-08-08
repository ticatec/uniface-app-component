# 卡片视图: 非托管分页列表 (Unmanaged PagingListPage)

`card/PagingListPage.svelte` 组件为卡片式布局提供了 UI 和分页控件，同时让您通过 `PagingDataManager` 完全控制数据获取和状态管理。

## 设计目的

该组件是托管卡片列表的非托管对应版本。当您需要将分页数据显示为卡片，但又需要自定义数据获取逻辑或与外部状态库集成时，它是理想的选择。

## 工作原理

该组件是一个**UI外壳**，负责渲染您所提供的 `PagingDataManager` 的状态。
- **您控制数据：** 您的脚本负责创建管理器、调用您的API，并使用 `manager.updatePagedData()` 将结果反馈给管理器。
- **管理器持有状态：** `PagingDataManager` 实例跟踪当前页码、总项目数、加载状态以及数据本身。
- **组件渲染状态：** `PagingListPage` 根据管理器的状态渲染分页控件，并在用户点击页码时触发管理器的 `page-changed` 事件。

## 关键依赖
-   **`@ticatec/app-data-manager/PagingDataManager`**: 该组件的“大脑”。您需要创建并管理此对象。
-   **`CardListBoard`**: 一个简单的组件，它接收一个项目列表并使用其默认插槽来渲染它们。您通常会将其放置在 `PagingListPage` 内部，并用来自您的管理器的数据来填充它。

## 如何使用

该模式与非托管数据表格完全相同：创建并管理一个 `PagingDataManager`，然后将其传递给组件。

1.  **设置您的 `PagingDataManager` 和数据获取逻辑。**

    ```ts
    import { PagingDataManager } from '@ticatec/app-data-manager';
    import { onMount } from 'svelte';

    const manager = new PagingDataManager({ pageSize: 12 });

    async function fetchData(pageNo: number, pageSize: number) {
        manager.loading = true;
        try {
            const response = await fetch(`/api/tenants?page=${pageNo}&size=${pageSize}`);
            const result = await response.json();
            manager.updatePagedData(result);
        } catch (e) {
            manager.error = e;
        } finally {
            manager.loading = false;
        }
    }

    manager.on('page-changed', (newPage) => {
        fetchData(newPage.pageNo, newPage.pageSize);
    });

    onMount(() => {
        fetchData(manager.pageNo, manager.pageSize);
    });
    ```

2.  **在您的页面中使用该组件**

    您需要在 `PagingListPage` 内部使用 `CardListBoard` 组件来渲染来自管理器的项目。

    ```svelte
    <script lang="ts">
        // ... (上面的脚本)
        import PagingListPage from '@ticatec/uniface-app-component/card/PagingListPage.svelte';
        import CardListBoard from '@ticatec/uniface-app-component/card/CardListBoard.svelte';
        import TenantCard from './TenantCard.svelte';
    </script>

    <PagingListPage
        title="非托管租户卡片列表"
        dataManager={manager}
    >
        <CardListBoard
            items={manager.pagedData.data}
            let:item
        >
            <TenantCard tenant={item} />
        </CardListBoard>
    </PagingListPage>
    ```

## 组件属性 (Props)

-   `title: string`: 显示在页面顶部的标题。
-   `dataManager: PagingDataManager`: 您手动控制的数据管理器实例。**(必需)**
-   `showActionBar?: boolean`: 是否显示顶部的操作栏。默认为 `true`。
-   `showPagingBar?: boolean`: 是否显示底部的分页栏。默认为 `true`。