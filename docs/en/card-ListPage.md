# Card View: Unmanaged ListPage

The `card/ListPage.svelte` component is used for displaying a complete, non-paginated list of items in a card-based layout. It uses a `ListDataManager` to hold the data and state.

## Purpose

This component is the card-view counterpart to the unmanaged table `ListPage`. It's suitable for displaying a client-side array of data as cards, with optional client-side filtering controlled by the `ListDataManager`.

## How It Works
This component is a **UI shell** that renders the state of a `ListDataManager` you provide.
- **You control the data:** You are responsible for creating the manager and providing it with a complete array of data.
- **The manager holds the state:** The `ListDataManager` instance holds the full dataset and the filtered dataset. The component's search bar interacts with this manager to perform filtering.
- **The component renders the state:** `ListPage` provides the surrounding UI, and you use a `CardListBoard` to render the `manager.filtered` data.

## Key Dependencies
-   **`@ticatec/app-data-manager/ListDataManager`**: The "brain" of the component. It holds the data and performs filtering.
-   **`CardListBoard`**: A simple looper component to render your cards.

## How to Use

1.  **Set up your `ListDataManager`.**

    ```ts
    import { ListDataManager } from '@ticatec/app-data-manager';

    const allItems = [
        { id: 1, name: 'Product A', category: 'Electronics' },
        { id: 2, name: 'Product B', category: 'Books' },
        { id: 3, name: 'Product C', category: 'Electronics' }
    ];

    const manager = new ListDataManager({
        data: allItems,
        filterableFields: ['name', 'category']
    });
    ```

2.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        // ... (script from above)
        import ListPage from '@ticatec/uniface-app-component/card/ListPage.svelte';
        import CardListBoard from '@ticatec/uniface-app-component/card/CardListBoard.svelte';
        import YourCardComponent from './YourCardComponent.svelte';
    </script>

    <ListPage
        title="All Products"
        dataManager={manager}
    >
        <CardListBoard
            items={manager.filtered}
            let:item
        >
            <YourCardComponent product={item} />
        </CardListBoard>
    </ListPage>
    ```

## Component Props

-   `title: string`: The title displayed at the top of the page.
-   `dataManager: ListDataManager`: An instance of your manually controlled data manager. **(Required)**
-   `showActionBar?: boolean`: Whether to show the top action bar. Defaults to `true`.
-   `showFilterBar?: boolean`: Whether to show the filter/search bar. Defaults to `true`.