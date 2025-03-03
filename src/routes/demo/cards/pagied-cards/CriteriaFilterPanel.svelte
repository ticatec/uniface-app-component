<script lang="ts">

    import FilterPanel from "@ticatec/uniface-filter-panel";
    import type {MouseClickHandler} from "@ticatec/uniface-element";
    import CriteriaField from "@ticatec/uniface-element/CriteriaField";
    import TextEditor from "@ticatec/uniface-element/TextEditor";
    import OptionsSelect from "@ticatec/uniface-element/OptionsSelect";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";

    export let resetClickHandler: MouseClickHandler;
    export let searchClickHandler: MouseClickHandler;

    export let actions: ButtonActions;

    export let criteria;

    let genders = [
        {code: 'M', text: '男性'},
        {code: 'F', text: '女性'}
    ]

</script>

<FilterPanel {actions} {resetClickHandler} {searchClickHandler} style="padding: 0 12px; border-radius: 0; border-bottom: 1px solid var(--uniface-page-divid-color, #F0F0F0)">
    <CriteriaField size="x20" label="姓名">
        <TextEditor variant="outlined" bind:value={criteria.name}/>
    </CriteriaField>
    <CriteriaField size="x20" label="性别">
        <OptionsSelect variant="outlined" bind:value={criteria.gender} options={genders} emptyText="所有" />
    </CriteriaField>

</FilterPanel>