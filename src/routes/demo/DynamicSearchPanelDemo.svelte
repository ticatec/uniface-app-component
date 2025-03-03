<script lang="ts">

    import DynamicFilterPanel from "@ticatec/uniface-filter-panel/DynamicFilterPanel.svelte";
    import Button from "@ticatec/uniface-element/Button";
    import type {MetaCriteriaField} from "@ticatec/uniface-filter-panel/MetaCriteriaField";

    let visible: boolean = false;

    const confirmHandler = () => {
        console.log('开始查询数据....')
        visible = false;
    }
    //resetClickHandler={()=>{}} searchClickHandler={()=>{visible=true}} advancedClickHandler={()=>{visible=true}}

    let criteria: any = {};

    let fields: Array<MetaCriteriaField> = [
        {
            type: "text-editor",
            attrs: {
                field: "name"
            },
            label: "姓名",
            size: 'x15'
        },
        {
            type: "number-range",
            attrs: {
                fromField: "minAge",
                toField: "maxAge"
            },
            label: "年龄范围",
            size: 'x30',
            isAdvanced: true
        },
        {
            type: "options-select",
            attrs: {
                field: "gender",
                props: {
                    emptyText: "所有",
                    options: [
                        {code: "M", text: "男性"},
                        {code: "F", text: "女性"}
                    ]
                }

            },
            label: "性别",
            size: 'x15'
        }
    ]

    $: console.log("当前的查询条件", criteria)

</script>

<div style="width: 100%; height: 100%; padding: 12px; box-sizing: border-box; background-color: #F8FAFC">
    <DynamicFilterPanel {criteria} {fields} resetClickHandler={()=>{criteria={}}}
                        searchClickHandler={()=>{ console.log('按照当前条件查询', criteria)}}>

        <svelte:fragment slot="dynamic-action-bar">
            <Button type="third" label="新增" onClick={()=>{}}/>
            <Button type="forth" icon="uniface-icon-download" label="导出数据" onClick={()=>{}}/>
            <Button type="third" icon="uniface-icon-upload" label="批量导入" onClick={()=>{}}/>
        </svelte:fragment>
    </DynamicFilterPanel>
</div>


