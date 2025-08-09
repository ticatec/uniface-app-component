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
-   **`@ticatec/app-data-manager/PagingDataManager`**: 该组件的"大脑"。您需要创建并管理此对象。
-   **render 配置对象**: 用于自动渲染卡片的配置，包含 component 和 props 属性。

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

    ```svelte
    <script lang="ts">
        // ... (上面的脚本)
        import PagingListPage from '@ticatec/uniface-app-component/card/PagingListPage.svelte';
        import TenantCard from './TenantCard.svelte';

        let page$attrs = {
            title: "非托管租户卡片列表"
        };

        // 配置 render 对象
        let render = {
            component: TenantCard,
            props: {} // 传递给卡片组件的额外属性
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
        {render}
        {onCreateNewClick}
        {onRefreshClick}
        gap={12}
        canBeClosed={false}
    />
    ```

## 组件属性 (Props)

-   `page$attrs: PageAttrs`: 包含标题和其他页面级设置的页面属性。**(必需)**
-   `list: Array<any>`: 要显示为卡片的数据项数组。**(必需)**
-   `render: object`: 用于渲染卡片的配置对象，包含 `component` 和 `props` 属性。**(必需)**
-   `onCreateNewClick?: MouseClickHandler`: "创建新项" 按钮的处理器。
-   `onRefreshClick?: MouseClickHandler`: 刷新按钮的处理器。
-   `gap?: number`: 卡片之间的间距（像素）。默认为 `12`。
-   `canBeClosed?: boolean`: 页面是否可以关闭。默认为 `false`。
-   `placeholder?: string`: 搜索输入框的占位符文本。

## 功能特性

-   基于 PagingDataManager 的分页数据显示
-   内置分页控件和加载状态管理
-   灵活的卡片布局，可配置间距
-   可自定义的操作按钮（创建新项、刷新）
-   响应式设计，支持页面级操作
-   使用 render 配置自动渲染卡片