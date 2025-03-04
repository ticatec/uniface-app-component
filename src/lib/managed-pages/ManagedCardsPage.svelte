<script lang="ts">

    import type {FunFilter, MouseClickHandler} from "@ticatec/uniface-element";
    import CommonCardsPage from "$lib/card-pages/CardsPage.svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import {onMount} from "svelte";
    import type ListDataManager from "$lib/common/ListDataManager";
    import type {PageInitialize} from "$lib/common/PageInitialize";

    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let initializeData: PageInitialize | null = null;
    export let page$attrs: PageAttrs;
    export let gap: number = 8;
    export let list: Array<any> = [];
    export let card: any;
    export let dataManager: ListDataManager;
    export let busyIndicator: string | null = null;
    export let queryParams: any = null;
    export let filterFun: FunFilter | null = null;

    const loadList = async (initialize?: boolean) => {
        window.Indicator.show(busyIndicator ?? i18n.getText('uniface.app.indicatorLoading', 'loading...'));
        try {
            if (initialize) {
                await initializeData?.();
            }
            await dataManager.loadData(queryParams);
            list = dataManager.list;
        } finally {
            window.Indicator.hide();
        }
    }
    const onRefreshClick: MouseClickHandler = async (event: MouseEvent) => {
        await loadList();
    }

    onMount(async () => {
        await loadList(true);
    })


</script>


<CommonCardsPage {onCreateNewClick} {onRefreshClick} {page$attrs} {gap} {list} {filterFun} {card}>

</CommonCardsPage>

