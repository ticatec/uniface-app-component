<script lang="ts">

    import type {FunFilter, MouseClickHandler} from "@ticatec/uniface-element";
    import ListPage from "$lib/cards/ListPage.svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import i18n from "@ticatec/i18n";
    import {onMount} from "svelte";
    import type ListDataManager from "$lib/common/ListDataManager";
    import type {PageInitialize} from "$lib/common/PageInitialize";
    import langRes from "$lib/i18n_resources/en_res";

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

    const loadList = async (initialize?: boolean) => {
        window.Indicator.show(busyIndicator ?? i18n.getText('unifaceApp.busyIndicator', langRes.unifaceApp.busyIndicator));
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


<ListPage {onCreateNewClick} {onRefreshClick} {page$attrs} {gap} {list} {filterFun} {render} {canBeClosed}>

</ListPage>

