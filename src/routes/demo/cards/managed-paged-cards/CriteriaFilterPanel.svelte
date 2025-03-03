<script lang="ts">

    import FilterPanel from "@ticatec/uniface-filter-panel";
    import type {MouseClickHandler} from "@ticatec/uniface-element";
    import CriteriaField from "@ticatec/uniface-element/CriteriaField";
    import TextEditor from "@ticatec/uniface-element/TextEditor";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";

    export let resetClickHandler: MouseClickHandler;
    export let searchClickHandler: MouseClickHandler;

    export let actions: ButtonActions;

    export let criteria;


</script>

<FilterPanel {actions} {resetClickHandler} {searchClickHandler} style="padding: 0 12px; border-radius: 0; border-bottom: 1px solid var(--uniface-page-divid-color, #F0F0F0)">
    <CriteriaField size="x20" label="编码">
        <TextEditor variant="outlined" bind:value={criteria.code} input$placeholder="*替代所有字符"/>
    </CriteriaField>
    <CriteriaField size="x20" label="名称">
        <TextEditor variant="outlined" bind:value={criteria.name} input$placeholder="*替代所有字符" />
    </CriteriaField>

</FilterPanel>