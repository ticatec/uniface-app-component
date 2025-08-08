# AppModule

The `AppModule` class is a singleton controller that manages a stack of pages within an application. It's designed to be a simple, centralized way to handle navigation and the state of the page history.

## Purpose

- **Centralized Page Management**: Provides a single, globally accessible instance to control the stack of currently active pages.
- **Simple Stack Navigation**: Uses `append` and `pop` methods to add pages to the top of the stack or remove them, which is ideal for workflows like opening detail views and returning.
- **State Change Notifications**: A callback provided during initialization is triggered whenever the page stack changes, allowing your UI to react accordingly.

## Singleton Pattern

`AppModule` cannot be instantiated directly with `new`. It must be initialized once, and then its instance must be retrieved using static methods.

-   `AppModule.initialize(callback)`: Must be called once when your application starts.
-   `AppModule.getInstance()`: Returns the singleton instance.

## Basic Usage

1.  **Initialize the AppModule**

    In your main application entry point (e.g., a root `+layout.svelte`), initialize the module with a callback function. This function will receive the updated list of pages whenever a page is added or removed.

    ```ts
    // src/routes/+layout.svelte
    import { AppModule } from '@ticatec/uniface-app-component/module';

    // Initialize the singleton once
    AppModule.initialize((pages) => {
        // This callback lets you react to navigation changes
        console.log('The page stack has changed:', pages);
    });
    ```

2.  **Access the Instance and Show Pages**

    From anywhere in your application, you can get the instance and use its static methods to show or close pages.

    ```svelte
    <script lang="ts">
        import { AppModule } from '@ticatec/uniface-app-component/module';
        import MyNextPageComponent from './MyNextPageComponent.svelte';

        function openNewPage() {
            // Use the static method to append a new page component to the stack
            AppModule.showPage(MyNextPageComponent, { message: 'Hello from previous page' });
        }

        function goBack() {
            // Use the static method to pop the current page off the stack
            AppModule.closeActivePage();
        }
    </script>

    <button on:click={openNewPage}>Open Page</button>
    <button on:click={goBack}>Go Back</button>
    ```

## API Reference

### Static Methods

-   `AppModule.initialize(onPageChange: PagesChangeListener)`: Initializes the singleton instance. The `onPageChange` callback receives the full array of page objects whenever the stack changes. Must be called before any other method.
-   `AppModule.getInstance(): AppModule`: Returns the singleton instance.
-   `AppModule.showPage(component: any, params: any = null)`: A static shortcut to append a new page to the stack. This is the most common way to navigate forward.
-   `AppModule.closeActivePage()`: A static shortcut to pop the most recent page from the stack.

### Instance Methods

These are typically not called directly, as the static methods provide convenient shortcuts.

-   `append(component: any, params?: any): string`: Pushes a new page onto the stack and returns its unique ID.
-   `pop()`: Removes the top-most page from the stack.