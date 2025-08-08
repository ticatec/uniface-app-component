# 卡片视图: 托管分页列表 (Managed PagingListPage)

`card/managed/PagingListPage.svelte` 组件是托管数据表格的卡片视图对应版本。它为卡片式布局自动完成了数据获取、分页和展示的全过程。

## 设计目的

当您需要将一个大型的分页数据集以一系列卡片而非表格的形式展示时，应使用此组件。它处理了所有的后台逻辑，包括：

-   从 `PagedDataService` 获取数据。
-   管理加载、错误和空数据状态。
-   处理分页控件。
-   为渲染每张卡片提供一个简洁的接口。

## 如何使用

该组件的用法与其数据表格版本几乎完全相同，依赖于一个服务来提供数据，并使用一个插槽来进行渲染。

1.  **创建一个 `PagedDataService`** (您可以复用与数据表格相同的服务)。

    ```ts
    // src/services/TenantService.ts
    import { PagedDataService } from '@ticatec/app-data-service';

    export class TenantService extends PagedDataService<any> {
        constructor() {
            super('/api/tenants');
        }
    }
    ```

2.  **在你的页面中使用该组件**

    您不需要提供 `columns` 属性，而是将数据传递给 `CardListBoard` 组件，并在插槽内完全自由地设计您的卡片。

    ```svelte
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/card/managed/PagingListPage.svelte';
        import CardListBoard from '@ticatec/uniface-app-component/card/CardListBoard.svelte';
        import { TenantService } from '../services/TenantService';

        // 一个用于显示租户信息的简单卡片组件
        import TenantCard from './TenantCard.svelte';

        const tenantService = new TenantService();
    </script>

    <PagingListPage
        title="托管租户卡片列表"
        service={tenantService}
        let:pagedDataManager
    >
        <!--
            插槽让您能访问到 PagedDataManager 的实例。
            您需要将其 `pagedData` 属性传递给 CardListBoard。
        -->
        <CardListBoard
            items={pagedDataManager.pagedData.data}
            let:item
        >
            <!-- 为每个 item 渲染您的自定义卡片组件 -->
            <TenantCard tenant={item} />
        </CardListBoard>
    </PagingListPage>
    ```

## 组件属性 (Props)

-   `title: string`: 显示在页面顶部的标题。
-   `service: PagedDataService`: 您的数据服务实例。**(必需)**
-   `pageNo?: number`: 初始加载的页码（从1开始）。默认为 `1`。
-   `pageSize?: number`: 每页的项目数。默认为 `10`。
-   `showActionBar?: boolean`: 是否显示顶部的操作栏。默认为 `true`。
-   `showPagingBar?: boolean`: 是否显示底部的分页栏。默认为 `true`。

## 插槽属性 (Slot Properties)

-   `let:pagedDataManager`: 管理组件状态和数据的 `PagingDataManager` 实例。您可以通过 `pagedDataManager.pagedData.data` 访问已加载的数据。
