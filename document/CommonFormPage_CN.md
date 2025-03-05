

## CommonFormPage - 全页面表单录入页面

`CommonFormPage` 组件是一个用于表单内容录入的基础页面，提供了页面结构、操作按钮栏及可选的关闭按钮。

## 特性
- **表单容器**：适用于大屏表单输入，内容区域支持自适应滚动。
- **操作按钮栏**：可配置 `ActionBar`，包含操作按钮。
- **可选关闭按钮**：可选择是否显示“关闭”按钮，并定义关闭按钮的样式。
- **关闭确认**：支持关闭前确认操作。
- **页面属性支持**：可传入 `PageAttrs` 进行页面配置。

## 使用方法

### 基本用法
```svelte
<CommonFormPage {page$attrs} {canBeClosed} {closeConfirm} closeType="danger" actions={customActions}>
    <form>
        <label>用户名:</label>
        <input type="text" placeholder="输入用户名" />
    </form>
</FullFormPage>
```

## API 参考

### 组件属性
| 属性名称 | 类型 | 默认值 | 描述 |
|----------|------|--------|------|
| `page$attrs` | `PageAttrs` | - | 页面属性配置 |
| `closeConfirm` | `CloseConfirm \| null` | `null` | 关闭前确认 |
| `canBeClosed` | `boolean` | `true` | 是否允许关闭页面 |
| `closeType` | `ButtonType` | `'primary'` | 关闭按钮类型，如 `primary`、`danger` 等 |
| `actions` | `ButtonActions` | `[]` | 操作按钮列表 |

### 事件
- **`closePage()`**: 触发关闭页面操作。

## 适用场景
- 用于需要全页面布局的表单录入页面。
- 适用于表单较多、交互复杂的应用场景。

该组件提供灵活的按钮配置、可选的关闭确认机制，使其适用于多种业务需求的表单录入页面。
