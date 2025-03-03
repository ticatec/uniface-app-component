<script lang="ts">

    import TextEditor from "@ticatec/uniface-element/TextEditor";

    export let criteria;
    export let field: string;

    export let variant: 'outlined' | 'filled';

    export let placeholder: string;

</script>

<TextEditor bind:value={criteria[field]} input$placeholder={placeholder} {variant}/>