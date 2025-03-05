# 常规分页查询页面

`CommonDataTablePage` 组件用于以表格形式显示分页数据集合，支持搜索、刷新和行选择。

## 特性
- **搜索面板插槽**：允许插入自定义搜索条件。
- **数据表格展示**：使用 `CommonDataTablePage` 以表格布局渲染数据。
- **分页管理**：支持更改页码和调整每页行数。
- **数据管理**：使用 `FullListDataManager` 处理数据查询。
- **加载指示器**：在获取数据时显示加载状态。
- **可选操作列**：支持操作按钮列。

## 使用方法

### 导入组件
```svelte
<script lang="ts">
    import DataTablePage from "./DataTablePage.svelte";
    import type { FullListDataManager } from "@ticatec/app-data-manager";
    import type { FullListDataService } from "@ticatec/app-data-service";
</script>
```

### 组件属性
| 属性名称 | 类型 | 描述 |
|-----------|------|-------------|
| `dataManager` | `FullListDataManager<FullListDataService>` | 负责管理数据加载 |
| `indicatorColumn` | `IndicatorColumn` | 指示列 |
| `columns` | `Array<DataColumn>` | 数据列 |
| `actionsColumn` | `ActionsColumn` | 操作列（可选） |
| `selectedRows` | `Array<any>` | 选中的行 |
| `list` | `Array<any>` | 要显示的数据列表 |
| `queryParams` | `any` | 查询参数 |
| `onCreateNewClick` | `MouseClickHandler` | 新建按钮点击事件 |
| `filterFun` | `FunFilter \| null` | 过滤函数 |
| `page$attrs` | `PageAttrs` | 页面属性 |
| `busyIndicator` | `string \| null` | 自定义加载提示信息，可选 |
| `rowHeight` | `number` | 行高 |
| `roundTable` | `boolean` | 是否使用圆角表格 |

### 示例用法
```svelte
<DataTablePage
    {dataManager}
    {indicatorColumn}
    {columns}
    {actionsColumn}
    {selectedRows}
    {list}
    {queryParams}
    {onCreateNewClick}
    {filterFun}
    {page$attrs}
    busyIndicator="加载数据中..."
    rowHeight={40}
    roundTable={true}
/>
```

## 方法
### `loadList()`
- 加载数据列表。

## 事件处理
### `onRefreshClick()`
- 触发数据刷新。

## 依赖项
该组件依赖于：
- `CommonDataTablePage`
- `FullListDataManager`
- `FullListDataService`

## 说明
- `window.Indicator` 用于显示和隐藏加载状态。

