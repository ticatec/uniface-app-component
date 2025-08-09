# Data Table: Managed DynamicPagingListPage

The `data-table/managed/DynamicPagingListPage.svelte` component is the most advanced data table in the library. It wraps `@ticatec/uniface-element/DataTable` and integrates it with a dynamic filter panel, allowing users to build complex queries on the fly.

## Purpose

Use this component for advanced search scenarios. It integrates a filter panel with a paginated data table, and the underlying `PagedDataService` receives the filter criteria with each data request. The base `DataTable` is used for the final rendering.


## Key Features

-   **Dynamic Filtering**: Includes a slot for a filter panel component (like `@ticatec/uniface-filter-panel`).
-   **Automatic Integration**: Automatically passes the filter criteria from the panel to the `PagedDataService` on every fetch.
-   **Full Automation**: Like other managed components, it handles pagination, loading states, and errors.

## How to Use

This component requires a `PagingDataService` and a `PagedDataManager`, along with a filter panel component that exposes its filter criteria.

1.  **Create a `PagingDataService`**

    ```ts
    // src/services/DynamicTenantService.ts
    import { PagingDataService } from '@ticatec/app-data-service';

    export default class DynamicTenantService extends PagingDataService {
        constructor() {
            super('/api/tenants/search');
        }
    }

    export const service = new DynamicTenantService();
    ```

2.  **Create a `PagedDataManager`**

    ```ts
    // src/managers/DynamicTenantManager.ts
    import { PagedDataManager } from '@ticatec/app-data-manager';
    import { service } from '../services/DynamicTenantService';

    export default class DynamicTenantManager extends PagedDataManager {
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
        import DynamicPagingListPage from '@ticatec/uniface-app-component/data-table/managed/DynamicPagingListPage.svelte';
        import DynamicTenantManager from '../managers/DynamicTenantManager';
        import columns from '../config/TenantColumns';
        import CriteriaFilterPanel from './CriteriaFilterPanel.svelte';

        const dataManager = new DynamicTenantManager();

        let page$attrs = {
            title: "Dynamic Tenant Search"
        };
    </script>

    <DynamicPagingListPage
        {dataManager}
        {columns}
        {page$attrs}
        rowHeight={48}
    >
        <CriteriaFilterPanel slot="search-panel" />
    </DynamicPagingListPage>
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

## Slots

-   `search-panel`: Place your filter panel component here. It can be used to provide dynamic search criteria.
-   `sidebar`: Optional sidebar content.

## Features

-   Automatic data fetching using PagedDataManager
-   Built-in pagination controls
-   Dynamic search and filtering capabilities
-   Server-side data loading with custom criteria
-   Loading and error state management
-   Uses @ticatec/uniface-element/DataTable for rendering
-   Support for row selection and actions
-   Responsive layout with action bars and sidebar support
