# CommonFormPage (通用表单页面)

`CommonFormPage.svelte` 组件为全页式表单提供了一个标准化的布局。它旨在确保在您的整个应用中，数据录入任务都能拥有一致的用户体验。

## 设计目的

您可以使用此组件来包裹您的表单内容。它原生提供了一些关键功能：

-   **一致的布局**: 包含一个用于标题的专用页眉、一个可滚动的主内容区域，以及一个固定在底部的操作栏。
-   **操作栏 (Action Bar)**: 一个简洁、固定的操作栏，用于放置“保存”、“提交”或“取消”等操作按钮。
-   **关闭前确认**: 内置的可选功能，当用户试图关闭一个“脏”（已修改）的表单时，会弹出确认对话框，以防止意外丢失数据。
-   **易于集成**: 与标准的 HTML `<form>` 元素和 Svelte 的表单处理能力无缝协作。

## 如何使用

将您的表单元素包裹在 `CommonFormPage` 组件内。使用 `header` 和 `actions` 插槽来放置您的标题和按钮。

```svelte
<script lang="ts">
    import CommonFormPage from '@ticatec/uniface-app-component/form-pages/CommonFormPage.svelte';
    import { CloseConfirm } from '@ticatec/uniface-app-component/common';
    import Button from '@ticatec/uniface-element/Button.svelte';

    let name = '';
    let email = '';
    let isDirty = false;

    // 一个简单的“脏”检查
    $: isDirty = name !== '' || email !== '';

    function handleSave() {
        // 实现保存逻辑
        console.log('正在保存:', { name, email });
        isDirty = false; // 保存后重置“脏”状态
    }

    function handleClose() {
        // 实现关闭逻辑 (例如，导航到其他页面)
        console.log('正在关闭页面');
    }

    // 设置关闭前确认
    const closeConfirm = new CloseConfirm({
        isDirty: () => isDirty,
        onClose: handleClose
    });
</script>

<CommonFormPage {closeConfirm}>
    <div slot="header">
        <h2>创建新用户</h2>
    </div>

    <div class="form-content">
        <label for="name">名称</label>
        <input type="text" id="name" bind:value={name} />

        <label for="email">邮箱</label>
        <input type="email" id="email" bind:value={email} />
    </div>

    <div slot="actions">
        <Button on:click={handleSave} style="primary">保存用户</Button>
        <Button on:click={closeConfirm.tryClose}>关闭</Button>
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

-   `closeConfirm?: CloseConfirm`: `CloseConfirm` 辅助类的实例。如果提供此属性，将启用“您确定要关闭吗？”的功能。
-   `showActionBar?: boolean`: 是否显示底部的操作栏。默认为 `true`。
-   `showCloseButton?: boolean`: 是否在操作栏中显示默认的关闭按钮。默认为 `true`。

## 插槽 (Slots)

-   `header`: 在此放置标题或页眉内容 (例如, `<h2>我的表单</h2>`)。
-   `default`: 表单的主要内容 (例如, 输入字段、标签)。
-   `actions`: 在此放置您的操作按钮。它们将显示在底部的操作栏中。

## `CloseConfirm` 辅助类

`CloseConfirm` 类用于管理“关闭前确认”的工作流程。

`new CloseConfirm({ isDirty: () => boolean, onClose: () => void })`

-   `isDirty`: 一个函数，如果表单有未保存的更改，则返回 `true`，否则返回 `false`。每当尝试关闭时都会调用此函数。
-   `onClose`: 一个函数，在用户确认关闭或表单并非“脏”状态时执行，用于处理实际的关闭逻辑（例如，导航到另一个页面）。
