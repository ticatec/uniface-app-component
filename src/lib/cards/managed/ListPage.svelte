<script lang="ts">

    import type {FunFilter, MouseClickHandler} from "@ticatec/uniface-element";
    import ListPage from "$lib/cards/ListPage.svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import i18n from "@ticatec/i18n";
    import {onMount} from "svelte";
    import type ListDataManager from "$lib/common/ListDataManager";
    import type {PageInitialize} from "$lib/common/PageInitialize";
    import langRes from "$lib/i18n_resources/en_res";
    import CommonPage from "$lib/common/CommonPage.svelte";
    import CardListBoard from "$lib/cards/CardListBoard.svelte";
    import FilterablePageBar from "$lib/common/FilterablePageBar.svelte";

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

    let filter: string;

    const onRefreshClick: MouseClickHandler = async (event: MouseEvent) => {
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', langRes.uniface.app.busyIndicator));
        try {
            await dataManager.loadData(queryParams);
            list = dataManager.list;
        } finally {
            window.Indicator.hide();
        }
    }

    onMount(async () => {
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.busyIndicator', langRes.uniface.app.busyIndicator));
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
    <FilterablePageBar slot="header-ext" bind:filter filterable={filterFun!=null} {onCreateNewClick} {onRefreshClick}/>
    <CardListBoard {filterFun} filterText={filter} {list} {render} {gap} showHeader={$$slots['header']!=null}>
        <slot slot="header" name="header"/>
    </CardListBoard>
</CommonPage>



