<script lang="ts">

    import type {FunFilter} from "@ticatec/uniface-element/ListBox";
    import utils from "@ticatec/uniface-element/utils";
    import {onMount, tick} from "svelte";
    import i18nRes from "$lib/i18nRes";


    export let gap: number = 12;
    export let list: Array<any> = [];
    export let filterFun: FunFilter | null = null;
    export let render: any;
    export let filterText: string | null = null;
    export let showHeader: boolean = true;

    let filteredList: Array<any> = list;

    const doFilter = (arr: Array<any>, text: string|null) => {
        text = (text ?? '').trim();
        if (utils.isEmpty(text) || filterFun == null || !arr) {
            filteredList = [...arr];
        } else {
            filteredList = arr.filter(item => filterFun?.(item, text));
        }
        checkScroll();
    }

    $: doFilter(list, filterText)

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

</script>

<div class="common-page-container">
    {#if $$slots.header && showHeader}
        <div class="card_board_header">
            <slot name="header"/>
        </div>
    {/if}
    <div class="uniface-app-cards-board">
        {#if filteredList.length > 0 && render && render.component}
            <div bind:this={cardsPanel} on:scroll={checkScroll} class="content-panel" style="gap: {gap}px">
                {#each filteredList as item}
                    <svelte:component this={render.component} {...render.props} data={item}/>
                {/each}
            </div>
            <div class="gradient_transparent_overlay at_top" class:hidden={!hasVerticalScrollbar || isAtTop}></div>
            <div class="gradient_transparent_overlay" class:hidden={!hasVerticalScrollbar || isAtBottom}></div>
        {:else }
            <div style="position:relative; height: 100%; width: 100%">
                <div style="position:relative; top: 50%; transform: translateY(-50%);">
                    <div style="width: fit-content; margin: 0 auto; font-size: 15px">
                        <span>{i18nRes.app.emptyFiltered}</span>
                    </div>
                </div>
            </div>
        {/if}
    </div>
    {#if $$slots.footer}
        <div class="card_board_footer">
            <slot name="footer"/>
        </div>
    {/if}
</div>
