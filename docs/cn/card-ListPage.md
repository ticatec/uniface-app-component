# 卡片视图: 非托管列表 (Unmanaged ListPage)

`card/ListPage.svelte` 组件用于在卡片式布局中显示一个完整的、不进行分页的项目列表。它直接操作数组并支持可选的客户端筛选。

## 设计目的

该组件是非托管表格 `ListPage` 的卡片版本。它适用于将客户端数据数组显示为卡片，并提供可选的客户端筛选功能。

## 工作原理
该组件是一个**UI外壳**，直接渲染您提供的数据列表。
- **您提供数据：** 您提供一个完整的数据数组给组件。
- **组件处理筛选：** 组件的搜索栏可以与筛选函数交互以执行客户端筛选。
- **自动渲染：** 系统通过 render 配置对象自动渲染卡片，无需手动循环。

## 关键依赖
-   **render 配置对象**: 用于自动渲染卡片的配置，包含 component 和 props 属性。

## 如何使用

1.  **准备您的数据和筛选函数**

    ```ts
    const allItems = [
        { id: 1, name: '产品 A', category: '电子产品' },
        { id: 2, name: '产品 B', category: '书籍' },
        { id: 3, name: '产品 C', category: '电子产品' }
    ];

    // 可选：创建客户端筛选函数
    const filterFun = (item: any, filterText: string) => {
        return item.name.toLowerCase().includes(filterText.toLowerCase()) ||
               item.category.toLowerCase().includes(filterText.toLowerCase());
    };
    ```

2.  **在您的页面中使用该组件**

    ```svelte
    <script lang="ts">
        import ListPage from '@ticatec/uniface-app-component/card/ListPage.svelte';
        import YourCardComponent from './YourCardComponent.svelte';

        let list = allItems; // 您的数据数组

        let page$attrs = {
            title: "所有产品"
        };

        // 配置 render 对象
        let render = {
            component: YourCardComponent,
            props: {} // 传递给卡片组件的额外属性
        };

        // 可选的刷新处理器
        const onRefreshClick = () => {
            // 在这里重新加载数据
        };
    </script>

    <ListPage
        {page$attrs}
        {list}
        {render}
        {filterFun}
        {onRefreshClick}
        gap={12}
    />
    ```

## 组件属性 (Props)

-   `page$attrs: PageAttrs`: 包含标题和其他页面级设置的页面属性。**(必需)**
-   `list: Array<any>`: 要显示为卡片的数据项数组。**(必需)**
-   `render: object`: 用于渲染卡片的配置对象，包含 `component` 和 `props` 属性。**(必需)**
-   `filterFun?: FunFilter`: 用于客户端筛选卡片的可选函数。
-   `onCreateNewClick?: MouseClickHandler`: "创建新项" 按钮的处理器。
-   `onRefreshClick?: MouseClickHandler`: 刷新按钮的处理器。
-   `gap?: number`: 卡片之间的间距（像素）。默认为 `12`。
-   `canBeClosed?: boolean`: 页面是否可以关闭。默认为 `false`。
-   `placeholder?: string`: 搜索输入框的占位符文本。

## 功能特性

-   基于数组的客户端数据显示
-   使用 CardListBoard 内置筛选和搜索
-   灵活的卡片布局，可配置间距
-   可自定义的操作按钮（创建新项、刷新）
-   具有可筛选页面栏的响应式设计
-   使用 render 配置自动渲染卡片