<script lang="ts">

    import type MetaCriteriaField from "$lib/filter-panel/MetaCriteriaField";
    import FilterPanel from "./FilterPanel.svelte";
    import CriteriaField from "@ticatec/uniface-element/CriteriaField";
    import AdvancedFilterPanel from "./AdvancedFilterPanel.svelte";
    import type {MouseClickHandler} from "@ticatec/uniface-element";
    import CriteriaComponents from "$lib/filter-panel/filter-component/CriteriaComponents";
    import FullscreenOverlay from "@ticatec/uniface-element/FullscreenOverlay";
    import UnknowTypeCriteria from "$lib/filter-panel/filter-component/UnknowTypeCriteria.svelte";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";

    export let criteria: any = {};

    export let fields: Array<MetaCriteriaField> = [];

    export let resetClickHandler: MouseClickHandler;
    export let searchClickHandler: MouseClickHandler;

    export let actions: ButtonActions = [];
    export let variant: 'outlined' | 'filled' = 'outlined';

    export let advancedCriteriaTitle: string = 'More'

    let cmpMgr = CriteriaComponents.getInstance();

    let list: Array<MetaCriteriaField> = [];

    export let style: string = "";
    export let advStyle: string = "";

    const advancedClickHandler = () => {
        showAdvanced = true;
    };

    let showAdvanced: boolean = false;

    let hasAdvanced: boolean = false;

    const getFieldComponent = (type: string) => {
        return cmpMgr.get(type) ?? UnknowTypeCriteria;
    }

    const advancedSearchClickHandler = (event: MouseEvent) => {
        searchClickHandler?.(event);
        showAdvanced = false;
    }


    $: if (fields) {
        list = [];
        hasAdvanced = false;
        fields.forEach(field => {
            field.component = field.component ?? getFieldComponent(field.type);
            list.push(field);
            if (field.isAdvanced) {
                hasAdvanced = true
            }
        });
    }

</script>

<FilterPanel {style} {resetClickHandler} {searchClickHandler} {actions} advancedClickHandler={hasAdvanced ? advancedClickHandler : null}>
    {#each list as field}
        {#if !field.isAdvanced}
            <CriteriaField label={field.label} size={field.size}>
                <svelte:component this={field.component} {...field.attrs} {criteria} {variant}/>
            </CriteriaField>
        {/if}
    {/each}
</FilterPanel>
{#if showAdvanced}
    <FullscreenOverlay bind:visible={showAdvanced}>
        <AdvancedFilterPanel style={advStyle} closeHandler={()=>{showAdvanced = false}}
                             confirmHandler={advancedSearchClickHandler} title={advancedCriteriaTitle}>
            {#each list as field}
                <CriteriaField label={field.label} size={field.size}>
                    <svelte:component this={field.component} {...field.attrs} {criteria} {variant}/>
                </CriteriaField>
            {/each}
        </AdvancedFilterPanel>
    </FullscreenOverlay>
{/if}