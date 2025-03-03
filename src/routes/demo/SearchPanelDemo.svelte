<script lang="ts">

    import FilterPanel, {AdvancedFilterPanel} from "$lib/filter-panel";
    import FullscreenOverlay from "@ticatec/uniface-element/common/FullscreenOverlay";
    import Button from "@ticatec/uniface-element/button";
    import CriteriaField from "@ticatec/uniface-element/criteria-field";
    import TextEditor from "@ticatec/uniface-element/text-editor";
    import DateRangeEditor from "@ticatec/uniface-element/date-range";

    let visible: boolean = false;

    const confirmHandler = () => {
        console.log('开始查询数据....')
        visible = false;
    }

    let criteria:any = {};

    $: console.log("当前的查询条件", criteria)

</script>

<div style="width: 100%; height: 100%; padding: 12px; box-sizing: border-box; background-color: #F8FAFC">
    <FilterPanel resetClickHandler={()=>{}} searchClickHandler={()=>{visible=true}} advancedClickHandler={()=>{visible=true}} advancedLabel="展开更多" resetLabel="重置" searchLabel="查询">
        <CriteriaField label="姓名" size="x20">
            <TextEditor bind:value={criteria.name} variant="outlined"/>
        </CriteriaField>
        <CriteriaField label="性别" size="x20">
            <TextEditor bind:value={criteria.name} variant="outlined"/>
        </CriteriaField>
        <CriteriaField label="入园日期" size="x25">
            <DateRangeEditor bind:fromValue={criteria.from} bind:toValue={criteria.to} variant="outlined"/>
        </CriteriaField>
        <CriteriaField label="姓名" size="x40">
            <TextEditor bind:value={criteria.name} variant="outlined"/>
        </CriteriaField>
        <CriteriaField label="姓名" size="x20">
            <TextEditor bind:value={criteria.name} variant="outlined"/>
        </CriteriaField>
        <CriteriaField label="姓名" size="x20">
            <TextEditor bind:value={criteria.name} variant="outlined"/>
        </CriteriaField>
        <svelte:fragment slot="action-bar">
            <Button type="third" label="新增" onClick={()=>{}}/>
            <Button type="forth" icon="uniface-icon-download" label="导出数据" onClick={()=>{}}/>
            <Button type="third" icon="uniface-icon-upload" label="批量导入" onClick={()=>{}}/>
        </svelte:fragment>
    </FilterPanel>
</div>

<FullscreenOverlay bind:visible>
    <AdvancedFilterPanel title="更多" closeHandler={()=>{visible=false}} {confirmHandler}>
        <CriteriaField label="姓名" size="x20">
            <TextEditor bind:value={criteria.name} variant="outlined"/>
        </CriteriaField>
        <CriteriaField label="性别" size="x20">
            <TextEditor bind:value={criteria.name} variant="outlined"/>
        </CriteriaField>
        <CriteriaField label="入园日期" size="x25">
            <DateRangeEditor bind:fromValue={criteria.from} bind:toValue={criteria.to} variant="outlined"/>
        </CriteriaField>
        <CriteriaField label="姓名" size="x40">
            <TextEditor bind:value={criteria.name} variant="outlined"/>
        </CriteriaField>
        <CriteriaField label="姓名" size="x20">
            <TextEditor bind:value={criteria.name} variant="outlined"/>
        </CriteriaField>
        <CriteriaField label="姓名" size="x20">
            <TextEditor bind:value={criteria.name} variant="outlined"/>
        </CriteriaField>
    </AdvancedFilterPanel>
</FullscreenOverlay>

