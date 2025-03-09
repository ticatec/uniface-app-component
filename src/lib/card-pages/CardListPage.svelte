<script lang="ts">

    import Button from "@ticatec/uniface-element/Button";
    import SearchBox from "@ticatec/uniface-element/SearchBox";
    import type {CardAction, FunFilter, MouseClickHandler} from "@ticatec/uniface-element";
    import utils from "@ticatec/uniface-element/utils";
    import type PageAttrs from "$lib/common/PageAttrs";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import Separator from "@ticatec/uniface-element/Separator";
    import {onMount, tick} from "svelte";
    import CommonPage from "$lib/common/CommonPage.svelte";

    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let onRefreshClick: MouseClickHandler;
    export let page$attrs: PageAttrs;
    export let canBeClosed: boolean = false;
    export let gap: number = 8;
    export let list: Array<any> = [];
    export let filterFun: FunFilter | null = null;
    export let render: any;


    let filter: string = '';
    let filteredList: Array<any> = [];

    const doFilter = (arr: Array<any>, m: string) => {
        if (utils.isEmpty(m)) {
            filteredList = [...list];
        } else {
            filteredList = list.filter(item => filterFun?.(item, m));
        }
        checkScroll();
    }

    $: doFilter(list, filter);

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

<CommonPage page$attrs={page$attrs} content$style="overflow: hidden;" {canBeClosed}>
    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        {#if filterFun}
            <SearchBox variant="outlined" compact bind:value={filter} style="width: 240px"/>
            <Separator/>
        {/if}
        {#if onCreateNewClick}
            <Button type="third" icon="uniface-icon-plus" label={i18n.getText('uniface.app.btnNew', 'New')}
                    onClick={onCreateNewClick}></Button>
            <Separator/>
        {/if}

        <Button type="primary" label={i18n.getText('uniface.app.btnRefresh', 'Refresh')} onClick={onRefreshClick}></Button>
    </div>

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
                        <span>{i18n.getText('uniface.app.emptyFiltered', 'There is no data that meets the filter criteria. Please set the filter criteria again.')}</span>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</CommonPage>