# Data Table: Unmanaged ListPage

The `data-table/ListPage.svelte` component is designed for displaying a complete, non-paginated list of data in a table format. It wraps the base `@ticatec/uniface-element/DataTable` and uses a `ListDataManager` to hold the data and state.

## Purpose

Use this component when you have a dataset on the client-side that does not require pagination. It provides a layout with a title and filter bar, while you control the data via the `ListDataManager`.

## Key Dependencies

-   **`@ticatec/uniface-element/DataTable`**: Renders the core table.
-   **`@ticatec/app-data-manager/ListDataManager`**: This class holds the complete array of data and provides client-side filtering capabilities. The component's search bar interacts directly with this manager.

## How to Use

This component directly takes an array of data and renders it in a table format using @ticatec/uniface-element/DataTable.

1.  **Prepare your data and columns**

    ```ts
    import type { DataColumn } from "@ticatec/uniface-element";

    const columns: Array<DataColumn> = [
        {
            text: 'User Name',
            field: 'name',
            width: 200,
            resizable: true
        },
        {
            text: 'Role',
            field: 'role',
            width: 150,
            resizable: true
        }
    ];

    const allUsers = [
        { name: 'Alice', role: 'Admin' },
        { name: 'Bob', role: 'Developer' },
        { name: 'Charlie', role: 'User' }
    ];

    // Optional: Create a filter function for client-side filtering
    const filterFun = (item: any, filterText: string) => {
        return item.name.toLowerCase().includes(filterText.toLowerCase()) ||
               item.role.toLowerCase().includes(filterText.toLowerCase());
    };
    ```

2.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/data-table/ListPage.svelte';
        
        let list = allUsers; // Your data array

        let page$attrs = {
            title: "All Users"
        };

        // Optional refresh handler
        const onRefreshClick = () => {
            // Reload your data here
        };
    </script>

    <ListPage
        {page$attrs}
        {list}
        {columns}
        {filterFun}
        {onRefreshClick}
        rowHeight={48}
    />
    ```

## Component Props

-   `page$attrs: PageAttrs`: Page attributes containing title and other page-level settings. **(Required)**
-   `list: Array<any>`: The array of data items to display in the table. **(Required)**
-   `columns: Array<DataColumn>`: Array of column definition objects from @ticatec/uniface-element. **(Required)**
-   `filterFun?: FunFilter`: Optional function for client-side filtering of rows.
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

-   Client-side data display using @ticatec/uniface-element/DataTable
-   Built-in filtering and search capabilities
-   Support for row selection and actions
-   Customizable action buttons (create new, refresh)
-   Responsive design with filterable page bar
-   Optional sidebar support