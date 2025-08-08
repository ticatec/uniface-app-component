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
-   **`CardListBoard`**: A simple component that takes a list of items and renders them using its default slot. You will typically place this inside the `PagingListPage` and feed it data from your manager.

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

    You use the `CardListBoard` component inside the `PagingListPage` to render the items from the manager.

    ```svelte
    <script lang="ts">
        // ... (script from above)
        import PagingListPage from '@ticatec/uniface-app-component/card/PagingListPage.svelte';
        import CardListBoard from '@ticatec/uniface-app-component/card/CardListBoard.svelte';
        import TenantCard from './TenantCard.svelte';
    </script>

    <PagingListPage
        title="Unmanaged Tenant Cards"
        dataManager={manager}
    >
        <CardListBoard
            items={manager.pagedData.data}
            let:item
        >
            <TenantCard tenant={item} />
        </CardListBoard>
    </PagingListPage>
    ```

## Component Props

-   `title: string`: The title displayed at the top of the page.
-   `dataManager: PagingDataManager`: An instance of your manually controlled data manager. **(Required)**
-   `showActionBar?: boolean`: Whether to show the top action bar. Defaults to `true`.
-   `showPagingBar?: boolean`: Whether to show the bottom pagination bar. Defaults to `true`.
