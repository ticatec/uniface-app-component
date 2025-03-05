# 分页查询页面组件



`PagedDataTablePage` 是一个常规的分页查询页面组件，适用于显示和管理分页数据。页面上部包含查询条件面板和操作按钮区，中间是数据表格，底部是分页指示器。

## 组件功能
- **查询条件面板**：支持通过 `slot` 插入自定义查询条件。
- **数据表格**：使用 `DataTable` 组件展示数据，支持选择行和操作列。
- **分页控制**：使用 `PaginationPanel` 组件实现分页。
- **可关闭页面**：支持 `canBeClosed` 属性，允许关闭当前页面。

## 使用方法

### 导入组件
```svelte
<script lang="ts">
    import PagedDataTablePage from "./PagedDataTablePage.svelte";
    import type { DataColumn, IndicatorColumn, ActionsColumn } from "@ticatec/uniface-element";
</script>
```

### 组件属性
| 属性名 | 类型 | 说明 |
|--------|------|------|
| `indicatorColumn` | `IndicatorColumn` | 数据指示列，用于空数据提示等 |
| `columns` | `Array<DataColumn>` | 数据表格列定义 |
| `actionsColumn` | `ActionsColumn \| null` | 操作列，可选 |
| `selectedRows` | `Array<any>` | 绑定当前选中的行 |
| `list` | `Array<any>` | 数据列表 |
| `total` | `number` | 总数据量 |
| `pageCount` | `number` | 总页数 |
| `pageNo` | `number` | 当前页码 |
| `onRowCountChanged` | `OnRowCountChanged` | 行数变化回调 |
| `onPageChange` | `OnPageChange` | 页码变化回调 |
| `page$attrs` | `PageAttrs` | 页面属性 |
| `canBeClosed` | `boolean` | 是否可关闭，默认为 `false` |
| `roundTable` | `boolean` | 是否显示圆角表格 |
| `rowHeight` | `number` | 行高 |

### 示例代码
```svelte
<PagedDataTablePage
    {indicatorColumn}
    {columns}
    {actionsColumn}
    bind:selectedRows
    {list}
    {total}
    {pageCount}
    {pageNo}
    {onRowCountChanged}
    {onPageChange}
    {page$attrs}
    canBeClosed={true}
    roundTable={true}
    rowHeight={40}
>
    <div slot="search-panel">自定义查询条件</div>
</PagedDataTablePage>
```

## 事件处理
### `onRowCountChanged`
- 触发时机：行数发生变化时。
- 回调参数：新的行数。

### `onPageChange`
- 触发时机：分页发生变化时。
- 回调参数：新的页码。

## 依赖
该组件依赖以下 `@ticatec/uniface-element` 组件：
- `DataTable`
- `PaginationPanel`
- `Box`
- `I18nContext`

## 备注
- `indicatorColumn.emptyIndicator` 默认值为 `"There is no data that meets the search criteria. Please set the search criteria again."`，如果未设置，会自动填充默认文本。
- 该组件适用于 `Svelte` 框架，并与 `@ticatec/uniface-element` 组件库集成。

