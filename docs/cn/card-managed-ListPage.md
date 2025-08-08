# 卡片视图: 托管列表 (Managed ListPage)

`card/managed/ListPage.svelte` 组件从服务获取一个完整的数据集，并将其显示在卡片式布局中，同时自动管理加载和错误状态。

## 设计目的

这是托管列表 `ListPage` 的卡片版本。当您想将一个完整的项目列表显示为卡片，并且数据需要从服务异步获取时，应使用此组件。它非常适合画廊、仪表盘或任何不适合用表格展示的非分页列表。

## 如何使用

您需要提供一个 `DataService`，并使用 `let:listDataManager` 插槽属性来访问数据，然后将其传递给 `CardListBoard`。

1.  **创建一个 `DataService`**

    ```ts
    // src/services/ApplicationService.ts
    import { DataService } from '@ticatec/app-data-service';

    export class ApplicationService extends DataService<any> {
        constructor() {
            super('/api/applications');
        }
    }
    ```

2.  **在您的页面中使用该组件**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/card/managed/ListPage.svelte';
        import CardListBoard from '@ticatec/uniface-app-component/card/CardListBoard.svelte';
        import { ApplicationService } from '../services/ApplicationService';
        import ApplicationCard from './ApplicationCard.svelte'; // 您的自定义卡片组件

        const appService = new ApplicationService();
    </script>

    <ListPage
        title="所有应用"
        service={appService}
        let:listDataManager
    >
        <CardListBoard
            items={listDataManager.filtered}
            let:item
        >
            <ApplicationCard application={item} />
        </CardListBoard>
    </ListPage>
    ```

## 组件属性 (Props)

-   `title: string`: 显示在页面顶部的标题。
-   `service: DataService`: 您的数据服务实例，需实现 `getAll()` 方法。**(必需)**
-   `showActionBar?: boolean`: 是否显示顶部的操作栏。默认为 `true`。
-   `showFilterBar?: boolean`: 是否显示筛选/搜索栏。默认为 `true`。

## 插槽属性 (Slot Properties)

-   `let:listDataManager`: 管理组件状态和数据的 `ListDataManager` 实例。通过 `listDataManager.filtered` 可以访问数据。
