# Data Table: Managed DynamicPagingListPage

The `data-table/managed/DynamicPagingListPage.svelte` component is the most advanced data table in the library. It wraps `@ticatec/uniface-element/DataTable` and integrates it with a dynamic filter panel, allowing users to build complex queries on the fly.

## Purpose

Use this component for advanced search scenarios. It integrates a filter panel with a paginated data table, and the underlying `PagedDataService` receives the filter criteria with each data request. The base `DataTable` is used for the final rendering.


## Key Features

-   **Dynamic Filtering**: Includes a slot for a filter panel component (like `@ticatec/uniface-filter-panel`).
-   **Automatic Integration**: Automatically passes the filter criteria from the panel to the `PagedDataService` on every fetch.
-   **Full Automation**: Like other managed components, it handles pagination, loading states, and errors.

## How to Use

This component requires a `PagedDataService` and a filter panel component that exposes its filter criteria.

1.  **Create a `PagedDataService`**

    The service will automatically receive the filter criteria as a `POST` request body. Your backend API must be designed to handle this.

    ```ts
    // src/services/DynamicTenantService.ts
    import { PagedDataService } from '@ticatec/app-data-service';

    export class DynamicTenantService extends PagedDataService<any> {
        constructor() {
            // The service sends a POST request to this URL with filter criteria in the body
            super('/api/tenants/search');
        }
    }
    ```

2.  **Use the Component in Your Page**

    You need to provide a filter panel component in the `criteria` slot. The `DynamicPagingListPage` will manage it.

    ```svelte
    <script lang="ts">
        import DynamicPagingListPage from '@ticatec/uniface-app-component/data-table/managed/DynamicPagingListPage.svelte';
        import { DynamicTenantService } from '../services/DynamicTenantService';
        import { tenantColumns } from '../config/TenantColumns';

        // Assume CriteriaFilterPanel is a component that lets users build queries
        // and exposes the criteria via a `getCriteria()` method.
        import CriteriaFilterPanel from './CriteriaFilterPanel.svelte';

        const tenantService = new DynamicTenantService();
    </script>

    <DynamicPagingListPage
        title="Dynamic Tenant Search"
        service={tenantService}
        columns={tenantColumns}
        let:row
    >
        <div slot="criteria">
            <CriteriaFilterPanel />
        </div>

        <!-- Row rendering slot -->
        <tr class="hover">
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.status}</td>
        </tr>
    </DynamicPagingListPage>
    ```

## Component Props

-   `title: string`: The title for the page.
-   `service: PagedDataService`: An instance of your data service. **(Required)**
-   `columns: any[]`: An array of column definitions. **(Required)**
-   `pageNo?: number`: Initial page number. Defaults to `1`.
-   `pageSize?: number`: Items per page. Defaults to `10`.
-   `showActionBar?: boolean`: Show the top action bar. Defaults to `true`.
-   `showPagingBar?: boolean`: Show the bottom pagination bar. Defaults to `true`.

## Slots

-   `criteria`: Place your filter panel component here. It must be a component that can be managed by the page.
-   `default` (`let:row`, `let:index`): The slot for rendering each row of the table.
