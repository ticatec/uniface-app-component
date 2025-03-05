

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
