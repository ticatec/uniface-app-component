<script lang="ts">

    import CriteriaField from "@ticatec/uniface-element/CriteriaField";
    import TextEditor from "@ticatec/uniface-element/TextEditor";


    export let criteria;


</script>


<CriteriaField size="x20" label="编码">
    <TextEditor variant="outlined" bind:value={criteria.code} input$placeholder="*替代所有字符"/>
</CriteriaField>
<CriteriaField size="x20" label="名称">
    <TextEditor variant="outlined" bind:value={criteria.name} input$placeholder="*替代所有字符"/>
</CriteriaField>
<CriteriaField size="x20" label="地区">
    <TextEditor variant="outlined" bind:value={criteria.region} input$placeholder="*替代所有字符"/>
</CriteriaField>