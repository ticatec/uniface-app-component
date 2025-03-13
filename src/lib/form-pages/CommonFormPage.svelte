<script lang="ts">

    import {type ButtonType} from "@ticatec/uniface-element/Button";
    import type PageAttrs from "$lib/common/PageAttrs";
    import type {ButtonAction, ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import ActionBar from "@ticatec/uniface-element/ActionBar";
    import i18n from "@ticatec/i18n";
    import CommonPage from "$lib/common/CommonPage.svelte";
    import type {CloseConfirm} from "$lib/common/CloseConfirm";
    import {cn_resource} from "@ticatec/uniface-element/i18n_resources"

    export let page$attrs: PageAttrs;

    export let closeConfirm: CloseConfirm | null = null;

    export let canBeClosed: boolean = true;

    export let closeType: ButtonType = 'primary';

    export let actions: ButtonActions = [];

    let buttons: ButtonActions = actions;

    let page: any;

    const btnClose: ButtonAction = {
        label: i18n.getText('uniface.btnClose', cn_resource.uniface.btnClose), type: closeType, handler: () => {
            page.closePage();
        }
    }

    $: buttons = canBeClosed ? [...actions, btnClose] : [...actions];

</script>

<CommonPage bind:this={page} page$attrs={page$attrs} {canBeClosed} {closeConfirm}>
    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        <ActionBar {buttons}/>
    </div>
    <div style="width: 100%; height: 100%; padding: 8px; overflow: auto; box-sizing: border-box;">
        <slot/>
    </div>
</CommonPage>