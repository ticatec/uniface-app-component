# Data Table: Managed ListPage

The `data-table/managed/ListPage.svelte` component is designed to fetch a complete dataset from a service and display it in a table. It wraps `@ticatec/uniface-element/DataTable` and automates the data fetching and state management for non-paginated data.

## Purpose

Use this component to display a full list of data from an asynchronous source. It automates calling a data service, handling loading/error states, and providing client-side filtering, while using the base `DataTable` for rendering.

## How It Works

This component automatically creates and manages its own `ListDataManager` instance internally. It calls the `getAll()` method on your provided `service`, populates the internal manager with the full dataset, and then uses the base `DataTable` for rendering. The search bar will perform client-side filtering on the data held in the manager.


## Key Dependencies

-   **`DataService`**: The component requires a service class that extends `@ticatec/app-data-service`'s `DataService`. This service must implement the `getAll()` method to fetch the entire list of data.

## How to Use

1.  **Create a `FullListDataService`**

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

2.  **Create a `FullListDataManager`**

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

3.  **Define Your Columns**

    ```ts
    // src/config/RoleColumns.ts
    import type { DataColumn } from "@ticatec/uniface-element";

    const columns: Array<DataColumn> = [
        {
            text: 'Role Name',
            field: 'name',
            width: 200,
            resizable: true
        },
        {
            text: 'Permissions',
            field: 'permissions',
            width: 300,
            resizable: true
        }
    ];

    export default columns;
    ```

4.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/data-table/managed/ListPage.svelte';
        import RoleManager from '../managers/RoleManager';
        import columns from '../config/RoleColumns';

        const dataManager = new RoleManager();

        let page$attrs = {
            title: "All Roles"
        };
    </script>

    <ListPage
        {dataManager}
        {columns}
        {page$attrs}
        rowHeight={48}
    />
    ```

## Component Props

-   `dataManager: FullListDataManager`: An instance of your data manager. **(Required)**
-   `columns: DataColumn[]`: An array of column definition objects from @ticatec/uniface-element. **(Required)**
-   `page$attrs: object`: Page attributes containing title and other page-level settings. **(Required)**
-   `rowHeight?: number`: Height of each row in pixels. Defaults to `40`.
-   `canBeClosed?: boolean`: Whether the page can be closed. Defaults to `false`.
-   `actions?: ButtonActions`: Array of action buttons for the top action bar.

## Features

-   Automatic data fetching using FullListDataManager
-   Built-in loading and error states
-   Client-side filtering and searching
-   Uses @ticatec/uniface-element/DataTable for rendering
-   Responsive layout with action bars
