<script lang="ts">
    import CommonFormPage from "$lib/form-pages/CommonFormPage.svelte";
    import {ModuleResult, type MouseClickHandler} from "@ticatec/uniface-element";
    import FormContainer, {Row, CellField} from "@ticatec/uniface-element/FlexRowForm";
    import TextEditor from "@ticatec/uniface-element/TextEditor";
    import OptionsSelect from "@ticatec/uniface-element/OptionsSelect";
    import DatePicker from "@ticatec/uniface-element/DatePicker";
    import CardsDemoPage from "../cards/CardsDemoPage.svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import AppModule from "$lib/module/AppModule";

    let onSaveClick: MouseClickHandler = async (event: MouseEvent) => {
        AppModule.showPage(CardsDemoPage);
    };


    let data: any = {};

    let cardTypes = [
        {
            code: '0',
            text: '身份证'
        },
        {
            code: '1',
            text: '护照'
        },
        {
            code: '2',
            text: '港澳通行证'
        },
        {
            code: '3',
            text: '台湾回乡证'
        }
    ]

    const closeConfirm = async () => {
        return await window.MessageBox.showConfirm('数据尚未保存，确定退出？', "关闭确认") == ModuleResult.MR_OK;
    }

    let  page$attrs: PageAttrs = {
        title: '卒中患者列表',
        canClose: true
    }

    $:console.log(data);
</script>
<CommonFormPage  page$attrs={page$attrs}  {onSaveClick} {closeConfirm}>
    <FormContainer>
        <Row>
            <CellField span={3} label="姓名" required>
                <TextEditor variant="filled" bind:value={data.name}></TextEditor>
            </CellField>
            <CellField span={3} label="证件类型" required>
                <OptionsSelect variant="filled" options={cardTypes} bind:value={data.idCardType}></OptionsSelect>
            </CellField>
            <CellField span={3} label="证件号码" required>
                <TextEditor variant="filled" bind:value={data.cardNo}></TextEditor>
            </CellField>
            <CellField span={3} label="出生日期" required>
                <DatePicker variant="filled" bind:value={data.dob}></DatePicker>
            </CellField>
        </Row>
        <Row>
            <CellField span={12} label="地址">
                <TextEditor variant="filled" bind:value={data.name}></TextEditor>
            </CellField>
        </Row>
    </FormContainer>
</CommonFormPage>