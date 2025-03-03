<script lang="ts">

    import NumberRange from "@ticatec/uniface-element/NumberRange";

    export let criteria;
    export let fromField: string;

    export let variant: 'outlined' | 'filled';

    export let toField: string;


</script>

<NumberRange bind:fromValue={criteria[fromField]} bind:toValue={criteria[toField]} {variant}/>