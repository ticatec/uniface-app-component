# Data Table: Managed PagingListPage

The `data-table/managed/PagingListPage.svelte` component is a powerful, high-level tool for displaying paginated data from a server-side source. It wraps the base `@ticatec/uniface-element/DataTable` to fully automate data fetching, pagination, and state management.

## Purpose

This component is for the common use case of displaying large datasets queried page by page from an API. It abstracts away the boilerplate code for:
- Calling the data service.
- Handling loading and error states.
- Managing pagination controls.
- Refreshing the data.
- Displaying empty states.

## How It Works

This component acts as a "smart" wrapper. It automatically creates and manages its own `PagingDataManager` instance internally. It uses the provided `service` to fetch data and populates the internal manager, which then drives the underlying `@ticatec/uniface-element/DataTable` component.

Your `let:row` slot is passed directly to the base `DataTable`, giving you full control over row rendering.


## How to Use

1.  **Create a `PagedDataService`**

    ```ts
    // src/services/TenantService.ts
    import { PagedDataService } from '@ticatec/app-data-service';

    export class TenantService extends PagedDataService<any> {
        constructor() {
            super('/api/tenants');
        }
    }
    ```

2.  **Define Your Columns**

    ```ts
    // src/config/TenantColumns.ts
    export const tenantColumns = [
        { key: 'name', label: 'Tenant Name' },
        { key: 'email', label: 'Contact Email' },
        { key: 'status', label: 'Status' }
    ];
    ```

3.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/data-table/managed/PagingListPage.svelte';
        import { TenantService } from '../services/TenantService';
        import { tenantColumns } from '../config/TenantColumns';

        const tenantService = new TenantService();
    </script>

    <PagingListPage
        title="Managed Tenants"
        service={tenantService}
        columns={tenantColumns}
        let:row
        let:index
    >
        <!--
            This slot is passed directly to the underlying DataTable.
            You are responsible for rendering the `<tr>` and `<td>` elements
            for each `row` of data.
        -->
        <tr class="hover">
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.status}</td>
        </tr>
    </PagingListPage>
    ```

## Component Props

-   `title: string`: The title displayed at the top of the page.
-   `service: PagedDataService`: An instance of your data service. **(Required)**
-   `columns: any[]`: An array of column definitions passed to the underlying `DataTable` to render the `<thead>`. **(Required)**
-   `pageNo?: number`: The initial page number to load (1-based). Defaults to `1`.
-   `pageSize?: number`: The number of items per page. Defaults to `10`.
-   `showActionBar?: boolean`: Whether to show the top action bar. Defaults to `true`.
-   `showPagingBar?: boolean`: Whether to show the bottom pagination bar. Defaults to `true`.

## Slot Properties

-   `let:row`: The data object for the current row.
-   `let:index`: The zero-based index of the current row within the page.