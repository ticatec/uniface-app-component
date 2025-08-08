# Card View: Managed ListPage

The `card/managed/ListPage.svelte` component fetches a complete dataset from a service and displays it in a card-based layout, automatically managing the loading and error states.

## Purpose

This is the card-based equivalent of the managed table `ListPage`. Use it to display a full list of items as cards, where the data is fetched asynchronously from a service. It's perfect for galleries, dashboards, or any non-paginated list that isn't suited for a table.

## How to Use

You provide a `DataService` and use the `let:listDataManager` slot property to access the data and pass it to a `CardListBoard`.

1.  **Create a `DataService`**

    ```ts
    // src/services/ApplicationService.ts
    import { DataService } from '@ticatec/app-data-service';

    export class ApplicationService extends DataService<any> {
        constructor() {
            super('/api/applications');
        }
    }
    ```

2.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/card/managed/ListPage.svelte';
        import CardListBoard from '@ticatec/uniface-app-component/card/CardListBoard.svelte';
        import { ApplicationService } from '../services/ApplicationService';
        import ApplicationCard from './ApplicationCard.svelte'; // Your custom card component

        const appService = new ApplicationService();
    </script>

    <ListPage
        title="All Applications"
        service={appService}
        let:listDataManager
    >
        <CardListBoard
            items={listDataManager.filtered}
            let:item
        >
            <ApplicationCard application={item} />
        </CardListBoard>
    </ListPage>
    ```

## Component Props

-   `title: string`: The title displayed at the top of the page.
-   `service: DataService`: An instance of your data service that implements `getAll()`. **(Required)**
-   `showActionBar?: boolean`: Whether to show the top action bar. Defaults to `true`.
-   `showFilterBar?: boolean`: Whether to show the filter/search bar. Defaults to `true`.

## Slot Properties

-   `let:listDataManager`: The instance of `ListDataManager` that manages the component's state and data. Access the data via `listDataManager.filtered`.
