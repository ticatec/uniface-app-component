<script lang="ts">

    import Page from "@ticatec/uniface-element/Page";
    import {type ButtonType} from "@ticatec/uniface-element/Button";
    import uniAppCtx from "$lib/common/uniAppCtx";
    import type PageAttrs from "$lib/common/PageAttrs";
    import AppModule from "$lib/module/AppModule";
    import type {ButtonAction, ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import ActionBar from "@ticatec/uniface-element/ActionBar";
    import i18n from "@ticatec/uniface-element/I18nContext";

    export let page$attrs: PageAttrs;

    export let canClose: boolean = true;

    export let closeType: ButtonType = 'secondary';

    export let actions: ButtonActions = [];

    let buttons: ButtonActions = actions;

    const btnClose: ButtonAction = {
        label: i18n.getText('uniface.app.btnClose', 'Close'), type: closeType, handler: () => {
            AppModule.closeActivePage();
        }
    }

    $: buttons = canClose ? [...actions, btnClose] : [...actions];

</script>

<Page round={uniAppCtx.roundPage} shadow={uniAppCtx.shadowPage} title={page$attrs.title} comment={page$attrs.comment} style={page$attrs.style}>
    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        <ActionBar {buttons}/>
    </div>
    <div style="width: 100%; height: 100%; padding: 8px; overflow: auto; box-sizing: border-box;">
        <slot/>
    </div>
</Page>