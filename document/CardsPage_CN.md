# Card List Page

这是一个基于 Svelte 的组件，用于以卡片的方式展示数据，并提供搜索、刷新和新增功能。

## 功能特性

- **数据列表展示**：以卡片形式展示传入的数据列表。
- **搜索过滤**：支持根据自定义过滤函数进行搜索。
- **操作按钮**：
    - 新增（可选）
    - 刷新
    - 关闭（可选）
- **滚动检测**：自动检查滚动状态，控制顶部和底部渐变遮罩的显示。

## 依赖

该组件依赖于 `@ticatec/uniface-element` 及 `svelte` 生态系统中的部分工具：

- `Page`
- `Button`
- `SearchBox`
- `Separator`
- `i18n`
- `utils`
- `onMount`
- `tick`

## 组件参数

|参数名| 	类型	                          |说明|
|---|-------------------------------|---|
|onCreateNewClick| MouseClickHandler   |新增按钮的点击回调（可选）|
|onRefreshClick| MouseClickHandler|刷新按钮的点击回调|
|page$attrs| PageAttrs |页面属性（标题、样式、是否可关闭等）|
|gap| number|卡片之间的间距，默认 8px|
|list| Array<any> |需要展示的数据列表|
|filterFun| FunFilter \| null	|过滤函数，定义搜索逻辑| 
|card|any|用于渲染每个数据项的 Svelte 组件|

## 示例代码

```sveltehtml
<script lang="ts">
    import CardList from './CardList.svelte';
    import Card from './Card.svelte';

    let data = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
    ];

    const filterFunction = (item, keyword) => {
        return item.name.toLowerCase().includes(keyword.toLowerCase());
    };

    const handleCreateNew = () => {
        console.log("Create New Clicked");
    };

    const handleRefresh = () => {
        console.log("Refresh Clicked");
    };
</script>

<CardList
    list={data}
    filterFun={filterFunction}
    onCreateNewClick={handleCreateNew}
    onRefreshClick={handleRefresh}
    card={Card}
/>

```

## 样式

组件内部提供了基础样式，若需自定义，可通过 style 属性或外部 CSS 进行修改。例如：