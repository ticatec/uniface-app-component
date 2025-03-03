<script lang="ts">

    import Button from "@ticatec/uniface-element/Button";
    import Icon from "@ticatec/uniface-element/Icon";
    import { fly } from "svelte/transition";
    import i18n from "@ticatec/uniface-element/I18nContext";

    export let title: string = "More";

    export let style: string = '';

    export let closeHandler: (event: MouseEvent) => void;
    export let confirmHandler: (event: MouseEvent) => void;


</script>
<div {style} class="uniface-filter-panel uniface-advanced-filter-panel" on:click|stopPropagation aria-hidden="true" transition:fly={{ x: 300, duration: 300 }}>
    <div>
        <div class="panel-header">
            <div style="flex: 1 1 auto; padding: 0 12px;">
                <span>{title}</span>
            </div>
            <div style="flex: 0 0 auto; margin-right: 12px">
                <Icon name="uniface-icon-x" onClick={closeHandler}/>
            </div>
        </div>
        <div class="filter-container">
            <div>
                <slot></slot>
            </div>
        </div>
        <div class="panel-footer">
            <Button type="default" label={i18n.getText('uniface.appTemplate.btnCancel', 'Cancel')} onClick={closeHandler}/>
            <Button type="primary" label={i18n.getText('uniface.appTemplate.btnSearch', 'Search')} onClick={confirmHandler}/>
        </div>
    </div>
</div>