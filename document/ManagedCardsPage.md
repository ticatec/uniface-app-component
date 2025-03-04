# 分页卡片组件

这是一个基于 Svelte 的分页卡片组件，支持动态数据加载、筛选、分页和刷新操作，适用于各种数据展示场景。

## 功能特性

- **分页显示**：基于 `CommonCardsPage` 组件，实现分页功能。
- **动态数据加载**：支持异步加载数据，并提供加载指示器。
- **数据管理**：使用 `ListDataManager` 统一管理数据。
- **筛选功能**：支持自定义筛选逻辑 `filterFun`。
- **刷新功能**：提供刷新按钮，支持 `initializeData` 重新加载数据。
- **可扩展卡片组件**：用户可以传入自定义 `card` 组件，定义卡片样式。

## 依赖

- `@ticatec/uniface-element`
- `svelte`
- `ListDataManager`
- `ModuleInitialize`
- `CommonCardsPage`

## 组件参数
|参数名| 类型                             |说明|
|----|--------------------------------|----|
|onCreateNewClick| MouseClickHandler              |"创建新项" 按钮点击事件|
|initializeData| PageInitialize \| null       |初始化数据方法 |
|page$attrs| PageAttrs  |页面属性（标题、样式、是否可关闭等）|
|gap|number|卡片之间的间距，默认 8px|
|list|Array<any>|需要展示的数据列表|
|card|any|用于渲染每个数据项的 Svelte 组件|
|dataManager|ListDataManager|负责管理数据的实例|
|busyIndicator| 	string \| null	|加载数据时的指示文本（可选） |
|queryParams| any                            |查询参数（可用于数据筛选）|
|filterFun| FunFilter \| null	             |数据筛选函数（可选） |

## 使用示例

```sveltehtml
<script lang="ts">
    import DynamicPaginatedCardList from './DynamicPaginatedCardList.svelte';
    import Card from './Card.svelte';
    import ListDataManager from '$lib/common/ListDataManager';

    let dataManager = new ListDataManager();
    let queryParams = { category: 'all' };

    const handleCreateNew = () => {
        console.log("Create new item");
    };

    const initializeData = async () => {
        console.log("Initializing data...");
    };
</script>

<DynamicPaginatedCardList
    onCreateNewClick={handleCreateNew}
    initializeData={initializeData}
    page$attrs={{ title: "Card List Page" }}
    gap={10}
    card={Card}
    dataManager={dataManager}
    queryParams={queryParams}
/>

```