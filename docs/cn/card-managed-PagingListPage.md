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

1.  **创建一个 `PagingDataService`**

    ```ts
    // src/services/TenantService.ts
    import { PagingDataService } from '@ticatec/app-data-service';

    export default class TenantService extends PagingDataService {
        constructor() {
            super('/api/tenants');
        }
    }

    export const service = new TenantService();
    ```

2.  **创建一个 `PagedDataManager`**

    ```ts
    // src/managers/TenantManager.ts
    import { PagedDataManager } from '@ticatec/app-data-manager';
    import { service } from '../services/TenantService';

    export default class TenantManager extends PagedDataManager {
        constructor() {
            super(service, 'id');
        }
    }
    ```

3.  **在你的页面中使用该组件**

    ```svelte
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/cards/managed/PagingListPage.svelte';
        import TenantManager from '../managers/TenantManager';
        import TenantCard from './TenantCard.svelte'; // 您的自定义卡片组件

        const dataManager = new TenantManager();

        let page$attrs = {
            title: "托管租户卡片列表"
        };

        // 配置渲染对象以使用您的卡片组件
        let render = {
            component: TenantCard,
            props: {} // 传递给卡片的额外属性
        };

        let criteria = {}; // 搜索条件
    </script>

    <PagingListPage
        {dataManager}
        {page$attrs}
        {render}
        {criteria}
    >
        <!-- 可选的搜索面板 -->
        <div slot="search-panel">
            <!-- 您的搜索表单控件 -->
        </div>
    </PagingListPage>
    ```

## 组件属性 (Props)

-   `dataManager: PagedDataManager`: 您的数据管理器实例。**(必需)**
-   `page$attrs: object`: 包含标题和其他页面级设置的页面属性。**(必需)**
-   `render: object`: 用于渲染卡片的配置对象，包含 `component` 和 `props`。**(必需)**
-   `criteria: object`: 传递给数据管理器的搜索条件对象。**(必需)**
-   `gap?: number`: 卡片之间的间距（像素）。默认为 `8`。
-   `canBeClosed?: boolean`: 页面是否可以关闭。默认为 `false`。
-   `actions?: ButtonActions`: 搜索面板的操作按钮数组。

## 插槽 (Slots)

-   `search-panel`: 用于自定义搜索表单控件的可选插槽。
-   `advanced-panel`: 用于高级搜索条件的可选插槽。

## 功能特性

-   使用 PagedDataManager 自动数据获取
-   内置分页控件
-   服务端数据加载和搜索
-   加载和错误状态管理
-   可配置间距的灵活卡片式布局
-   集成的 FilterPanel 搜索面板
-   带有操作栏的响应式设计
-   使用渲染配置自动卡片渲染
