# @ticatec/uniface-app-component

[![NPM Version](https://img.shields.io/npm/v/@ticatec/uniface-app-component.svg)](https://www.npmjs.com/package/@ticatec/uniface-app-component)
[![License](https://img.shields.io/npm/l/@ticatec/uniface-app-component.svg)](LICENSE)

**[🇨🇳 中文文档](./README-CN.md)** | **[📖 Documentation](./docs/en/)**

A comprehensive Svelte component library designed to accelerate the development of data-driven, modular web applications. Built on top of Svelte 5 and the Ticatec Uniface ecosystem, it provides high-level, application-oriented components for common enterprise scenarios.

This library is the perfect tool for building:
- Micro-frontend modules
- Data-intensive admin panels
- Complex data grids and lists
- Full-page data entry forms

## ✨ Key Features

- **🚀 Application-Level Components**: High-level abstractions for pages and data management, not just basic UI elements
- **📦 Modular Architecture**: Built-in support for micro-frontend architecture via `AppModule`, enabling isolated development and deployment
- **📊 Powerful Data Views**: Sophisticated components for displaying data, including `DataTable` and `CardList`, with out-of-the-box support for:
    - Pagination (client-side and server-side)
    - "Managed" mode with automatic data fetching and state management
    - Dynamic filtering and searching
- **📋 Flexible Forms**: A standardized `CommonFormPage` for creating full-page forms with consistent layout and behavior
- **🌐 Internationalization (i18n)**: Core components come with built-in support for multiple languages
- **🎨 Ticatec Ecosystem**: Seamlessly integrates with `@ticatec/uniface-element` and other Ticatec data management libraries

## 📦 Installation

Install the package and its peer dependencies using your favorite package manager:

```bash
npm install @ticatec/uniface-app-component @ticatec/uniface-element svelte
```

You also need to include the component's stylesheet in your main application file.

```ts
// src/main.ts
import "@ticatec/uniface-app-component/uniface-app-component.css";
```

## 🚀 Quick Start

Here's how to create a managed, paginated data table that fetches data from a remote API using DataManager.

1.  **Define your data service, manager and columns:**

    ```ts
    // src/routes/demo/paged-table/TenantService.ts
    import { PagingDataService } from '@ticatec/app-data-service';

    export default class TenantService extends PagingDataService {
        constructor() {
            super('/api/tenants');
        }
    }

    export const service = new TenantService();
    ```

    ```ts
    // src/routes/demo/paged-table/TenantManager.ts
    import { PagedDataManager } from "@ticatec/app-data-manager";
    import { service } from "./TenantService";

    export default class TenantManager extends PagedDataManager {
        constructor() {
            super(service, 'id'); // Use 'id' as the unique identifier field
        }
    }
    ```

    ```ts
    // src/routes/demo/paged-table/TenantColumns.ts
    import type { DataColumn } from "@ticatec/uniface-element";

    const columns: Array<DataColumn> = [
        {
            text: 'Tenant Name',
            field: 'name',
            width: 200,
            resizable: true
        },
        {
            text: 'Contact Email',
            field: 'email',
            width: 250,
            resizable: true
        },
        {
            text: 'Status',
            field: 'status',
            width: 120,
            align: 'center'
        }
    ];

    export default columns;
    ```

2.  **Configure the global REST service (in your app setup):**

    ```ts
    // src/app.ts or src/main.ts
    import { BaseDataService } from '@ticatec/app-data-service';
    import RestService from '@ticatec/axios-restful-service';

    // Configure global REST service
    BaseDataService.setProxy(new RestService('https://api.example.com'));
    ```

3.  **Use the `PagingListPage` component in your Svelte page:**

    ```svelte
    <!-- src/routes/demo/paged-table/+page.svelte -->
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/data-table/managed/PagingListPage.svelte';
        import TenantManager from './TenantManager';
        import columns from './TenantColumns';

        const dataManager = new TenantManager();

        let page$attrs = {
            title: "Managed Tenants"
        };
    </script>

    <PagingListPage 
        {dataManager} 
        {columns} 
        {page$attrs} 
        rowHeight={48}
    />
    ```

This example creates a fully functional data table using @ticatec/uniface-element/DataTable with pagination, data fetching, loading indicators, and error handling—all managed automatically by the PagedDataManager.

## 🛠️ Development

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

## 📚 Documentation

### 🌐 Language Options
- **[📖 English Documentation](./docs/en/)** - Complete English documentation
- **[🇨🇳 中文文档](./docs/cn/)** - 完整中文文档

### 🧩 Core Components
- **[AppModule](./docs/en/AppModule.md)** - Application module management and navigation
- **[HomePage](./docs/en/HomePage.md)** - Home page component
- **[CommonFormPage](./docs/en/CommonFormPage.md)** - Standardized form page component

### 📊 Data Display Components

#### 📋 Data Tables
- **[ListPage](./docs/en/data-table-ListPage.md)** - Basic data table list
- **[PagingListPage](./docs/en/data-table-PagingListPage.md)** - Paginated data table
- **[Managed ListPage](./docs/en/data-table-managed-ListPage.md)** - Managed data table with auto data fetching
- **[Managed PagingListPage](./docs/en/data-table-managed-PagingListPage.md)** - Managed paginated data table
- **[Dynamic PagingListPage](./docs/en/data-table-managed-DynamicPagingListPage.md)** - Dynamic paginated data table

#### 🃏 Card Lists
- **[Card ListPage](./docs/en/card-ListPage.md)** - Basic card list
- **[Card PagingListPage](./docs/en/card-PagingListPage.md)** - Paginated card list
- **[Managed Card ListPage](./docs/en/card-managed-ListPage.md)** - Managed card list
- **[Managed Card PagingListPage](./docs/en/card-managed-PagingListPage.md)** - Managed paginated card list

### 🏗️ Module Components
- **[ModuleHome](./docs/en/module-ModuleHome.md)** - Module home component
- **[TabModules](./docs/en/multiple-modules-TabModules.md)** - Tab-based multiple modules

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.