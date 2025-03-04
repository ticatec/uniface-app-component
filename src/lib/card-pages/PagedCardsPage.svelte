<script lang="ts">

    import Page from "@ticatec/uniface-element/Page";
    import Button from "@ticatec/uniface-element/Button";
    import type PageAttrs from "$lib/common/PageAttrs";
    import uniAppCtx from "$lib/common/uniAppCtx";
    import AppModule from "$lib/module/AppModule";
    import PaginationPanel, {type OnPageChange, type OnRowCountChanged} from "@ticatec/uniface-element/PaginationPanel";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import Box from "@ticatec/uniface-element/Box";
    import {onMount, tick} from "svelte";

    export let page$attrs: PageAttrs;
    export let gap: number = 8;
    export let list: Array<any> = [];
    export let total: number;
    export let pageCount: number;
    export let pageNo: number;
    export let onRowCountChanged: OnRowCountChanged;
    export let onPageChange: OnPageChange;
    export let card: any;

    const closePage = (event: MouseEvent) => {
        AppModule.closeActivePage();
    }

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

    onMount(async ()=> {
        await checkScroll();
    });

    $: if (list) {
        checkScroll();
    }

</script>

<Page round={uniAppCtx.roundPage} shadow={uniAppCtx.shadowPage} title={page$attrs.title??'Title'} comment={page$attrs?.comment}
      style={page$attrs?.style??''}
      content$style="overflow: hidden; display: flex; flex-direction: column">
    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        {#if page$attrs?.canClose}
            <Button type="default" label={i18n.getText('uniface.appTemplate.btnClose', "Close")} onClick={closePage}></Button>
        {/if}
    </div>

    <slot name="search-panel"/>
    <div class="uniface-app-cards-board">
        <div bind:this={cardsPanel} on:scroll={checkScroll} class="content-panel" style="gap: {gap}px">
            {#each list as item}
                <svelte:component this={card} data={item}/>
            {/each}
        </div>
        <div class="gradient_transparent_overlay at_top" class:hidden={!hasVerticalScrollbar || isAtTop} ></div>
        <div class="gradient_transparent_overlay" class:hidden={!hasVerticalScrollbar || isAtBottom} ></div>
    </div>


    <div style="width: 100%; padding: 8px 12px; box-sizing: border-box; flex: 0 0 auto; border-top: 1px solid var(--uniface-page-divid-color, #F0F0F0)">
        <PaginationPanel {pageCount} {pageNo} {total} {onRowCountChanged} {onPageChange} generateInfo={uniAppCtx.generateInfo}
                         rowCountLabel={uniAppCtx.rowCountLabel}/>
    </div>

</Page>