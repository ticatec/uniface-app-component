<script lang="ts">

    import OptionsSelect from "@ticatec/uniface-element/OptionsSelect";

    export let criteria;
    export let field: string;
    export let variant: 'outlined' | 'filled';

    export let props: any;

</script>

<OptionsSelect bind:value={criteria[field]} {variant} {...props}/>