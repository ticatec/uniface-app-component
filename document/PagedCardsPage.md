# Paginated Card List Component

这是一个基于 Svelte 的分页卡片列表组件，支持分页显示数据，并提供关闭按钮和可扩展的搜索面板插槽。

## 功能特性

- **分页显示**：使用 `PaginationPanel` 组件支持分页功能。
- **数据列表展示**：以卡片形式展示传入的数据列表。
- **操作按钮**：
    - 关闭（可选）
- **滚动检测**：自动检查滚动状态，控制顶部和底部渐变遮罩的显示。
- **可扩展搜索面板**：提供 `slot="search-panel"` 允许用户自定义搜索区域。

## 依赖

该组件依赖于 `@ticatec/uniface-element` 及 `svelte` 生态系统中的部分工具：

- `Page`
- `Button`
- `PaginationPanel`
- `Box`
- `i18n`
- `onMount`
- `tick`

## 组件参数
|参数名|类型|说明|
|-----|-----|-----|
|page$attrs|PageAttrs|页面属性（标题、样式、是否可关闭等）|
|gap|number|卡片之间的间距，默认 8px|
|list|Array<any>|需要展示的数据列表|
|total|number|数据总条数|
|pageCount|number|总页数|
|pageNo|number|当前页码|
|onRowCountChanged|OnRowCountChanged|行数变更回调|
|onPageChange|OnPageChange|页码变更回调|
|card|any|用于渲染每个数据项的 Svelte 组件|

## 插槽
|插槽名	|说明|
|------|------|
|search-panel|可扩展的搜索面板|

## 使用示例
```sveltehtml
<script lang="ts">
  import PaginationCardsPage from "$lib/card-pages/PagedCardsPage.svelte";
  import utils from "@ticatec/uniface-element/utils";
  import RoleCard from "../common-cards/RoleCard.svelte";
  import CriteriaFilterPanel from "./CriteriaFilterPanel.svelte";
  import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";
  import RoleDetailPanel from "../common-cards/RoleDetailPanel.svelte";

  let page$attrs = {
    title: "卡片页面演示"
  };

  const onRefreshClick = async () => {
    window.Indicator.show('刷新数据...');
    await utils.sleep(3);
    window.Indicator.hide();
  }

  let roles = [
    {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
    {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
    {name: "运维人员"},
    {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
    {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
    {name: "运维人员"},
    {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
    {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
    {name: "运维人员"},
    {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
    {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
    {name: "运维人员"},
    {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
    {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
    {name: "运维人员"},
    {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
    {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
    {name: "运维人员"},
    {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
    {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
    {name: "运维人员"},
    {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
    {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
    {name: "运维人员"},
    {name: "系统管理员", note: "可以管理整个平台，权利极大，慎用！"},
    {name: "租户管理员", note: "管理租户内的资源，包括权限分配，通常用于租户的系统管理，分配时请注意"},
    {name: "运维人员"}
  ]

  const onCreateNewClick = () => {

  }

  let total: number = 500;
  let pageCount: number = 10;
  let pageNo: number = 5;

  const onRowCountChanged = async (rows: number) => {
    window.Indicator.show('刷新数据...');
    await utils.sleep(3);
    window.Indicator.hide();
  }

  const onPageChange = async (no: number) => {
    window.Indicator.show('刷新数据...');
    await utils.sleep(3);
    window.Indicator.hide();
    pageNo = no;
  }

  let criteria: any = {}

  const doResetSearch = async () => {
    criteria = {};
    window.Indicator.show('刷新数据...');
    await utils.sleep(3);
    window.Indicator.hide();
    pageNo = 1;
  }

  const doSearch = async () => {
    criteria = {};
    window.Indicator.show('刷新数据...');
    await utils.sleep(3);
    window.Indicator.hide();
    pageNo = 1;
  }

  const saveCallback = (data: any, isNew: boolean) => {

  }

  const addNewRole = () => {
    let data = {};
    window.Dialog.showModal(RoleDetailPanel, {saveCallback, data})
  }

  let actions: ButtonActions = [
    {label: '新增', type: 'primary', handler: addNewRole}
  ]

</script>

<PaginationCardsPage {total} {onPageChange} {onRowCountChanged} {pageCount} {pageNo} list={roles} page$attrs={page$attrs} {onRefreshClick}
                     card={RoleCard} {onCreateNewClick}>
  <CriteriaFilterPanel bind:criteria slot="search-panel" {actions} resetClickHandler={doResetSearch} searchClickHandler={doSearch}/>
</PaginationCardsPage>

```