# Uniface应用和页面模版组件库

Uniface页面模版组件库是为了简化微前端开发，把一些常用的页面进行了封装，开发人员可以通过简单的传递参数就可以构建前端应用。

本模版组件库支持I18N，使用前请根据应用的语言配置语言资源库，相关信息请查看uniface element中的I18N小节。

## I18N关键字

|名称| 说明               | 默认值                                                                                    |
|-----|------------------|----------------------------------------------------------------------------------------|
|uniface.app.busyIndicator| 数据读取的信息指示        | Loading data...                                                                        |
|uniface.app.btnNew| 新增按钮             | New                                                                                    |
|uniface.app.btnRefresh| 刷新按钮文字           | Refresh                                                                                |
|uniface.app.btnClose| 关闭按钮文字           | Close                                                                                  |
|uniface.app.emptyFiltered| 全量数据设置过滤后没有匹配的数据 | There is no data that meets the filter criteria. Please set the filter criteria again. |
|uniface.app.emptyDataSet| 分页查询没有符合条件的数据    | There is no data that meets the search criteria. Please set the search criteria again. |
|uniface.app.indicatorInitialing| 模块初始化            |  Loading module...                                                                                      |



## AppModule - 微前端应用模块管理器

`AppModule` 是一个用于管理微前端应用中的模块页面的工具类，提供动态页面管理能力，包括新增、删除页面，并支持监听页面变化。

### 特性
- **单例模式**：确保整个应用只有一个 `AppModule` 实例。
- **动态页面管理**：支持添加和移除模块页面。
- **页面变更监听**：在页面变化时触发回调函数。
- **全局访问**：提供静态方法操作模块页面。

### 安装与使用
`AppModule` 作为微前端应用的一部分，可直接引入并使用。

#### 1. 初始化 `AppModule`

在应用启动时，调用 `initialize` 方法，传入一个回调函数 `onPageChange`，当页面列表发生变化时，该回调函数会被触发。

```ts
import AppModule from "@ticatec/uniface-app-component/AppModule";

let pages: Array<any> = []

const onPagesChange = (list: Array<ModulePage>) => {
    pages = [...list];
    console.log(pages)
}

AppModule.initialize(onPagesChange);
```

#### 2. 获取 `AppModule` 实例

```ts
const appModule = AppModule.getInstance();
```

#### 3. 添加新页面

调用 `showPage` 方法，可以新增一个页面。

```ts
import MyComponent from "./MyComponent.svelte";

AppModule.showPage(MyComponent, { id: 123 });
```

#### 4. 关闭当前活动页面

```ts
AppModule.closeActivePage();
```

#### 5. 手动管理页面

如果需要手动管理 `AppModule`，可以使用 `append` 和 `pop` 方法。

```ts
const pageId = appModule.append(MyComponent, { title: "Demo" });
console.log("新增页面ID:", pageId);

// 移除最后一个页面
appModule.pop();
```

### API 参考

#### `AppModule.initialize(onPageChange: PagesChangeListener): void`
初始化 `AppModule`，必须在应用启动时调用。

#### `AppModule.getInstance(): AppModule`
获取 `AppModule` 单例实例。

#### `AppModule.showPage(component: any, params?: any): void`
添加新页面，并传递组件及其参数。

#### `AppModule.closeActivePage(): void`
关闭当前活动页面（移除最后一个页面）。

#### `append(component: any, params?: any): string`
手动添加页面，返回页面 ID。

#### `pop(): void`
移除当前模块的最后一个页面。

### 适用场景
- 适用于 **微前端架构** 的前端应用。
- 需要 **动态管理页面** 的 Svelte 应用。
- 需要 **提供模块化页面管理** 的 SPA（单页应用）。

## 微前端模块主页

本项目是一个用于开发嵌入 `iframe` 的微前端模块主页的框架。它提供了一套基础结构，用于管理微前端模块的加载、路由注册、样式应用以及 `iframe` 环境检测。

### 特性

- **自动检测 `iframe` 运行环境**：确保模块正确运行于 `iframe` 中，若未嵌入 `iframe`，则展示 `NotInFramePage` 提示页面。
- **模块化路由管理**：支持基于 `routes` 对象的页面动态加载。
- **模块初始化**：可传入 `initializeModule` 进行模块级初始化。
- **全局 UI 组件**：包含 `IndicatorBoard`、`DialogBoard`、`ToastBoard`、`MessageBoxBoard` 等全局 UI 组件，便于消息提示与交互。
- **自定义样式支持**：可通过 `style` 变量传入全局样式。
- **加载状态管理**：确保 `window.Indicator` 初始化完成后再渲染模块主页。


### 使用示例

```svelte
<script lang="ts">
    import HomePage from "@ticatec/uniface-app-component/HomePage";
    import type { PageLoader } from "@ticatec/uniface-app-component";
    import type { ModuleInitialize } from "@ticatec/uniface-app-component";
    
    let routes: Record<string, PageLoader> = {
        "/home": () =>  import("./pages/Home.svelte"),
        "/about": () => import("./pages/About.svelte"),
    };
    
    let initializeModule: ModuleInitialize = async () => {
        console.log("模块初始化...");
    };
</script>

<MicroFrontendModule {routes} {initializeModule} style="background-color: #f5f5f5;" />
```

### 组件属性

| 属性名称 | 类型 | 描述 |
|----------|------|------|
| `routes` | `Record<string, PageLoader>` | 路由映射表，定义模块内页面加载方式 |
| `initializeModule` | `ModuleInitialize` | 模块初始化函数（可选） |
| `style` | `string` | 传入的自定义 CSS 样式字符串 |

### 运行环境检测

- 该脚手架会检测是否运行于 `iframe` 内。
- 若 `window.frameElement === null`，则渲染 `NotInFramePage` 提示。
- 仅在 `iframe` 内部，才会渲染 `ModuleHome` 并加载 `routes`。

### 依赖的全局 UI 组件

- `IndicatorBoard`：加载指示器
- `DialogBoard`：对话框管理
- `ToastBoard`：消息通知
- `MessageBoxBoard`：消息弹窗

### 说明

本脚手架适用于嵌入 `iframe` 的微前端架构，可用于 SaaS 平台或大型 Web 应用中的独立模块开发。

## 数据集合展示页面

该组件库提供两种数据展示方式：
1. **卡片方式**：以卡片布局展示数据。
2. **表格方式**：以表格布局展示数据。

每种展示方式都支持 **全量数据展示** 和 **带查询的分页数据展示**。
此外，该组件库还提供 **数据自动管理** 机制，通过连接 `DataManager` 进行客户端数据全周期管理。`DataManager`相关文档请参考 [@ticatec/app-data-manager](https://github.com/henryfeng/app-data-manager)

模版包括：

1. **全量数据卡片展示模版** [详细文档](./document/CardsPage.md)
2. **分页查询数据卡片展示模版** [详细文档](./document/PagedCardsPage.md)
3. **托管全量数据卡片展示模版** [详细文档](./document/ManagedCardsPage.md)
4. **托管分页查询数据卡片展示模版** [详细文档](./document/ManagedPagedCardsPage.md)
5. **全量数据表格展示模版** [详细文档](./document/DataListTablePage.md)
6. **分页查询数据表格展示模版** [详细文档](./document/PagedDataTablePage.md)
7. **托管全量数据表格展示模版** [详细文档](./document/ManagedDataTablePage.md)
8. **托管分页查询数数据表格展示模版** [详细文档](./document/ManagedPagedDataTablePage.md)
9. **托管动态条件分页查询数数据表格展示模版** [详细文档](./)


## CommonFormPage - 全页面表单录入页面

`CommonFormPage` 组件是一个用于表单内容录入的基础页面，提供了页面结构、操作按钮栏及可选的关闭按钮。

## 特性
- **表单容器**：适用于大屏表单输入，内容区域支持自适应滚动。
- **操作按钮栏**：可配置 `ActionBar`，包含操作按钮。
- **可选关闭按钮**：可选择是否显示“关闭”按钮，并定义关闭按钮的样式。
- **关闭确认**：支持关闭前确认操作。
- **页面属性支持**：可传入 `PageAttrs` 进行页面配置。

## 使用方法

### 基本用法
```svelte
<CommonFormPage {page$attrs} {canBeClosed} {closeConfirm} closeType="danger" actions={customActions}>
    <form>
        <label>用户名:</label>
        <input type="text" placeholder="输入用户名" />
    </form>
</FullFormPage>
```

## API 参考

### 组件属性
| 属性名称 | 类型 | 默认值 | 描述 |
|----------|------|--------|------|
| `page$attrs` | `PageAttrs` | - | 页面属性配置 |
| `closeConfirm` | `CloseConfirm \| null` | `null` | 关闭前确认 |
| `canBeClosed` | `boolean` | `true` | 是否允许关闭页面 |
| `closeType` | `ButtonType` | `'primary'` | 关闭按钮类型，如 `primary`、`danger` 等 |
| `actions` | `ButtonActions` | `[]` | 操作按钮列表 |

### 事件
- **`closePage()`**: 触发关闭页面操作。

## 适用场景
- 用于需要全页面布局的表单录入页面。
- 适用于表单较多、交互复杂的应用场景。

该组件提供灵活的按钮配置、可选的关闭确认机制，使其适用于多种业务需求的表单录入页面。

