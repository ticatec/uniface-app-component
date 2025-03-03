<script lang="ts">

    import TabModules from "$lib/multiple-modules/TabModules.svelte";
    import ToastBoard from "@ticatec/uniface-element/ToastBoard";
    import DialogBoard from "@ticatec/uniface-element/DialogBoard";
    import IndicatorBoard from "@ticatec/uniface-element/IndicatorBoard";
    //import MessageBoxBoard from "@ticatec/uniface-element/message-box";
    import TextEditor from "@ticatec/uniface-element/TextEditor";
    import Button from "@ticatec/uniface-element/Button";


    let url: string;
    let title: string;

    const openTab = () => {
        tabModules.showPage(title, url);
    }

    let tabModules: any;

</script>
<div style="width: 100%; height: 100%; display: flex; flex-direction: column; box-sizing: border-box">
    <div style="flex: 0 0 auto; display: flex; flex-direction: row; width: 100%; padding: 12px; box-sizing: border-box; gap: 10px">
        <TextEditor variant="outlined" style="width: 200px" bind:value={title}/>
        <TextEditor variant="outlined" style="width: 400px" bind:value={url}/>
        <div>
            <Button type="primary" label="打开" onClick={openTab}/>
        </div>
    </div>
    <div style="flex: 1 1 auto; overflow: hidden; width: 100%; box-sizing: border-box; padding: 12px; background-color: #F8FAFC">
        <TabModules bind:this={tabModules}/>
    </div>
</div>

<IndicatorBoard/>
<DialogBoard/>
<ToastBoard/>
<!--<MessageBoxBoard/>-->