# Card View: Managed PagingListPage

The `card/managed/PagingListPage.svelte` component is the card-based equivalent of the managed data table. It automates the process of fetching, paginating, and displaying data in a flexible card layout.

## Purpose

Use this component when you need to display a large, paginated dataset as a series of cards instead of a table. It handles all the background logic, including:

-   Fetching data from a `PagedDataService`.
-   Managing loading, error, and empty states.
-   Handling pagination controls.
-   Providing a simple interface for rendering each card.

## How to Use

The component is almost identical in usage to its data-table counterpart, relying on a service for data and a slot for rendering.

1.  **Create a `PagedDataService`** (You can reuse the same service as the data table).

    ```ts
    // src/services/TenantService.ts
    import { PagedDataService } from '@ticatec/app-data-service';

    export class TenantService extends PagedDataService<any> {
        constructor() {
            super('/api/tenants');
        }
    }
    ```

2.  **Use the Component in Your Page**

    Instead of `columns`, you pass your data to the `CardListBoard` component, and you have complete freedom to design your card within the slot.

    ```svelte
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/card/managed/PagingListPage.svelte';
        import CardListBoard from '@ticatec/uniface-app-component/card/CardListBoard.svelte';
        import { TenantService } from '../services/TenantService';

        // A simple card component for displaying a tenant
        import TenantCard from './TenantCard.svelte';

        const tenantService = new TenantService();
    </script>

    <PagingListPage
        title="Managed Tenant Cards"
        service={tenantService}
        let:pagedDataManager
    >
        <!--
            The slot gives you access to the PagedDataManager instance.
            You pass its `pagedData` to the CardListBoard.
        -->
        <CardListBoard
            items={pagedDataManager.pagedData.data}
            let:item
        >
            <!-- Render your custom card component for each item -->
            <TenantCard tenant={item} />
        </CardListBoard>
    </PagingListPage>
    ```

## Component Props

-   `title: string`: The title displayed at the top of the page.
-   `service: PagedDataService`: An instance of your data service. **(Required)**
-   `pageNo?: number`: The initial page number to load (1-based). Defaults to `1`.
-   `pageSize?: number`: The number of items per page. Defaults to `10`.
-   `showActionBar?: boolean`: Whether to show the top action bar. Defaults to `true`.
-   `showPagingBar?: boolean`: Whether to show the bottom pagination bar. Defaults to `true`.

## Slot Properties

-   `let:pagedDataManager`: The instance of `PagingDataManager` that manages the component's state and data. You can access the loaded data via `pagedDataManager.pagedData.data`.
