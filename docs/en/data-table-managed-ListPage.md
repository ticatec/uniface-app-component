# Data Table: Managed ListPage

The `data-table/managed/ListPage.svelte` component is designed to fetch a complete dataset from a service and display it in a table. It wraps `@ticatec/uniface-element/DataTable` and automates the data fetching and state management for non-paginated data.

## Purpose

Use this component to display a full list of data from an asynchronous source. It automates calling a data service, handling loading/error states, and providing client-side filtering, while using the base `DataTable` for rendering.

## How It Works

This component automatically creates and manages its own `ListDataManager` instance internally. It calls the `getAll()` method on your provided `service`, populates the internal manager with the full dataset, and then uses the base `DataTable` for rendering. The search bar will perform client-side filtering on the data held in the manager.


## Key Dependencies

-   **`DataService`**: The component requires a service class that extends `@ticatec/app-data-service`'s `DataService`. This service must implement the `getAll()` method to fetch the entire list of data.

## How to Use

1.  **Create a `DataService`**

    ```ts
    // src/services/RoleService.ts
    import { DataService } from '@ticatec/app-data-service';

    export class RoleService extends DataService<any> {
        constructor() {
            // The base URL for your API endpoint
            // The service will call GET /api/roles to fetch all items
            super('/api/roles');
        }
    }
    ```

2.  **Define Your Columns**

    ```ts
    // src/config/RoleColumns.ts
    export const roleColumns = [
        { key: 'name', label: 'Role Name' },
        { key: 'permissions', label: 'Permissions' }
    ];
    ```

3.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/data-table/managed/ListPage.svelte';
        import { RoleService } from '../services/RoleService';
        import { roleColumns } from '../config/RoleColumns';

        const roleService = new RoleService();
    </script>

    <ListPage
        title="All Roles"
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

## Component Props

-   `title: string`: The title displayed at the top of the page.
-   `service: DataService`: An instance of your data service. **(Required)**
-   `columns: any[]`: An array of column definition objects. **(Required)**
-   `showActionBar?: boolean`: Whether to show the top action bar. Defaults to `true`.
-   `showFilterBar?: boolean`: Whether to show the filter/search bar. Defaults to `true`.

## Slot Properties

-   `let:row`: The data object for the current row.
-   `let:index`: The zero-based index of the current row.
