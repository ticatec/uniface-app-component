# 托管自动分页数据表格组件

`ManagedPagedDataTablePage` 组件用于自动管理分页数据查询，并以表格形式展示数据。它支持搜索、分页管理、数据加载指示等功能。

## 特性
- **自动分页管理**：基于 `PagingDataManager` 处理分页数据查询。
- **搜索面板插槽**：允许插入自定义搜索条件。
- **数据表格展示**：使用 `PagedDataTablePage` 以表格布局渲染数据。
- **动态加载数据**：支持搜索、重置、分页跳转。
- **加载指示器**：在获取数据时显示加载状态。
- **可选操作列**：支持操作按钮列。

## 使用方法

### 导入组件
```svelte
<script lang="ts">
    import ManagedPagedDataTablePage from "@ticatec/uniface-app-component/ManagedPagedDataTablePage";
</script>
```

### 组件属性
| 属性名称 | 类型 | 描述 |
|-----------|------|-------------|
| `dataManager` | `PagingDataManager` | 负责管理分页数据加载 |
| `indicatorColumn` | `IndicatorColumn` | 指示列 |
| `columns` | `Array<DataColumn>` | 数据列 |
| `actionsColumn` | `ActionsColumn` | 操作列（可选） |
| `selectedRows` | `Array<any>` | 选中的行 |
| `list` | `Array<any>` | 要显示的数据列表 |
| `criteria` | `any` | 查询参数 |
| `page$attrs` | `PageAttrs` | 页面属性 |
| `busyIndicator` | `string \| null` | 自定义加载提示信息，可选 |
| `rowHeight` | `number` | 行高 |
| `roundTable` | `boolean` | 是否使用圆角表格 |
| `canBeClosed` | `boolean` | 是否可关闭 |

### 示例用法
```svelte
<PagedDataTablePage
    {dataManager}
    {indicatorColumn}
    {columns}
    {actionsColumn}
    {selectedRows}
    {list}
    {criteria}
    {page$attrs}
    busyIndicator="加载数据中..."
    rowHeight={40}
    roundTable={true}
    canBeClosed={false}
/>
```

## 方法
### `search()`
- 执行查询。

### `reset()`
- 重置查询条件并重新执行搜索。

## 事件处理
### `onPageChange(page: number)`
- 当页码发生变化时触发。

### `onRowCountChanged(rows: number)`
- 当每页行数发生变化时触发。

## 依赖项
该组件依赖于：
- `PagedDataTablePage`
- `PagingDataManager`
- `IndicatorColumn`
- `DataColumn`
- `ActionsColumn`
- `PageAttrs`

## 说明
- `window.Indicator` 用于显示和隐藏加载状态。
- 组件在 `onMount` 时会自动加载数据。

