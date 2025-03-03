<script lang="ts">


    import {onMount} from "svelte";
    import type {ButtonAction, ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import {ModuleResult} from "@ticatec/uniface-element";
    import FormContainer, {CellField, Row} from "@ticatec/uniface-element/FlexRowForm";
    import TextEditor from "@ticatec/uniface-element/TextEditor";
    import OptionsSelect from "@ticatec/uniface-element/OptionsSelect";
    import MemoEditor from "@ticatec/uniface-element/MemoEditor";

    export let saveCallback: any;

    export let dialog;

    export let data: any;

    export let title: string = '角色管理';

    let btnSave: ButtonAction = {
        label: 'Save', type: 'primary', disabled: true, handler: async () => {
            await saveData()
        }
    };
    export let actions: ButtonActions;

    export const closeAction = {
        label: 'Discard', type: "secondary"
    }

    export const closeConfirm = async (): Promise<boolean> => {
        if (JSON.stringify(data) != oldData) {
            return await window.MessageBox.showConfirm('Data has been changed, are you sure to discard the changes?', 'Discard changes', false, 'warning') == ModuleResult.MR_OK;
        } else {
            return true
        }
    }

    let oldData: string;

    onMount(async () => {
        oldData = JSON.stringify(data);
        actions = [btnSave];
    })

    const saveData = async () => {
        saveCallback?.(data);
        oldData = JSON.stringify(data);
        dialog.close();
    }

    const modeList = [
        {code: '0', text: '私有'},
        {code: '1', text: '共享'},
    ]


    $: if (oldData && data) {
        btnSave.disabled = oldData == JSON.stringify(data);
        actions = [btnSave];
    }


</script>

<div style="width: 480px; height: auto; padding: 12px; box-sizing: border-box;">
    <FormContainer>
        <Row>
            <CellField span={4} label="编码" required>
                <TextEditor variant="filled" bind:value={data.code}/>
            </CellField>
            <CellField span={4} label="名称" required>
                <TextEditor variant="filled" bind:value={data.name}/>
            </CellField>
            <CellField span={4} label="类型" required>
                <OptionsSelect variant="filled" bind:value={data.mode} options={modeList}/>
            </CellField>
        </Row>
        <Row>
            <CellField span={12} label="备注">
                <MemoEditor variant="filled" bind:value={data.note} maxLength="{300}" showIndicator="{true}"/>
            </CellField>
        </Row>
    </FormContainer>
</div>
