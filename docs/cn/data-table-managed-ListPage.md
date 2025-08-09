# 数据表格: 托管列表 (Managed ListPage)

`data-table/managed/ListPage.svelte` 组件用于从服务获取一个完整的数据集并将其显示在表格中。它包装了 `@ticatec/uniface-element/DataTable` 并为非分页数据自动执行数据获取和状态管理。

## 设计目的

使用此组件来显示来自异步源的完整数据列表。它会自动调用数据服务、处理加载/错误状态，并提供客户端筛选，同时使用底层的 `DataTable` 进行渲染。

## 工作原理

该组件会在内部自动创建并管理自己的 `ListDataManager` 实例。它会调用您提供的 `service` 上的 `getAll()` 方法，用完整的数据集填充内部的管理器，然后使用底层的 `DataTable` 进行渲染。搜索栏将对管理器中持有的数据执行客户端筛选。


## 关键依赖

-   **`DataService`**: 组件需要一个继承自 `@ticatec/app-data-service` 中 `DataService` 的服务类。该服务必须实现 `getAll()` 方法来获取完整的数据列表。

## 如何使用

1.  **创建一个 `FullListDataService`**

    ```ts
    // src/services/RoleService.ts
    import { FullListDataService } from '@ticatec/app-data-service';

    export default class RoleService extends FullListDataService {
        constructor() {
            super('/api/roles');
        }
    }

    export const service = new RoleService();
    ```

2.  **创建一个 `FullListDataManager`**

    ```ts
    // src/managers/RoleManager.ts
    import { FullListDataManager } from '@ticatec/app-data-manager';
    import { service } from '../services/RoleService';

    export default class RoleManager extends FullListDataManager {
        constructor() {
            super(service, 'id');
        }
    }
    ```

3.  **定义您的列配置**

    ```ts
    // src/config/RoleColumns.ts
    import type { DataColumn } from "@ticatec/uniface-element";

    const columns: Array<DataColumn> = [
        {
            text: '角色名称',
            field: 'name',
            width: 200,
            resizable: true
        },
        {
            text: '权限',
            field: 'permissions',
            width: 300,
            resizable: true
        }
    ];

    export default columns;
    ```

4.  **在您的页面中使用该组件**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/data-table/managed/ListPage.svelte';
        import RoleManager from '../managers/RoleManager';
        import columns from '../config/RoleColumns';

        const dataManager = new RoleManager();

        let page$attrs = {
            title: "所有角色"
        };
    </script>

    <ListPage
        {dataManager}
        {columns}
        {page$attrs}
        rowHeight={48}
    />
    ```

## 组件属性 (Props)

-   `dataManager: FullListDataManager`: 您的数据管理器实例。**(必需)**
-   `columns: DataColumn[]`: 来自 @ticatec/uniface-element 的列定义对象数组。**(必需)**
-   `page$attrs: object`: 包含标题和其他页面级设置的页面属性。**(必需)**
-   `rowHeight?: number`: 每行的像素高度。默认为 `40`。
-   `canBeClosed?: boolean`: 页面是否可以关闭。默认为 `false`。
-   `actions?: ButtonActions`: 顶部操作栏的操作按钮数组。

## 功能特性

-   使用 FullListDataManager 自动数据获取
-   内置加载和错误状态
-   客户端筛选和搜索
-   使用 @ticatec/uniface-element/DataTable 进行渲染
-   带有操作栏的响应式布局
