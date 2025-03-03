<script lang="ts">

    import Button, {TextButton} from "@ticatec/uniface-element/Button";
    import type {MouseClickHandler} from "@ticatec/uniface-element";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import type {ButtonAction, ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import ActionBar from "@ticatec/uniface-element/ActionBar";
    import {onMount} from "svelte";

    export let style: string = "";
    export let resetClickHandler: MouseClickHandler;
    export let searchClickHandler: MouseClickHandler;
    export let advancedClickHandler: MouseClickHandler | null = null;

    export let actions: ButtonActions = [];

    let panelActions: ButtonActions = [];

    let resetAction: ButtonAction = {
        label: i18n.getText('uniface.appTemplates.btnReset', 'Reset'),
        type: 'default',
        handler: resetClickHandler
    }

    let searchAction: ButtonAction = {
        type: "primary",
        label: i18n.getText('uniface.appTemplates.btnSearch', 'Search'),
        handler: searchClickHandler
    }

    $: if (actions.length > 0) {
        panelActions = [...actions, null, resetAction, searchAction]
    } else {
        panelActions = [resetAction, searchAction]
    }

</script>
<div {style} class="uniface-filter-panel uniface-quick-filter-panel">
    <div class="filter-container">
        <div>
            <slot></slot>
        </div>
    </div>
    <div class="panel-footer">
        {#if advancedClickHandler}
            <div style="flex: 1 1 auto">
                <TextButton type="primary" label={i18n.getText('uniface.appTemplates.btnMoreCriteria', 'More Criteria')}
                            onClick={advancedClickHandler}/>
            </div>
        {/if}
        <ActionBar buttons={panelActions}/>
    </div>
</div>