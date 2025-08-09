# Card View: Managed ListPage

The `card/managed/ListPage.svelte` component fetches a complete dataset from a service and displays it in a card-based layout, automatically managing the loading and error states.

## Purpose

This is the card-based equivalent of the managed table `ListPage`. Use it to display a full list of items as cards, where the data is fetched asynchronously from a service. It's perfect for galleries, dashboards, or any non-paginated list that isn't suited for a table.

## How to Use

1.  **Create a `FullListDataService`**

    ```ts
    // src/services/ApplicationService.ts
    import { FullListDataService } from '@ticatec/app-data-service';

    export default class ApplicationService extends FullListDataService {
        constructor() {
            super('/api/applications');
        }
    }

    export const service = new ApplicationService();
    ```

2.  **Create a `FullListDataManager`**

    ```ts
    // src/managers/ApplicationManager.ts
    import { FullListDataManager } from '@ticatec/app-data-manager';
    import { service } from '../services/ApplicationService';

    export default class ApplicationManager extends FullListDataManager {
        constructor() {
            super(service, 'id');
        }
    }
    ```

3.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/cards/managed/ListPage.svelte';
        import ApplicationManager from '../managers/ApplicationManager';
        import ApplicationCard from './ApplicationCard.svelte'; // Your custom card component

        const dataManager = new ApplicationManager();

        let page$attrs = {
            title: "All Applications"
        };

        // Configure the render object to use your card component
        let render = {
            component: ApplicationCard,
            props: {} // Any additional props to pass to the card
        };
    </script>

    <ListPage 
        {dataManager}
        {page$attrs}
        {render}
    />
    ```

## Component Props

-   `dataManager: FullListDataManager`: An instance of your data manager. **(Required)**
-   `page$attrs: object`: Page attributes containing title and other page-level settings. **(Required)**
-   `render: object`: Configuration object with `component` and `props` for rendering cards. **(Required)**
-   `gap?: number`: Gap between cards in pixels. Defaults to `8`.
-   `canBeClosed?: boolean`: Whether the page can be closed. Defaults to `false`.
-   `filterFun?: FunFilter`: Function for client-side filtering of cards.
-   `placeholder?: string`: Placeholder text for the search input.

## Features

-   Automatic data fetching using FullListDataManager
-   Built-in loading and error states
-   Client-side filtering and searching using CardListBoard
-   Flexible card-based layout with configurable gap
-   Responsive design with action bars
-   Automatic card rendering using the render configuration
