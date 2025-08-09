# Card View: Unmanaged PagingListPage

The `card/PagingListPage.svelte` component provides the UI and pagination controls for a card-based layout, while giving you full control over data fetching and state management via a `PagingDataManager`.

## Purpose

This component is the unmanaged counterpart to the managed card list. It's ideal when you need to display paginated data as cards but require custom logic for fetching data or integrating with an external state store.

## How It Works

This component is a **UI shell** that renders the state of a `PagingDataManager` you provide.
- **You control the data:** Your script is responsible for creating the manager, calling your API, and feeding the results into the manager using `manager.updatePagedData()`.
- **The manager holds the state:** The `PagingDataManager` instance tracks the current page number, total items, loading status, and the data itself.
- **The component renders the state:** `PagingListPage` renders the pagination controls based on the manager's state and triggers the manager's `page-changed` event when the user clicks a page number.

## Key Dependencies
-   **`@ticatec/app-data-manager/PagingDataManager`**: The "brain" of the component. You create and manage this object.
-   **render configuration object**: Used for automatic card rendering, containing component and props properties.

## How to Use

The pattern is identical to the unmanaged data table: create and manage a `PagingDataManager`, and then pass it to the component.

1.  **Set up your `PagingDataManager` and data fetching logic.**

    ```ts
    import { PagingDataManager } from '@ticatec/app-data-manager';
    import { onMount } from 'svelte';

    const manager = new PagingDataManager({ pageSize: 12 });

    async function fetchData(pageNo: number, pageSize: number) {
        manager.loading = true;
        try {
            const response = await fetch(`/api/tenants?page=${pageNo}&size=${pageSize}`);
            const result = await response.json();
            manager.updatePagedData(result);
        } catch (e) {
            manager.error = e;
        } finally {
            manager.loading = false;
        }
    }

    manager.on('page-changed', (newPage) => {
        fetchData(newPage.pageNo, newPage.pageSize);
    });

    onMount(() => {
        fetchData(manager.pageNo, manager.pageSize);
    });
    ```

2.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        // ... (script from above)
        import PagingListPage from '@ticatec/uniface-app-component/card/PagingListPage.svelte';
        import TenantCard from './TenantCard.svelte';

        let page$attrs = {
            title: "Unmanaged Tenant Cards"
        };

        // Configure the render object
        let render = {
            component: TenantCard,
            props: {} // Any additional props to pass to the card
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
        {render}
        {onCreateNewClick}
        {onRefreshClick}
        gap={12}
        canBeClosed={false}
    />
    ```

## Component Props

-   `page$attrs: PageAttrs`: Page attributes containing title and other page-level settings. **(Required)**
-   `list: Array<any>`: The array of data items to display as cards. **(Required)**
-   `render: object`: Configuration object with `component` and `props` for rendering cards. **(Required)**
-   `onCreateNewClick?: MouseClickHandler`: Handler for the "Create New" button.
-   `onRefreshClick?: MouseClickHandler`: Handler for the refresh button.
-   `gap?: number`: Gap between cards in pixels. Defaults to `12`.
-   `canBeClosed?: boolean`: Whether the page can be closed. Defaults to `false`.
-   `placeholder?: string`: Placeholder text for the search input.

## Features

-   Paginated data display based on PagingDataManager
-   Built-in pagination controls and loading state management
-   Flexible card-based layout with configurable gap
-   Customizable action buttons (create new, refresh)
-   Responsive design with page-level operations support
-   Automatic card rendering using the render configuration