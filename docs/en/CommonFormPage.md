# CommonFormPage

The `CommonFormPage.svelte` component provides a standardized layout for full-page forms. It is built on top of `CommonPage` and provides form-specific action bar and close confirmation functionality.

## Purpose

Use this component to wrap your form content. It provides several key features out-of-the-box:

-   **Consistent Layout**: Uses the standard page layout provided by `CommonPage`, including a title bar and scrollable main content area
-   **Built-in Action Bar**: Automatically displays action buttons at the top of the page, including your custom buttons and an optional close button
-   **Close Confirmation**: Built-in, optional confirmation function that is called when the user tries to close the form, preventing accidental data loss
-   **Easy Integration**: Works seamlessly with standard HTML `<form>` elements and Svelte's form handling capabilities

## How to Use

Wrap your form elements inside the `CommonFormPage` component and set the page title and other properties through `page$attrs`.

```svelte
<script lang="ts">
    import CommonFormPage from '@ticatec/uniface-app-component/form-pages/CommonFormPage.svelte';
    import type { ButtonActions } from '@ticatec/uniface-element/ActionBar';

    let name = '';
    let email = '';
    let isDirty = false;

    // A simple dirty check
    $: isDirty = name !== '' || email !== '';

    // Page attributes
    let page$attrs = {
        title: "Create New User",
        comment: "Fill in basic user information"
    };

    // Define action buttons
    const actions: ButtonActions = [
        {
            label: 'Save User',
            type: 'primary',
            handler: handleSave
        },
        {
            label: 'Reset',
            type: 'secondary', 
            handler: handleReset
        }
    ];

    function handleSave() {
        // Implement save logic
        console.log('Saving:', { name, email });
        isDirty = false; // Reset dirty state after save
    }

    function handleReset() {
        name = '';
        email = '';
        isDirty = false;
    }

    // Setup close confirmation
    const closeConfirm = async (): Promise<boolean> => {
        if (isDirty) {
            return confirm('You have unsaved changes. Are you sure you want to close?');
        }
        return true;
    };
</script>

<CommonFormPage 
    {page$attrs} 
    {actions} 
    {closeConfirm}
    canBeClosed={true}
    closeType="secondary"
>
    <div class="form-content">
        <label for="name">Name</label>
        <input type="text" id="name" bind:value={name} />

        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} />
    </div>
</CommonFormPage>

<style>
    .form-content {
        padding: 1rem;
        display: grid;
        gap: 1rem;
    }
</style>
```

## Component Props

-   `page$attrs: PageAttrs`: Page attributes containing title and other page-level settings. **(Required)**
-   `closeConfirm?: CloseConfirm | null`: Close confirmation function. Called when the user tries to close the page, returns `Promise<boolean>` to determine whether closing is allowed. Defaults to `null`.
-   `canBeClosed?: boolean`: Whether the page can be closed. If `true`, a close button will be displayed in the action bar. Defaults to `true`.
-   `closeType?: ButtonType`: The type of the close button (e.g., 'primary', 'secondary'). Defaults to `'primary'`.
-   `actions?: ButtonActions`: Array of custom action buttons to display in the action bar. Defaults to empty array.

## Slots

-   `default`: The main content of your form (e.g., input fields, labels). This content will be displayed in the main content area with scroll functionality.

## CloseConfirm Type

`CloseConfirm` is an async function type used for handling close confirmation logic:

```ts
type CloseConfirm = () => Promise<boolean>
```

-   **Return Value**: Returns `Promise<boolean>`, where `true` allows closing and `false` cancels closing
-   **Purpose**: Called when the user tries to close the page, used to check for unsaved changes and prompt for user confirmation

## PageAttrs Interface

The page attributes interface definition:

```ts
interface PageAttrs {
    title: string;        // Page title (required)
    comment?: string;     // Title annotation (optional)
    style?: string;       // Custom CSS styles (optional)
}
```

## Features

-   Standard page layout based on `CommonPage`
-   Built-in `ActionBar` component for displaying action buttons
-   Automatic management of close button display and behavior
-   Support for async close confirmation mechanism
-   Scrollable content area suitable for long forms
-   Good integration with existing page systems