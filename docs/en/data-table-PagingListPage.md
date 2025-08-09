# Data Table: Unmanaged PagingListPage

The `data-table/PagingListPage.svelte` component is the "unmanaged" version of the paginated data table. It provides the UI and basic structure by wrapping `@ticatec/uniface-element/DataTable`, but leaves the data fetching and state management entirely up to you via a `PagingDataManager`.

## Purpose

Use this component when you need full control over how and when data is fetched. The component provides the page structure and pagination controls, but you are responsible for creating, managing, and updating a `PagingDataManager` instance with your data.

## Key Dependencies

-   **`@ticatec/uniface-element/DataTable`**: Used for rendering the core table structure (`<thead>`, `<tbody>`).
-   **`@ticatec/app-data-manager/PagingDataManager`**: This class is the "brain" of the component. It holds the pagination state (`pageNo`, `pageSize`, `total`), the data for the current page, and loading/error states. You interact directly with this manager.

## How to Use

You manually create a `PagingDataManager` instance, orchestrate the API calls, and feed the results back into the manager. The `PagingListPage` component simply renders the state of the manager.

1.  **Prepare your data and columns**

    ```ts
    import type { DataColumn } from "@ticatec/uniface-element";
    import { PagingDataManager } from '@ticatec/app-data-manager';
    import { onMount } from 'svelte';

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
        }
    ];

    // 1. Create the manager instance.
    const manager = new PagingDataManager({ pageSize: 10 });

    // 2. Create a function to fetch data from your API.
    async function fetchData(pageNo: number, pageSize: number) {
        manager.loading = true;
        try {
            const response = await fetch(`/api/tenants?page=${pageNo}&size=${pageSize}`);
            const result = await response.json(); // e.g., { data: [], total: 100 }

            // 3. Update the manager with the new data and total count.
            // This will cause the component to re-render.
            manager.updatePagedData({
                data: result.data,
                total: result.total
            });

        } catch (e) {
            manager.error = e;
        } finally {
            manager.loading = false;
        }
    }

    // 4. Listen for the 'page-changed' event from the manager.
    // The component's pagination bar triggers this event.
    manager.on('page-changed', (newPage) => {
        fetchData(newPage.pageNo, newPage.pageSize);
    });

    // 5. Fetch initial data when the component mounts.
    onMount(() => {
        fetchData(manager.pageNo, manager.pageSize);
    });
    ```

2.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        // ... (script from above)
        import PagingListPage from '@ticatec/uniface-app-component/data-table/PagingListPage.svelte';

        let page$attrs = {
            title: "Unmanaged Tenants"
        };

        // Optional action button handlers
        const onCreateNewClick = () => {
            // Logic for creating new items
        };

        const onRefreshClick = () => {
            fetchData(manager.pageNo, manager.pageSize);
        };
    </script>

    <PagingListPage
        {page$attrs}
        list={manager.pagedData.data}
        {columns}
        {onCreateNewClick}
        {onRefreshClick}
        rowHeight={48}
        canBeClosed={false}
    />
    ```

## Component Props

-   `page$attrs: PageAttrs`: Page attributes containing title and other page-level settings. **(Required)**
-   `list: Array<any>`: The array of data items to display in the table. **(Required)**
-   `columns: Array<DataColumn>`: Array of column definition objects from @ticatec/uniface-element. **(Required)**
-   `onCreateNewClick?: MouseClickHandler`: Handler for the "Create New" button.
-   `onRefreshClick?: MouseClickHandler`: Handler for the refresh button.
-   `indicatorColumn?: IndicatorColumn`: Configuration for selection indicators.
-   `actionsColumn?: ActionsColumn`: Configuration for row action buttons.
-   `selectedRows?: Array<any>`: Array to bind selected rows to.
-   `rowHeight?: number`: Height of each row in pixels.
-   `canBeClosed?: boolean`: Whether the page can be closed. Defaults to `false`.
-   `roundTable?: boolean`: Whether to use rounded table corners. Defaults to `false`.
-   `placeholder?: string`: Placeholder text for the search input.
-   `emptyIndicator?: string`: Custom text for empty state.

## Slots

-   `sidebar`: Optional sidebar content.

## Features

-   Data display using @ticatec/uniface-element/DataTable
-   Pagination controls and loading state management based on PagingDataManager
-   Built-in filtering and search capabilities
-   Support for row selection and actions
-   Customizable action buttons (create new, refresh)
-   Responsive design with filterable page bar
-   Optional sidebar support