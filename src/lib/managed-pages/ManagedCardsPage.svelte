<script lang="ts">

    import type {FunFilter, MouseClickHandler} from "@ticatec/uniface-element";
    import CommonCardsPage from "$lib/card-pages/CardsPage.svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import {onMount} from "svelte";
    import type ListDataManager from "$lib/common/ListDataManager";
    import type {InitializeData} from "$lib/common/InitializeData";

    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let initializeData: InitializeData | null = null;
    export let page$attrs: PageAttrs;
    export let gap: number = 8;
    export let list: Array<any> = [];
    export let card: any;
    export let dataManager: ListDataManager;
    export let busyIndicator: string | null = null;
    export let queryParams: any = null;
    export let filterFun: FunFilter | null = null;

    export const loadList = async () => {
        window.Indicator.show(busyIndicator??i18n.getText('uniapp.text.loading', 'loading...'));
        try {
            await dataManager.loadData(queryParams);
            list = dataManager.list;
        } finally {
            window.Indicator.hide();
        }
    }
    const onRefreshClick: MouseClickHandler = async (event: MouseEvent) => {
        try {
            await initializeData?.();
            await loadList();
        } catch (ex) {

        }
    }

    onMount(async ()=>{
        await loadList();
    })


</script>


<CommonCardsPage {onCreateNewClick} {onRefreshClick} {page$attrs} {gap} {list} {filterFun} {card}>

</CommonCardsPage>

