# 卡片视图: 托管列表 (Managed ListPage)

`card/managed/ListPage.svelte` 组件从服务获取一个完整的数据集，并将其显示在卡片式布局中，同时自动管理加载和错误状态。

## 设计目的

这是托管列表 `ListPage` 的卡片版本。当您想将一个完整的项目列表显示为卡片，并且数据需要从服务异步获取时，应使用此组件。它非常适合画廊、仪表盘或任何不适合用表格展示的非分页列表。

## 如何使用

1.  **创建一个 `FullListDataService`**

    ```ts
    // src/services/ApplicationService.ts
    import { FullListDataService } from '@ticatec/app-data-service';

    export default class ApplicationService extends FullListDataService {
        constructor() {
            super('/api/applications');
        }
    }

    export const service = new ApplicationService();
    ```

2.  **创建一个 `FullListDataManager`**

    ```ts
    // src/managers/ApplicationManager.ts
    import { FullListDataManager } from '@ticatec/app-data-manager';
    import { service } from '../services/ApplicationService';

    export default class ApplicationManager extends FullListDataManager {
        constructor() {
            super(service, 'id');
        }
    }
    ```

3.  **在您的页面中使用该组件**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/cards/managed/ListPage.svelte';
        import ApplicationManager from '../managers/ApplicationManager';
        import ApplicationCard from './ApplicationCard.svelte'; // 您的自定义卡片组件

        const dataManager = new ApplicationManager();

        let page$attrs = {
            title: "所有应用"
        };

        // 配置渲染对象以使用您的卡片组件
        let render = {
            component: ApplicationCard,
            props: {} // 传递给卡片的额外属性
        };
    </script>

    <ListPage 
        {dataManager}
        {page$attrs}
        {render}
    />
    ```

## 组件属性 (Props)

-   `dataManager: FullListDataManager`: 您的数据管理器实例。**(必需)**
-   `page$attrs: object`: 包含标题和其他页面级设置的页面属性。**(必需)**
-   `render: object`: 用于渲染卡片的配置对象，包含 `component` 和 `props`。**(必需)**
-   `gap?: number`: 卡片之间的间距（像素）。默认为 `8`。
-   `canBeClosed?: boolean`: 页面是否可以关闭。默认为 `false`。
-   `filterFun?: FunFilter`: 用于卡片客户端筛选的函数。
-   `placeholder?: string`: 搜索输入框的占位文本。

## 功能特性

-   使用 FullListDataManager 自动数据获取
-   内置加载和错误状态
-   使用 CardListBoard 实现客户端筛选和搜索
-   可配置间距的灵活卡片式布局
-   带有操作栏的响应式设计
-   使用渲染配置自动卡片渲染
