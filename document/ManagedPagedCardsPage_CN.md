# 托管分页卡片展示组件

本组件是一个基于 Svelte 的托管分页卡片展示组件，提供数据分页、查询、重置功能，并支持自定义卡片组件。

## 功能特性

- **分页管理**：自动处理分页数据，包括页码变化和行数调整。
- **数据查询**：支持 `search` 方法执行查询，并可传递筛选条件 `criteria`。
- **数据重置**：提供 `reset` 方法重置查询条件，并重新加载数据。
- **自定义卡片**：支持传入自定义 `card` 组件用于展示数据项。
- **动态数据管理**：基于 `PagingDataManager` 进行分页数据管理。

## 依赖

- `@ticatec/uniface-element`
- `svelte`
- `PagingDataManager`
- `PagedCardsPage`

## 组件参数
| 参数名                                       | 类型        |说明|
|-------------------------------------------|-----------|-----|
| page$attrs| PageAttrs |页面属性（标题、样式、是否可关闭等） | 
| gap|number|卡片之间的间距，默认 8px                 |
| list|Array<any>|需要展示的数据列表                 |
| card|any|用于渲染每个数据项的 Svelte 组件             |
| dataManager|PagingDataManager|负责分页数据管理的实例| 
| busyIndicator| string \| null|	加载数据时的指示文本（可选）|
|criteria| any       |查询条件（可用于数据筛选）|

## 组件方法
- `reset()`
```ts
async function reset()
```
**作用**：重置查询条件，并重新加载数据。
- `search()`
```ts
async function search()
```
**作用**：根据当前 criteria 查询数据，并更新列表。
## 事件处理
- `onPageChange(page: number)`
**作用**：当用户切换分页时，重新加载对应页的数据。
- `onRowCountChanged(rows: number)`
**作用**：当用户更改每页显示行数时，更新分页数据。

## 插槽
|插槽名	|说明|
|------|------|
|search-panel|可扩展的搜索面板|

## 使用示例
```sveltehtml
<script lang="ts">

    import TenantManager from "./TenantManager";
    import GroupCard from "./TenantCard.svelte";
    import ManagedPagedCardsPage from "$lib/managed-pages/ManagedPagedCardsPage.svelte";
    import CriteriaFilterPanel from "./CriteriaFilterPanel.svelte";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";

    const dataMgr = new TenantManager();

    let page$attrs = {
        title: "托管卡片页面演示"
    };

    let list: Array<any> = [];
    let cardPage: any;

    const onCreateNewClick = () => {

    }

    let criteria: any = {}

    const doResetSearch = async () => {
        cardPage.reset();
    }

    const doSearch = async () => {
        cardPage.search()
    }

    const saveCallback = (data: any, isNew: boolean) => {

    }

    const addNewRole = () => {
        let data = {};
        
    }

    let actions: ButtonActions = [
        {label: '新增', type: 'primary', handler: addNewRole}
    ]


    $: console.log('数据列表', cardPage);
</script>

<ManagedPagedCardsPage bind:this={cardPage} dataManager={dataMgr} bind:list page$attrs="{page$attrs}" card={GroupCard} bind:criteria {onCreateNewClick} >
    <CriteriaFilterPanel bind:criteria  slot="search-panel" {actions} resetClickHandler={doResetSearch} searchClickHandler={doSearch}/>
</ManagedPagedCardsPage>

```


