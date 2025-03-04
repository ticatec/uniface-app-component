<script lang="ts">

    import MessageBoxBoard from "@ticatec/uniface-element/MessageBox";
    import ToastBoard from "@ticatec/uniface-element/ToastBoard";
    import DialogBoard from "@ticatec/uniface-element/DialogBoard";
    import IndicatorBoard from "@ticatec/uniface-element/IndicatorBoard";
    import {onMount, tick} from "svelte";
    import ModuleHome from "$lib/module/ModuleHome.svelte";
    import type {PageLoader} from "$lib/module";
    import type {ModuleInitialize} from "$lib/common/ModuleInitialize";
    import NotInFramePage from "$lib/common/NotInFramePage.svelte";

    export let routes: Record<string, PageLoader>;
    export let initializeModule: ModuleInitialize = null as unknown as ModuleInitialize;

    export let style: string = ''

    let inFrame = window.frameElement !== null;

    let loaded: boolean = false;

    onMount(async () => {
        while (!window.Indicator) {
            await tick();
        }
        loaded = true;
    })

</script>
{#if inFrame}
    {#if loaded}
        <ModuleHome {routes} {style} {initializeModule}>

        </ModuleHome>
    {/if}
    <IndicatorBoard/>
    <DialogBoard/>
    <ToastBoard/>
    <MessageBoxBoard/>
{:else }
    <NotInFramePage/>
{/if}