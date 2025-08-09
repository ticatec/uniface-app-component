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

1.  **Create a `PagingDataService`**

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

2.  **Create a `PagedDataManager`**

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

3.  **Define Your Columns**

    ```ts
    // src/config/TenantColumns.ts
    import type { DataColumn } from "@ticatec/uniface-element";

    const columns: Array<DataColumn> = [
        {
            text: 'Tenant Name',
            field: 'name',
            width: 200,
            resizable: true
        },
        {
            text: 'Contact Email',
            field: 'email',
            width: 250,
            resizable: true
        },
        {
            text: 'Status',
            field: 'status',
            width: 120,
            align: 'center'
        }
    ];

    export default columns;
    ```

4.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/data-table/managed/PagingListPage.svelte';
        import TenantManager from '../managers/TenantManager';
        import columns from '../config/TenantColumns';

        const dataManager = new TenantManager();

        let page$attrs = {
            title: "Managed Tenants"
        };
    </script>

    <PagingListPage
        {dataManager}
        {columns}
        {page$attrs}
        rowHeight={48}
    />
    ```

## Component Props

-   `dataManager: PagedDataManager`: An instance of your data manager. **(Required)**
-   `columns: DataColumn[]`: An array of column definition objects from @ticatec/uniface-element. **(Required)**
-   `page$attrs: object`: Page attributes containing title and other page-level settings. **(Required)**
-   `rowHeight?: number`: Height of each row in pixels. Defaults to `40`.
-   `canBeClosed?: boolean`: Whether the page can be closed. Defaults to `false`.
-   `actions?: ButtonActions`: Array of action buttons for the top action bar.
-   `indicatorColumn?: IndicatorColumn`: Configuration for selection indicators.
-   `actionsColumn?: ActionsColumn`: Configuration for row action buttons.

## Features

-   Automatic data fetching using PagedDataManager
-   Built-in pagination controls
-   Server-side data loading and searching
-   Loading and error state management
-   Uses @ticatec/uniface-element/DataTable for rendering
-   Support for row selection and actions
-   Responsive layout with action bars