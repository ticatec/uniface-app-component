# Data Table: Unmanaged ListPage

The `data-table/ListPage.svelte` component is designed for displaying a complete, non-paginated list of data in a table format. It wraps the base `@ticatec/uniface-element/DataTable` and uses a `ListDataManager` to hold the data and state.

## Purpose

Use this component when you have a dataset on the client-side that does not require pagination. It provides a layout with a title and filter bar, while you control the data via the `ListDataManager`.

## Key Dependencies

-   **`@ticatec/uniface-element/DataTable`**: Renders the core table.
-   **`@ticatec/app-data-manager/ListDataManager`**: This class holds the complete array of data and provides client-side filtering capabilities. The component's search bar interacts directly with this manager.

## How to Use

You create a `ListDataManager` instance, populate it with your array of data, and pass it to the component. The component renders the `manager.filtered` data.

1.  **Set up your `ListDataManager` with your data.**

    ```ts
    import { ListDataManager } from '@ticatec/app-data-manager';

    const columns = [
        { key: 'name', label: 'User Name' },
        { key: 'role', label: 'Role' }
    ];

    const allUsers = [
        { name: 'Alice', role: 'Admin' },
        { name: 'Bob', role: 'Developer' },
        { name: 'Charlie', role: 'User' }
    ];

    // 1. Create the manager instance and provide the full dataset.
    const manager = new ListDataManager({
        data: allUsers,
        // 2. Optional: Define which fields can be filtered by the search bar.
        filterableFields: ['name', 'role']
    });
    ```

2.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        // ... (script from above)
        import ListPage from '@ticatec/uniface-app-component/data-table/ListPage.svelte';
    </script>

    <ListPage
        title="All Users"
        dataManager={manager}
        {columns}
        let:row
    >
        <tr class="hover">
            <td>{row.name}</td>
            <td>{row.role}</td>
        </tr>
    </ListPage>
    ```

## Component Props

-   `title: string`: The title displayed at the top of the page.
-   `dataManager: ListDataManager`: An instance of your manually controlled data manager. **(Required)**
-   `columns: any[]`: An array of column definition objects. **(Required)**
-   `showActionBar?: boolean`: Whether to show the top action bar. Defaults to `true`.
-   `showFilterBar?: boolean`: Whether to show the filter/search bar. Defaults to `true`.