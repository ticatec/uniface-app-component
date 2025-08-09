# @ticatec/uniface-app-component 中文文档

欢迎阅读 `@ticatec/uniface-app-component` 的中文文档！这个库提供了一套完整的 Svelte 组件，用于构建具有一致 UI 模式的企业级应用程序。

## 🏗️ 核心组件

### 应用结构
- [**AppModule**](./AppModule.md) - 主应用程序模块包装器
- [**HomePage**](./HomePage.md) - 标准首页布局

### 表单页面
- [**CommonFormPage**](./CommonFormPage.md) - 标准化表单页面布局，带操作栏

### 模块组件
- [**ModuleHome**](./module-ModuleHome.md) - 模块首页组件
- [**TabModules**](./multiple-modules-TabModules.md) - 基于标签的多模块容器

## 📊 数据显示组件

### 卡片视图组件
| 组件 | 类型 | 说明 |
|------|------|------|
| [**卡片 ListPage**](./card-ListPage.md) | 非托管 | 简单列表显示，支持客户端筛选 |
| [**卡片 PagingListPage**](./card-PagingListPage.md) | 非托管 | 分页列表，手动数据管理 |
| [**卡片 Managed ListPage**](./card-managed-ListPage.md) | 托管 | 自动化完整列表，集成服务层 |
| [**卡片 Managed PagingListPage**](./card-managed-PagingListPage.md) | 托管 | 自动化分页列表，集成服务层 |

### 数据表格组件
| 组件 | 类型 | 说明 |
|------|------|------|
| [**数据表格 ListPage**](./data-table-ListPage.md) | 非托管 | 简单表格显示，支持客户端筛选 |
| [**数据表格 PagingListPage**](./data-table-PagingListPage.md) | 非托管 | 分页表格，手动数据管理 |
| [**数据表格 Managed ListPage**](./data-table-managed-ListPage.md) | 托管 | 自动化完整表格，集成服务层 |
| [**数据表格 Managed PagingListPage**](./data-table-managed-PagingListPage.md) | 托管 | 自动化分页表格，集成服务层 |
| [**数据表格 Managed DynamicPagingListPage**](./data-table-managed-DynamicPagingListPage.md) | 托管 | 高级分页表格，支持动态筛选 |

## 🔧 组件类型

### 托管 vs 非托管组件

**🤖 托管组件 (Managed)**
- 自动使用 `@ticatec/app-data-service` 处理数据获取
- 使用 `DataManager` 类进行状态管理
- 内置加载状态、错误处理和分页
- 配置更少，更加固化

**👨‍💻 非托管组件 (Unmanaged)**
- 您控制数据获取和状态管理
- 更适合自定义集成
- 需要手动设置数据管理器或直接传递数据
- 配置更多，更加灵活

### 组件模式

**卡片组件**
- 使用 `render` 配置对象进行自动组件渲染
- 适用于丰富的视觉数据展示
- 支持可配置间距的灵活布局

**数据表格组件**
- 使用 `@ticatec/uniface-element/DataTable` 和 `DataColumn` 类型
- 适用于结构化的表格数据
- 支持行选择、排序和操作

## 📚 关键依赖

- **`@ticatec/uniface-element`** - 基础 UI 组件 (DataTable, ActionBar 等)
- **`@ticatec/app-data-service`** - 数据服务类 (PagingDataService, FullListDataService)
- **`@ticatec/app-data-manager`** - 数据管理类 (PagedDataManager, FullListDataManager)

## 🚀 快速开始

1. 安装包及其依赖
2. 选择适当的组件类型（托管 vs 非托管）
3. 对于卡片组件，准备您的卡片组件和 `render` 配置
4. 对于表格组件，定义您的 `DataColumn` 配置
5. 设置您的 `page$attrs` 以获得一致的页面级设置

## 🌐 其他语言

- [English Documentation](../en/README.md) - 英文文档

---

有关整个项目的更多详细信息，请参阅[主 README](../../README.md)。