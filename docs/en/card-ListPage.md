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

1.  **Prepare your data and filter function**

    ```ts
    const allItems = [
        { id: 1, name: 'Product A', category: 'Electronics' },
        { id: 2, name: 'Product B', category: 'Books' },
        { id: 3, name: 'Product C', category: 'Electronics' }
    ];

    // Optional: Create a filter function for client-side filtering
    const filterFun = (item: any, filterText: string) => {
        return item.name.toLowerCase().includes(filterText.toLowerCase()) ||
               item.category.toLowerCase().includes(filterText.toLowerCase());
    };
    ```

2.  **Use the Component in Your Page**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/cards/ListPage.svelte';
        import YourCardComponent from './YourCardComponent.svelte';

        let list = allItems; // Your data array

        let page$attrs = {
            title: "All Products"
        };

        // Configure the render object
        let render = {
            component: YourCardComponent,
            props: {} // Any additional props to pass to the card
        };

        // Optional refresh handler
        const onRefreshClick = () => {
            // Reload your data here
        };
    </script>

    <ListPage
        {page$attrs}
        {list}
        {render}
        {filterFun}
        {onRefreshClick}
        gap={12}
    />
    ```

## Component Props

-   `page$attrs: PageAttrs`: Page attributes containing title and other page-level settings. **(Required)**
-   `list: Array<any>`: The array of data items to display as cards. **(Required)**
-   `render: object`: Configuration object with `component` and `props` for rendering cards. **(Required)**
-   `filterFun?: FunFilter`: Optional function for client-side filtering of cards.
-   `onCreateNewClick?: MouseClickHandler`: Handler for the "Create New" button.
-   `onRefreshClick?: MouseClickHandler`: Handler for the refresh button.
-   `gap?: number`: Gap between cards in pixels. Defaults to `12`.
-   `canBeClosed?: boolean`: Whether the page can be closed. Defaults to `false`.
-   `placeholder?: string`: Placeholder text for the search input.

## Features

-   Client-side data display with array-based list
-   Built-in filtering and search using CardListBoard
-   Flexible card-based layout with configurable gap
-   Customizable action buttons (create new, refresh)
-   Responsive design with filterable page bar
-   Automatic card rendering using the render configuration