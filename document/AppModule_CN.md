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