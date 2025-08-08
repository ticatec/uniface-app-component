# @ticatec/uniface-app-component

[![NPM Version](https://img.shields.io/npm/v/@ticatec/uniface-app-component.svg)](https://www.npmjs.com/package/@ticatec/uniface-app-component)
[![License](https://img.shields.io/npm/l/@ticatec/uniface-app-component.svg)](LICENSE)

[中文文档](./README-CN.md)

A comprehensive Svelte component library designed to accelerate the development of data-driven, modular web applications. Built on top of Svelte 5 and the Ticatec Uniface ecosystem, it provides high-level, application-oriented components for common enterprise scenarios.

This library is the perfect tool for building:
- Micro-frontend modules
- Data-intensive admin panels
- Complex data grids and lists
- Full-page data entry forms

## Features

- **🚀 Application-Level Components**: High-level abstractions for pages and data management, not just basic UI elements.
- **📦 Modular Architecture**: Built-in support for micro-frontend architecture via `AppModule`, enabling isolated development and deployment.
- **📊 Powerful Data Views**: Sophisticated components for displaying data, including `DataTable` and `CardList`, with out-of-the-box support for:
    - Pagination (client-side and server-side)
    - "Managed" mode with automatic data fetching and state management.
    - Dynamic filtering and searching.
- **📋 Flexible Forms**: A standardized `CommonFormPage` for creating full-page forms with consistent layout and behavior.
- **🌐 Internationalization (i18n)**: Core components come with built-in support for multiple languages.
- **🎨 Ticatec Ecosystem**: Seamlessly integrates with `@ticatec/uniface-element` and other Ticatec data management libraries.

## Installation

Install the package and its peer dependencies using your favorite package manager:

```bash
npm install @ticatec/uniface-app-component @ticatec/uniface-element svelte
```

You also need to include the component's stylesheet in your main application file.

```ts
// src/main.ts
import "@ticatec/uniface-app-component/uniface-app-component.css";
```

## Quick Start

Here's how to create a managed, paginated data table that fetches data from a remote API.

1.  **Define your data service and columns:**

    ```ts
    // src/routes/demo/paged-table/TenantService.ts
    import { PagedDataService } from '@ticatec/app-data-service';

    export class TenantService extends PagedDataService<any> {
        constructor() {
            // The URL to fetch paginated data
            super('/api/tenants');
        }
    }

    // src/routes/demo/paged-table/TenantColumns.ts
    export const tenantColumns = [
        { key: 'name', label: 'Tenant Name' },
        { key: 'email', label: 'Contact Email' },
        { key: 'status', label: 'Status' }
    ];
    ```

2.  **Use the `PagingListPage` component in your Svelte page:**

    ```svelte
    <!-- src/routes/demo/paged-table/+page.svelte -->
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/data-table/managed/PagingListPage.svelte';
        import { TenantService } from './TenantService';
        import { tenantColumns } from './TenantColumns';

        const tenantService = new TenantService();
    </script>

    <PagingListPage
        title="Managed Tenants"
        service={tenantService}
        columns={tenantColumns}
        let:row
    >
        <!-- This slot defines how each row is rendered -->
        <tr class="hover">
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.status}</td>
        </tr>
    </PagingListPage>
    ```

This example creates a fully functional data table with pagination, data fetching, loading indicators, and error handling—all with just a few lines of code.

## Development

This is a SvelteKit library project. To start developing, clone the repository and run the following commands:

```bash
# Install dependencies
npm install

# Start the development server with live-reloading
npm run dev

# Build the library for publishing
npm run build

# Run type checking
npm run check
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.