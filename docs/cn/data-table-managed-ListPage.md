# 数据表格: 托管列表 (Managed ListPage)

`data-table/managed/ListPage.svelte` 组件用于从服务获取一个完整的数据集并将其显示在表格中。它包装了 `@ticatec/uniface-element/DataTable` 并为非分页数据自动执行数据获取和状态管理。

## 设计目的

使用此组件来显示来自异步源的完整数据列表。它会自动调用数据服务、处理加载/错误状态，并提供客户端筛选，同时使用底层的 `DataTable` 进行渲染。

## 工作原理

该组件会在内部自动创建并管理自己的 `ListDataManager` 实例。它会调用您提供的 `service` 上的 `getAll()` 方法，用完整的数据集填充内部的管理器，然后使用底层的 `DataTable` 进行渲染。搜索栏将对管理器中持有的数据执行客户端筛选。


## 关键依赖

-   **`DataService`**: 组件需要一个继承自 `@ticatec/app-data-service` 中 `DataService` 的服务类。该服务必须实现 `getAll()` 方法来获取完整的数据列表。

## 如何使用

1.  **创建一个 `DataService`**

    ```ts
    // src/services/RoleService.ts
    import { DataService } from '@ticatec/app-data-service';

    export class RoleService extends DataService<any> {
        constructor() {
            // 您的 API 端点的基础 URL
            // 服务将调用 GET /api/roles 来获取所有项目
            super('/api/roles');
        }
    }
    ```

2.  **定义您的列**

    ```ts
    // src/config/RoleColumns.ts
    export const roleColumns = [
        { key: 'name', label: '角色名称' },
        { key: 'permissions', label: '权限' }
    ];
    ```

3.  **在您的页面中使用该组件**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/data-table/managed/ListPage.svelte';
        import { RoleService } from '../services/RoleService';
        import { roleColumns } from '../config/RoleColumns';

        const roleService = new RoleService();
    </script>

    <ListPage
        title="所有角色"
        service={roleService}
        columns={roleColumns}
        let:row
    >
        <tr class="hover">
            <td>{row.name}</td>
            <td>{row.permissions.join(', ')}</td>
        </tr>
    </ListPage>
    ```

## 组件属性 (Props)

-   `title: string`: 显示在页面顶部的标题。
-   `service: DataService`: 您的数据服务实例。**(必需)**
-   `columns: any[]`: 列定义对象的数组。**(必需)**
-   `showActionBar?: boolean`: 是否显示顶部的操作栏。默认为 `true`。
-   `showFilterBar?: boolean`: 是否显示筛选/搜索栏。默认为 `true`。

## 插槽属性 (Slot Properties)

-   `let:row`: 当前行的数据对象。
-   `let:index`: 当前行的零基索引。
