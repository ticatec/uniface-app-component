# AppModule (应用模块)

`AppModule` 类是一个单例控制器，用于管理应用中的页面栈。它旨在提供一种简单、集中的方式来处理导航和页面历史的状态。

## 设计目的

- **集中式页面管理**: 提供一个全局可访问的单一实例来控制当前活动页面的堆栈。
- **简单的堆栈式导航**: 使用 `append` 和 `pop` 方法向堆栈顶部添加页面或移除它们，非常适合于打开详情视图然后返回之类的工作流。
- **状态变更通知**: 在初始化时提供一个回调函数，当页面堆栈发生变化时，该回调函数会被触发，使您的 UI 能够相应地作出反应。

## 单例模式

`AppModule` 不能通过 `new` 直接实例化。它必须被初始化一次，然后通过静态方法获取其实例。

-   `AppModule.initialize(callback)`: 必须在您的应用启动时调用一次。
-   `AppModule.getInstance()`: 返回该单例实例。

## 基本用法

1.  **初始化 AppModule**

    在您的主应用入口（例如，根 `+layout.svelte`）中，使用一个回调函数来初始化模块。每当添加或删除页面时，此函数将接收到更新后的页面列表。

    ```ts
    // src/routes/+layout.svelte
    import { AppModule } from '@ticatec/uniface-app-component/module';

    // 初始化单例一次
    AppModule.initialize((pages) => {
        // 这个回调让您能对导航变化作出反应
        console.log('页面堆栈已更改:', pages);
    });
    ```

2.  **访问实例并显示页面**

    在应用中的任何地方，您都可以获取实例并使用其静态方法来显示或关闭页面。

    ```svelte
    <script lang="ts">
        import { AppModule } from '@ticatec/uniface-app-component/module';
        import MyNextPageComponent from './MyNextPageComponent.svelte';

        function openNewPage() {
            // 使用静态方法将新页面组件附加到堆栈中
            AppModule.showPage(MyNextPageComponent, { message: '来自前一个页面的问候' });
        }

        function goBack() {
            // 使用静态方法从堆栈中弹出当前页面
            AppModule.closeActivePage();
        }
    </script>

    <button on:click={openNewPage}>打开页面</button>
    <button on:click={goBack}>返回</button>
    ```

## API 参考

### 静态方法

-   `AppModule.initialize(onPageChange: PagesChangeListener)`: 初始化单例实例。当堆栈更改时，`onPageChange` 回调会接收到完整的页面对象数组。必须在任何其他方法之前调用。
-   `AppModule.getInstance(): AppModule`: 返回单例实例。
-   `AppModule.showPage(component: any, params: any = null)`: 一个用于向堆栈中追加新页面的静态快捷方式。这是最常用的前进导航方式。
-   `AppModule.closeActivePage()`: 一个用于从堆栈中弹出最近页面的静态快捷方式。

### 实例方法

这些方法通常不直接调用，因为静态方法提供了方便的快捷方式。

-   `append(component: any, params?: any): string`: 将一个新页面推入堆栈，并返回其唯一 ID。
-   `pop()`: 从堆栈中移除最顶部的页面。