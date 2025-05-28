<script lang="ts">


    import uniAppCtx from "$lib/common/uniAppCtx";
    import Page from "@ticatec/uniface-element/Page";
    import type PageAttrs from "$lib/common/PageAttrs";
    import AppModule from "../module/AppModule";
    import type {CloseConfirm} from "$lib/common/CloseConfirm";
    import SidebarLayout from "@ticatec/uniface-element/app-layout/SidebarLayout";

    export let page$attrs: PageAttrs;
    export let content$style: string = '';
    export let canBeClosed: boolean;
    export let closeConfirm: CloseConfirm | null = null;

    export const closePage = async (event: MouseEvent) => {
        if (closeConfirm == null || await closeConfirm()) {
            AppModule.closeActivePage();
        }
    }
    console.log("page-sidebar", $$slots['sidebar'])
</script>

<Page round={uniAppCtx.roundPage} shadow={uniAppCtx.shadowPage} title={page$attrs.title??'Title'} comment={page$attrs?.comment}
      style={page$attrs?.style??''} content$style="width: 100; height: 100%; box-sizing: border-box; display: flex; flex-direction: row">
    {#if $$slots['sidebar']}
        <div style="height: 100%; flex: 0 0 auto; overflow: hidden;">
            <slot name="sidebar"/>
        </div>
    {/if}
    <div style="height: 100%; flex: 1 1 auto; overflow: hidden; {content$style}">
        <slot></slot>
    </div>

    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        <slot name="header-ext">

        </slot>
        {#if canBeClosed}
            <div style="flex: 0 0 auto; padding-left: 12px">
                <i class="icon_google_clear page-action-button" aria-hidden="true" on:click={closePage}></i>
            </div>
        {/if}
    </div>
</Page>