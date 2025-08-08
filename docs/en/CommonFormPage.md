# CommonFormPage

The `CommonFormPage.svelte` component provides a standardized layout for full-page forms. It is designed to ensure a consistent user experience for data entry tasks across your application.

## Purpose

Use this component to wrap your form content. It provides several key features out-of-the-box:

-   **Consistent Layout**: A dedicated header for the title, a main content area that scrolls, and a fixed action bar at the bottom.
-   **Action Bar**: A clean, persistent bar for action buttons like "Save", "Submit", or "Cancel".
-   **Close Confirmation**: Built-in, optional confirmation dialog when the user tries to close a "dirty" (modified) form, preventing accidental data loss.
-   **Easy Integration**: Works seamlessly with standard HTML `<form>` elements and Svelte's form handling capabilities.

## How to Use

Wrap your form elements inside the `CommonFormPage` component. Use the `header` and `actions` slots to place your title and buttons.

```svelte
<script lang="ts">
    import CommonFormPage from '@ticatec/uniface-app-component/form-pages/CommonFormPage.svelte';
    import { CloseConfirm } from '@ticatec/uniface-app-component/common';
    import Button from '@ticatec/uniface-element/Button.svelte';

    let name = '';
    let email = '';
    let isDirty = false;

    // A simple dirty check
    $: isDirty = name !== '' || email !== '';

    function handleSave() {
        // Implement save logic
        console.log('Saving:', { name, email });
        isDirty = false; // Reset dirty state after save
    }

    function handleClose() {
        // Implement close logic (e.g., navigate away)
        console.log('Closing page');
    }

    // Setup close confirmation
    const closeConfirm = new CloseConfirm({
        isDirty: () => isDirty,
        onClose: handleClose
    });
</script>

<CommonFormPage {closeConfirm}>
    <div slot="header">
        <h2>Create New User</h2>
    </div>

    <div class="form-content">
        <label for="name">Name</label>
        <input type="text" id="name" bind:value={name} />

        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} />
    </div>

    <div slot="actions">
        <Button on:click={handleSave} style="primary">Save User</Button>
        <Button on:click={closeConfirm.tryClose}>Close</Button>
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

-   `closeConfirm?: CloseConfirm`: An instance of the `CloseConfirm` helper class. When provided, it enables the "are you sure you want to close?" functionality.
-   `showActionBar?: boolean`: Whether to display the bottom action bar. Defaults to `true`.
-   `showCloseButton?: boolean`: Whether to show the default close button in the action bar. Defaults to `true`.

## Slots

-   `header`: Place the title or header content here (e.g., `<h2>My Form</h2>`).
-   `default`: The main content of your form (e.g., input fields, labels).
-   `actions`: Place your action buttons here. They will appear in the bottom action bar.

## `CloseConfirm` Helper

The `CloseConfirm` class is used to manage the close-with-confirmation workflow.

`new CloseConfirm({ isDirty: () => boolean, onClose: () => void })`

-   `isDirty`: A function that returns `true` if the form has unsaved changes, `false` otherwise. This function is called whenever a close attempt is made.
-   `onClose`: A function that will be executed to perform the actual closing logic (e.g., navigating to another page) after the user confirms or if the form is not dirty.
