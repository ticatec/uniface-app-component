<script lang="ts">

    import MessageBoxBoard from "@ticatec/uniface-element/MessageBox";
    import ToastBoard from "@ticatec/uniface-element/ToastBoard";
    import DialogBoard from "@ticatec/uniface-element/DialogBoard";
    import IndicatorBoard from "@ticatec/uniface-element/IndicatorBoard";
    import {onMount} from "svelte";
    import ModuleHome from "$lib/module/ModuleHome.svelte";
    import type {PageLoader} from "$lib/module";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import type {InitializeData} from "$lib/common/InitializeData";
    import NotFramePage from "$lib/common/NotFramePage.svelte";

    export let routes: Record<string, PageLoader>;
    export let initialize: InitializeData | null = null;

    export let style: string = ''

    let initialized: boolean = false;

    let inFrame = window.frameElement !== null;

    onMount(async () => {
        window.Indicator.show(i18n.getText('uniapp.loadingIndicator', 'Loading...'));
        try {
            await initialize?.();
            initialized = true;
        } catch (ex) {
            //TODO show Error page
        } finally {
            window.Indicator.hide();
        }
    })

</script>
{#if inFrame}
    <ModuleHome {routes} {style}>

    </ModuleHome>
    <IndicatorBoard/>
    <DialogBoard/>
    <ToastBoard/>
    <MessageBoxBoard/>
{:else }
    <NotFramePage/>
{/if}