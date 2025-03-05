# Uniface应用和页面模版组件库

Uniface 组件库是一套基于 Svelte 5 和 Uniface Element 的前端 UI 组合件库，专注于 **微前端应用管理**、**数据展示** 和 **表单管理**，提供高效、灵活的 UI 解决方案。


## **核心功能**
### 1. **微前端应用管理**
Uniface 提供 **微前端应用模块管理**，支持动态加载、路由管理、`iframe` 运行检测等特性，适用于 SaaS 平台或大型 Web 应用的独立模块开发。

#### **主要组件**
- **`AppModule`**：管理微前端应用的模块页面，支持动态加载和页面监听。[详细文件](./document/AppModule_CN)
- **`HomePage`**：用于 `iframe` 环境的微前端模块主页，支持路由和模块初始化。[详细文档](./document/HomePage_CN)

---

### 2. I18N关键字
本模版组件库支持I18N，使用前请根据应用的语言配置语言资源库，相关信息请查看uniface element中的I18N小节。

|名称| 说明               | 默认值                                                                                    |
|-----|------------------|----------------------------------------------------------------------------------------|
|uniface.app.busyIndicator| 数据读取的信息指示        | Loading data...                                                                        |
|uniface.app.btnNew| 新增按钮             | New                                                                                    |
|uniface.app.btnRefresh| 刷新按钮文字           | Refresh                                                                                |
|uniface.app.btnClose| 关闭按钮文字           | Close                                                                                  |
|uniface.app.emptyFiltered| 全量数据设置过滤后没有匹配的数据 | There is no data that meets the filter criteria. Please set the filter criteria again. |
|uniface.app.emptyDataSet| 分页查询没有符合条件的数据    | There is no data that meets the search criteria. Please set the search criteria again. |
|uniface.app.indicatorInitialing| 模块初始化            |  Loading module...                                                                                      |

---

### 3. **数据集合展示**
Uniface 提供多种 **数据展示组件**，支持 **卡片视图** 和 **表格视图**，同时支持 **全量数据** 与 **分页查询数据**，并结合 `DataManager` 进行数据自动管理。

#### **展示方式**
- **卡片方式**：
    - 全量数据卡片展示 [详细文档](./document/CardsPage_CN)
    - 分页查询数据卡片展示 [详细文档](./document/PagedCardsPage_CN)
    - 托管全量数据卡片展示 [详细文档](./document/ManagedCardsPage_CN)
    - 托管分页查询数据卡片展示 [详细文档](./document/ManagedPagedCardsPage_CN)
- **表格方式**：
    - 全量数据表格展示 [详细文档](./document/DataListTablePage_CN)
    - 分页查询数据表格展示 [详细文档](./document/PagedDataTablePage_CN)
    - 托管全量数据表格展示 [详细文档](./document/ManagedDataTablePage_CN)
    - 托管分页查询数据表格展示 [详细文档](./document/ManagedPagedDataTablePage_CN)
    - 托管动态条件分页查询数据表格展示 [详细文档](./)
---

### 4. **表单录入管理**
Uniface 提供 **表单管理组件**，适用于 **大屏表单输入**，支持 **页面级表单** 以及 **操作按钮管理**。
[详细文档](./document/CommonFormPage_CN)
#### **主要组件**
- **`CommonFormPage`**：全页面表单录入组件，支持：
    - 自适应滚动表单区域
    - 操作按钮栏（可配置 `ActionBar`）
    - 关闭按钮与关闭前确认机制
    - 页面属性传递 (`PageAttrs`)

---

## **依赖与适用场景**
### **依赖组件**
- `@ticatec/uniface-icons`
- `@ticatec/app-data-manager`
- `@ticatec/app-data-service`
- `@ticatec/uniface-element`
- `@ticatec/uniface-filter-panel`

### **适用场景**
- **微前端架构**：支持 `iframe` 运行环境，适用于 SaaS 平台或大型 Web 应用。
- **动态数据展示**：支持全量数据、分页查询，适用于数据密集型应用。
- **复杂表单管理**：适用于多步骤、长表单的管理应用。


## 贡献

欢迎提交 issue 和 pull request。

## 版权信息

Copyright © 2023 Ticatec。保留所有权利。

本类库遵循 MIT 许可证发布。有关许可证的详细信息，请参阅 [LICENSE](LICENSE) 文件。

## 联系方式

huili.f@gmail.com

https://github.com/henryfeng/filter-panel




