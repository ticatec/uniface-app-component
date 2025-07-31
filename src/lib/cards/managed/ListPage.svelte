<script lang="ts">

    import type {MouseClickHandler} from "@ticatec/uniface-element/types";
    import type {FunFilter} from "@ticatec/uniface-element/ListBox";
    import ListPage from "$lib/cards/ListPage.svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import {onMount} from "svelte";
    import type ListDataManager from "$lib/common/ListDataManager";
    import type {PageInitialize} from "$lib/common/PageInitialize";
    import CommonPage from "$lib/common/CommonPage.svelte";
    import CardListBoard from "$lib/cards/CardListBoard.svelte";
    import FilterablePageBar from "$lib/common/FilterablePageBar.svelte";
    import i18nRes from "$lib/i18nRes";


    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let initializeData: PageInitialize | null = null;
    export let page$attrs: PageAttrs;
    export let gap: number = 8;
    export let list: Array<any> = [];
    export let render: any;
    export let dataManager: ListDataManager;
    export let busyIndicator: string | null = null;
    export let queryParams: any = null;
    export let filterFun: FunFilter | null = null;

    export let canBeClosed: boolean = false;

    export let placeholder: string = '';

    let filter: string;

    const onRefreshClick: MouseClickHandler = async (event: MouseEvent) => {
        window.Indicator.show(busyIndicator ?? i18nRes.app.busyIndicator);
        try {
            await dataManager.loadData(queryParams);
            list = dataManager.list;
        } finally {
            window.Indicator.hide();
        }
    }

    onMount(async () => {
        window.Indicator.show(busyIndicator ?? i18nRes.app.busyIndicator);
        try {
            await initializeData?.();
            await dataManager.loadData(queryParams);
            list = dataManager.list;
        } finally {
            window.Indicator.hide();
        }
    })


</script>

<CommonPage page$attrs={page$attrs} content$style="overflow: hidden;" {canBeClosed}>
    <FilterablePageBar slot="header-ext" bind:filter filterable={filterFun!=null} {onCreateNewClick} {placeholder} {onRefreshClick}/>
    <CardListBoard {filterFun} filterText={filter} {list} {render} {gap} showHeader={$$slots['header']!=null}>
        <slot slot="header" name="header"/>
    </CardListBoard>
</CommonPage>



