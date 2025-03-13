<script lang="ts">

    import type PageAttrs from "$lib/common/PageAttrs";
    import uniAppCtx from "$lib/common/uniAppCtx";
    import PaginationPanel, {type OnPageChange, type OnRowCountChanged} from "@ticatec/uniface-element/PaginationPanel";
    import i18n from "@ticatec/i18n";
    import {onMount, tick} from "svelte";
    import CommonPage from "$lib/common/CommonPage.svelte";
    import langRes from "$lib/i18n_resources/en_res";

    export let page$attrs: PageAttrs;
    export let canBeClosed: boolean = false;
    export let gap: number = 8;
    export let list: Array<any> = [];
    export let total: number;
    export let pageCount: number;
    export let pageNo: number;
    export let onRowCountChanged: OnRowCountChanged;
    export let onPageChange: OnPageChange;
    export let render: any;

    let cardsPanel: any;

    let isAtTop: boolean;
    let isAtBottom: boolean;
    let hasVerticalScrollbar: boolean;


    const checkScroll = async () => {
        await tick();
        if (cardsPanel) {
            hasVerticalScrollbar = cardsPanel.scrollHeight > cardsPanel.clientHeight;
            isAtTop = cardsPanel.scrollTop === 0;
            isAtBottom = cardsPanel.scrollTop + cardsPanel.clientHeight === cardsPanel.scrollHeight;
        }
    }

    $: if (cardsPanel) {
        checkScroll();
    }

    onMount(async () => {
        await checkScroll();
    });

    $: if (list) {
        checkScroll();
    }

</script>

<CommonPage page$attrs={page$attrs} content$style="overflow: hidden; display: flex; flex-direction: column" {canBeClosed}>

    <slot name="search-panel"/>
    <div class="uniface-app-cards-board">
        {#if list && list.length > 0}
            {#if render && render.component}
                <div bind:this={cardsPanel} on:scroll={checkScroll} class="content-panel" style="gap: {gap}px">
                    {#each list as item}
                        <svelte:component this={render.component} {...render.props} data={item}/>
                    {/each}
                </div>
                <div class="gradient_transparent_overlay at_top" class:hidden={!hasVerticalScrollbar || isAtTop}></div>
                <div class="gradient_transparent_overlay" class:hidden={!hasVerticalScrollbar || isAtBottom}></div>
            {/if}
        {:else }
            <div style="position:relative; height: 100%; width: 100%">
                <div style="position:relative; top: 50%; transform: translateY(-50%);">
                    <div style="width: fit-content; margin: 0 auto; font-size: 15px">
                        <span>{i18n.getText('unifaceApp.emptyDataSet', langRes.unifaceApp.emptyDataSet)}</span>
                    </div>
                </div>
            </div>
        {/if}
    </div>


    <div style="width: 100%; padding: 8px 12px; box-sizing: border-box; flex: 0 0 auto; border-top: 1px solid var(--uniface-page-divid-color, #F0F0F0)">
        <PaginationPanel {pageCount} {pageNo} {total} {onRowCountChanged} {onPageChange} generateInfo={uniAppCtx.generateInfo}
                         rowCountLabel={uniAppCtx.rowCountLabel}/>
    </div>

</CommonPage>