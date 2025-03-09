<script lang="ts">


    import uniAppCtx from "$lib/common/uniAppCtx";
    import Page from "@ticatec/uniface-element/Page";
    import type PageAttrs from "$lib/common/PageAttrs";
    import AppModule from "../module/AppModule";
    import type {CloseConfirm} from "$lib/common/CloseConfirm";

    export let page$attrs: PageAttrs;
    export let content$style: string = '';
    export let canBeClosed: boolean;
    export let closeConfirm: CloseConfirm | null = null;

    export const closePage = async (event: MouseEvent) => {
        if (closeConfirm == null || await closeConfirm()) {
            AppModule.closeActivePage();
        }
    }

</script>

<Page round={uniAppCtx.roundPage} shadow={uniAppCtx.shadowPage} title={page$attrs.title??'Title'} comment={page$attrs?.comment}
      style={page$attrs?.style??''} content$style={content$style}>
    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        <slot name="header-ext">

        </slot>
        {#if canBeClosed}
            <div style="flex: 0 0 auto; padding-left: 12px">
                <i class="uniface-icon-x page-action-button" aria-hidden="true" on:click={closePage}></i>
            </div>
        {/if}
    </div>

    <slot></slot>
</Page>