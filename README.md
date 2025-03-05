# Uniface Application and Page Template Component Library

[中文文档](./README-CN.md)

Uniface App Component is a front-end UI component library based on Svelte 5 and Uniface Element, focusing on **micro frontend application management**, **data presentation**, and **form management**, providing efficient and flexible UI solutions.

## **Core Features**
### 1. **Micro Frontend Application Management**
Uniface provides **micro frontend application module management**, supporting dynamic loading, route management, `iframe` runtime detection, and more. It is suitable for SaaS platforms or large web applications with independent module development.

#### **Main Components**
- **`AppModule`**: Manages micro frontend application module pages, supporting dynamic loading and page monitoring.
- **`HomePage`**: A homepage for micro frontend modules in an `iframe` environment, supporting routing and module initialization.

---

### 2. **I18N Keywords**
This template component library supports I18N. Before use, please configure the language resource library according to the application's language settings. For more details, refer to the I18N section in Uniface Element.

| Name | Description | Default Value |
|------|------------|---------------|
|uniface.app.busyIndicator| Data loading indicator message | Loading data... |
|uniface.app.btnNew| New button label | New |
|uniface.app.btnRefresh| Refresh button label | Refresh |
|uniface.app.btnClose| Close button label | Close |
|uniface.app.emptyFiltered| Message when no data matches the filter criteria | There is no data that meets the filter criteria. Please set the filter criteria again. |
|uniface.app.emptyDataSet| Message when no data matches the search criteria in pagination | There is no data that meets the search criteria. Please set the search criteria again. |
|uniface.app.indicatorInitialing| Module initialization message | Loading module... |

---

### 3. **Data Collection Display**
Uniface provides various **data display components**, supporting **card views** and **table views**, as well as **full data** and **paginated query data**, integrating with `DataManager` for automatic data management.

#### **Display Modes**
- **Card View**:
    - Full Data Card Display [Detailed Documentation](./document/CardsPage_CN)
    - Paginated Query Data Card Display [Detailed Documentation](./document/PagedCardsPage_CN)
    - Managed Full Data Card Display [Detailed Documentation](./document/ManagedCardsPage_CN)
    - Managed Paginated Query Data Card Display [Detailed Documentation](./document/ManagedPagedCardsPage_CN)
- **Table View**:
    - Full Data Table Display [Detailed Documentation](./document/DataListTablePage_CN)
    - Paginated Query Data Table Display [Detailed Documentation](./document/PagedDataTablePage_CN)
    - Managed Full Data Table Display [Detailed Documentation](./document/ManagedDataTablePage_CN)
    - Managed Paginated Query Data Table Display [Detailed Documentation](./document/ManagedPagedDataTablePage_CN)
    - Managed Dynamic Query Paginated Data Table Display [Detailed Documentation](./)

---

### 4. **Form Entry Management**
Uniface provides **form management components**, suitable for **large-screen form input**, supporting **page-level forms** and **action button management**.

#### **Main Components**
- **`CommonFormPage`**: A full-page form entry component that supports:
    - Adaptive scrolling form area
    - Action button bar (configurable with `ActionBar`)
    - Close button with pre-close confirmation mechanism
    - Page attribute transfer (`PageAttrs`)

---

## **Dependencies and Applicable Scenarios**
### **Dependencies**
- `@ticatec/uniface-icons`
- `@ticatec/app-data-manager`
- `@ticatec/app-data-service`
- `@ticatec/uniface-element`
- `@ticatec/uniface-filter-panel`

### **Applicable Scenarios**
- **Micro Frontend Architecture**: Supports `iframe` runtime environments, suitable for SaaS platforms or large web applications.
- **Dynamic Data Display**: Supports full data and paginated queries, suitable for data-intensive applications.
- **Complex Form Management**: Suitable for multi-step, long-form management applications.

## Contribution

Contributions are welcome! Please submit issues and pull requests.

## License

Copyright © 2023 Ticatec. All rights reserved.

This library is released under the MIT license. For details, see the [LICENSE](LICENSE) file.

## Contact

huili.f@gmail.com

https://github.com/henryfeng/filter-panel

