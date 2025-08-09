# CommonFormPage (通用表单页面)

`CommonFormPage.svelte` 组件为全页式表单提供了一个标准化的布局。它基于 `CommonPage` 构建，并提供了表单专用的操作栏和关闭确认功能。

## 设计目的

您可以使用此组件来包裹您的表单内容。它原生提供了一些关键功能：

-   **一致的布局**: 使用 `CommonPage` 提供的标准页面布局，包含标题栏和可滚动的主内容区域
-   **内置操作栏 (Action Bar)**: 自动在页面顶部显示操作按钮，包含您定义的自定义按钮和可选的关闭按钮
-   **关闭前确认**: 内置的可选功能，当用户试图关闭表单时，会调用确认函数以防止意外丢失数据
-   **易于集成**: 与标准的 HTML `<form>` 元素和 Svelte 的表单处理能力无缝协作

## 如何使用

将您的表单元素包裹在 `CommonFormPage` 组件内，并通过 `page$attrs` 设置页面标题和其他属性。

```svelte
<script lang="ts">
    import CommonFormPage from '@ticatec/uniface-app-component/form-pages/CommonFormPage.svelte';
    import type { ButtonActions } from '@ticatec/uniface-element/ActionBar';

    let name = '';
    let email = '';
    let isDirty = false;

    // 一个简单的"脏"检查
    $: isDirty = name !== '' || email !== '';

    // 页面属性
    let page$attrs = {
        title: "创建新用户",
        comment: "填写用户基本信息"
    };

    // 定义操作按钮
    const actions: ButtonActions = [
        {
            label: '保存用户',
            type: 'primary',
            handler: handleSave
        },
        {
            label: '重置',
            type: 'secondary', 
            handler: handleReset
        }
    ];

    function handleSave() {
        // 实现保存逻辑
        console.log('正在保存:', { name, email });
        isDirty = false; // 保存后重置"脏"状态
    }

    function handleReset() {
        name = '';
        email = '';
        isDirty = false;
    }

    // 设置关闭前确认
    const closeConfirm = async (): Promise<boolean> => {
        if (isDirty) {
            return confirm('您有未保存的更改，确定要关闭吗？');
        }
        return true;
    };
</script>

<CommonFormPage 
    {page$attrs} 
    {actions} 
    {closeConfirm}
    canBeClosed={true}
    closeType="secondary"
>
    <div class="form-content">
        <label for="name">名称</label>
        <input type="text" id="name" bind:value={name} />

        <label for="email">邮箱</label>
        <input type="email" id="email" bind:value={email} />
    </div>
</CommonFormPage>

<style>
    .form-content {
        padding: 1rem;
        display: grid;
        gap: 1rem;
    }
</style>
```

## 组件属性 (Props)

-   `page$attrs: PageAttrs`: 页面属性，包含标题和其他页面级设置。**(必需)**
-   `closeConfirm?: CloseConfirm | null`: 关闭确认函数。当用户试图关闭页面时调用，返回 `Promise<boolean>` 以确定是否允许关闭。默认为 `null`。
-   `canBeClosed?: boolean`: 是否可以关闭页面。如果为 `true`，将在操作栏中显示关闭按钮。默认为 `true`。
-   `closeType?: ButtonType`: 关闭按钮的类型（如 'primary', 'secondary'）。默认为 `'primary'`。
-   `actions?: ButtonActions`: 要在操作栏中显示的自定义操作按钮数组。默认为空数组。

## 插槽 (Slots)

-   `default`: 表单的主要内容（例如，输入字段、标签）。这些内容将显示在带有滚动功能的主内容区域中。

## CloseConfirm 类型

`CloseConfirm` 是一个异步函数类型，用于处理关闭确认逻辑：

```ts
type CloseConfirm = () => Promise<boolean>
```

-   **返回值**: 返回 `Promise<boolean>`，其中 `true` 表示允许关闭，`false` 表示取消关闭
-   **用途**: 在用户试图关闭页面时调用，用于检查是否有未保存的更改并提示用户确认

## PageAttrs 接口

页面属性接口定义：

```ts
interface PageAttrs {
    title: string;        // 页面标题（必需）
    comment?: string;     // 标题注解（可选）
    style?: string;       // 自定义CSS样式（可选）
}
```

## 功能特性

-   基于 `CommonPage` 的标准页面布局
-   内置 `ActionBar` 组件用于显示操作按钮
-   自动管理关闭按钮的显示和行为
-   支持异步关闭确认机制
-   可滚动的内容区域，适合长表单
-   与现有的页面系统集成良好