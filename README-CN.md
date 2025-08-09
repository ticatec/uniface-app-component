# @ticatec/uniface-app-component

[![NPM Version](https://img.shields.io/npm/v/@ticatec/uniface-app-component.svg)](https://www.npmjs.com/package/@ticatec/uniface-app-component)
[![License](https://img.shields.io/npm/l/@ticatec/uniface-app-component.svg)](LICENSE)

[English Document](./README.md)

一个功能强大的 Svelte 组件库，旨在加速数据驱动、模块化 Web 应用的开发。它基于 Svelte 5 和 Ticatec Uniface 生态系统构建，为常见的企业级应用场景提供了高级的、面向应用的组件。

该库是构建以下类型应用的理想选择：
- 微前端模块
- 数据密集型管理后台
- 复杂的数据表格和列表
- 全页式数据录入表单

## 核心功能

- **🚀 应用级组件**: 提供面向页面的高级抽象和数据管理方案，而不仅仅是基础 UI 元素。
- **📦 模块化架构**: 通过 `AppModule` 内置了对微前端架构的支持，实现了模块的隔离开发和部署。
- **📊 强大的数据视图**: 提供精密的 `DataTable` 和 `CardList` 数据展示组件，并原生支持：
    - 分页功能（客户端与服务端）
    - “托管”模式，自动处理数据获取和状态管理。
    - 动态过滤与搜索。
- **📋 灵活的表单**: 标准化的 `CommonFormPage` 组件，用于创建布局和行为一致的全页式表单。
- **🌐 国际化 (i18n)**: 核心组件内置了对多语言的支持。
- **🎨 Ticatec 生态系统**: 与 `@ticatec/uniface-element` 及其他 Ticatec 数据管理库无缝集成。

## 安装

使用你喜欢的包管理器安装本包及其对等依赖：

```bash
npm install @ticatec/uniface-app-component @ticatec/uniface-element svelte
```

你还需要在你的主应用文件中引入组件的样式表。

```ts
// src/main.ts
import "@ticatec/uniface-app-component/uniface-app-component.css";
```

## 快速上手

以下示例将演示如何使用 DataManager 创建一个从远程 API 获取数据的"托管"模式分页数据表格。

1.  **定义你的数据服务、管理器和列配置:**

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
            super(service, 'id'); // 使用 'id' 作为唯一标识符字段
        }
    }
    ```

    ```ts
    // src/routes/demo/paged-table/TenantColumns.ts
    import type { DataColumn } from "@ticatec/uniface-element";

    const columns: Array<DataColumn> = [
        {
            text: '租户名称',
            field: 'name',
            width: 200,
            resizable: true
        },
        {
            text: '联系邮箱',
            field: 'email',
            width: 250,
            resizable: true
        },
        {
            text: '状态',
            field: 'status',
            width: 120,
            align: 'center'
        }
    ];

    export default columns;
    ```

2.  **配置全局 REST 服务（在应用设置中）:**

    ```ts
    // src/app.ts 或 src/main.ts
    import { BaseDataService } from '@ticatec/app-data-service';
    import RestService from '@ticatec/axios-restful-service';

    // 配置全局 REST 服务
    BaseDataService.setProxy(new RestService('https://api.example.com'));
    ```

3.  **在你的 Svelte 页面中使用 `PagingListPage` 组件:**

    ```svelte
    <!-- src/routes/demo/paged-table/+page.svelte -->
    <script lang="ts">
        import PagingListPage from '@ticatec/uniface-app-component/data-table/managed/PagingListPage.svelte';
        import TenantManager from './TenantManager';
        import columns from './TenantColumns';

        const dataManager = new TenantManager();

        let page$attrs = {
            title: "托管租户列表"
        };
    </script>

    <PagingListPage 
        {dataManager} 
        {columns} 
        {page$attrs} 
        rowHeight={48}
    />
    ```

这个示例使用 @ticatec/uniface-element/DataTable 创建了一个功能完整的数据表格，包含分页、数据获取、加载提示和错误处理等功能——所有这些都由 PagedDataManager 自动管理。

## 开发

这是一个 SvelteKit 库项目。要开始开发，请克隆本仓库并运行以下命令：

```bash
# 安装依赖
npm install

# 启动支持实时刷新的开发服务器
npm run dev

# 构建用于发布的库文件
npm run build

# 运行类型检查
npm run check
```

## 📚 文档

### 🌐 语言选项
- **[📖 中文文档](./docs/cn/)** - 完整中文文档
- **[🇺🇸 English Documentation](./docs/en/)** - Complete English documentation

### 🧩 核心组件
- **[AppModule](./docs/cn/AppModule.md)** - 应用模块管理与导航
- **[HomePage](./docs/cn/HomePage.md)** - 首页组件
- **[CommonFormPage](./docs/cn/CommonFormPage.md)** - 标准化表单页面组件

### 📊 数据展示组件

#### 📋 数据表格
- **[ListPage](./docs/cn/data-table-ListPage.md)** - 基础数据表格列表
- **[PagingListPage](./docs/cn/data-table-PagingListPage.md)** - 分页数据表格
- **[Managed ListPage](./docs/cn/data-table-managed-ListPage.md)** - 托管数据表格（自动数据获取）
- **[Managed PagingListPage](./docs/cn/data-table-managed-PagingListPage.md)** - 托管分页数据表格
- **[Dynamic PagingListPage](./docs/cn/data-table-managed-DynamicPagingListPage.md)** - 动态分页数据表格

#### 🃏 卡片列表
- **[Card ListPage](./docs/cn/card-ListPage.md)** - 基础卡片列表
- **[Card PagingListPage](./docs/cn/card-PagingListPage.md)** - 分页卡片列表
- **[Managed Card ListPage](./docs/cn/card-managed-ListPage.md)** - 托管卡片列表
- **[Managed Card PagingListPage](./docs/cn/card-managed-PagingListPage.md)** - 托管分页卡片列表

### 🏗️ 模块组件
- **[ModuleHome](./docs/cn/module-ModuleHome.md)** - 模块主页组件
- **[TabModules](./docs/cn/multiple-modules-TabModules.md)** - 基于选项卡的多模块组件

## 📄 许可证

本项目基于 MIT 许可证授权。详情请参阅 [LICENSE](LICENSE) 文件。