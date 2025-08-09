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

3.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/cards/managed/PagingListPage.svelte';
        import TenantManager from '../managers/TenantManager';
        import TenantCard from './TenantCard.svelte'; // Your custom card component

        const dataManager = new TenantManager();

        let page$attrs = {
            title: "Managed Tenant Cards"
        };

        // Configure the render object to use your card component
        let render = {
            component: TenantCard,
            props: {} // Any additional props to pass to the card
        };

        let criteria = {}; // Search criteria
    </script>

    <PagingListPage
        {dataManager}
        {page$attrs}
        {render}
        {criteria}
    >
        <!-- Optional search panel -->
        <div slot="search-panel">
            <!-- Your search form controls -->
        </div>
    </PagingListPage>
    ```

## Component Props

-   `dataManager: PagedDataManager`: An instance of your data manager. **(Required)**
-   `page$attrs: object`: Page attributes containing title and other page-level settings. **(Required)**
-   `render: object`: Configuration object with `component` and `props` for rendering cards. **(Required)**
-   `criteria: object`: Search criteria object that gets passed to the data manager. **(Required)**
-   `gap?: number`: Gap between cards in pixels. Defaults to `8`.
-   `canBeClosed?: boolean`: Whether the page can be closed. Defaults to `false`.
-   `actions?: ButtonActions`: Array of action buttons for the search panel.

## Slots

-   `search-panel`: Optional slot for custom search form controls.
-   `advanced-panel`: Optional slot for advanced search criteria.

## Features

-   Automatic data fetching using PagedDataManager
-   Built-in pagination controls
-   Server-side data loading and searching
-   Loading and error state management  
-   Flexible card-based layout with configurable gap
-   Integrated search panel with FilterPanel
-   Responsive design with action bars
-   Automatic card rendering using the render configuration
