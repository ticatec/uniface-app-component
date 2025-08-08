# Data Table: Unmanaged PagingListPage

The `data-table/PagingListPage.svelte` component is the "unmanaged" version of the paginated data table. It provides the UI and basic structure by wrapping `@ticatec/uniface-element/DataTable`, but leaves the data fetching and state management entirely up to you via a `PagingDataManager`.

## Purpose

Use this component when you need full control over how and when data is fetched. The component provides the page structure and pagination controls, but you are responsible for creating, managing, and updating a `PagingDataManager` instance with your data.

## Key Dependencies

-   **`@ticatec/uniface-element/DataTable`**: Used for rendering the core table structure (`<thead>`, `<tbody>`).
-   **`@ticatec/app-data-manager/PagingDataManager`**: This class is the "brain" of the component. It holds the pagination state (`pageNo`, `pageSize`, `total`), the data for the current page, and loading/error states. You interact directly with this manager.

## How to Use

You manually create a `PagingDataManager` instance, orchestrate the API calls, and feed the results back into the manager. The `PagingListPage` component simply renders the state of the manager.

1.  **Create and manage a `PagingDataManager` in your page's script.**

    ```ts
    import { PagingDataManager } from '@ticatec/app-data-manager';
    import { onMount } from 'svelte';

    const columns = [
        { key: 'name', label: 'Tenant Name' },
        { key: 'email', label: 'Contact Email' }
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
    </script>

    <PagingListPage
        title="Unmanaged Tenants"
        dataManager={manager}
        {columns}
        let:row
    >
        <tr class="hover">
            <td>{row.name}</td>
            <td>{row.email}</td>
        </tr>
    </PagingListPage>
    ```

## Component Props

-   `title: string`: The title displayed at the top of the page.
-   `dataManager: PagingDataManager`: An instance of your manually controlled data manager. **(Required)**
-   `columns: any[]`: An array of column definitions passed to the underlying `DataTable`. **(Required)**
-   `showActionBar?: boolean`: Whether to show the top action bar. Defaults to `true`.
-   `showPagingBar?: boolean`: Whether to show the bottom pagination bar. Defaults to `true`.