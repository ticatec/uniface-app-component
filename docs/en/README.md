# @ticatec/uniface-app-component Documentation

Welcome to the English documentation for `@ticatec/uniface-app-component`! This library provides a comprehensive set of Svelte components for building enterprise applications with consistent UI patterns.

## 🏗️ Core Components

### App Structure
- [**AppModule**](./AppModule.md) - Main application module wrapper
- [**HomePage**](./HomePage.md) - Standard home page layout

### Form Pages
- [**CommonFormPage**](./CommonFormPage.md) - Standardized form page layout with action bar

### Module Components  
- [**ModuleHome**](./module-ModuleHome.md) - Module home page component
- [**TabModules**](./multiple-modules-TabModules.md) - Tab-based multiple module container

## 📊 Data Display Components

### Card View Components
| Component | Type | Description |
|-----------|------|-------------|
| [**Card ListPage**](./card-ListPage.md) | Unmanaged | Simple list display with client-side filtering |
| [**Card PagingListPage**](./card-PagingListPage.md) | Unmanaged | Paginated list with manual data management |
| [**Card Managed ListPage**](./card-managed-ListPage.md) | Managed | Automated full list with service integration |
| [**Card Managed PagingListPage**](./card-managed-PagingListPage.md) | Managed | Automated paginated list with service integration |

### Data Table Components
| Component | Type | Description |
|-----------|------|-------------|
| [**DataTable ListPage**](./data-table-ListPage.md) | Unmanaged | Simple table display with client-side filtering |
| [**DataTable PagingListPage**](./data-table-PagingListPage.md) | Unmanaged | Paginated table with manual data management |
| [**DataTable Managed ListPage**](./data-table-managed-ListPage.md) | Managed | Automated full table with service integration |
| [**DataTable Managed PagingListPage**](./data-table-managed-PagingListPage.md) | Managed | Automated paginated table with service integration |
| [**DataTable Managed DynamicPagingListPage**](./data-table-managed-DynamicPagingListPage.md) | Managed | Advanced paginated table with dynamic filtering |

## 🔧 Component Types

### Managed vs Unmanaged Components

**🤖 Managed Components**
- Automatically handle data fetching using `@ticatec/app-data-service`
- Use `DataManager` classes for state management
- Built-in loading states, error handling, and pagination
- Less configuration required, more opinionated

**👨‍💻 Unmanaged Components**
- You control data fetching and state management
- More flexible for custom integrations
- Require manual setup of data managers or direct data passing
- More configuration required, less opinionated

### Component Patterns

**Card Components**
- Use `render` configuration objects for automatic component rendering
- Suitable for rich, visual data display
- Support flexible layouts with configurable gaps

**DataTable Components**
- Use `@ticatec/uniface-element/DataTable` with `DataColumn` types
- Suitable for structured, tabular data
- Support row selection, sorting, and actions

## 📚 Key Dependencies

- **`@ticatec/uniface-element`** - Base UI components (DataTable, ActionBar, etc.)
- **`@ticatec/app-data-service`** - Data service classes (PagingDataService, FullListDataService)  
- **`@ticatec/app-data-manager`** - Data management classes (PagedDataManager, FullListDataManager)

## 🚀 Getting Started

1. Install the package and its dependencies
2. Choose the appropriate component type (managed vs unmanaged)
3. For card components, prepare your card component and `render` configuration
4. For table components, define your `DataColumn` configuration
5. Set up your `page$attrs` for consistent page-level settings

## 🌐 Other Languages

- [中文文档](../cn/README.md) - Chinese documentation

---

For more details about the overall project, see the [main README](../../README.md).