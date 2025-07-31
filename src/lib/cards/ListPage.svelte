<script lang="ts">

    import type {MouseClickHandler} from "@ticatec/uniface-element/types";
    import type {FunFilter} from "@ticatec/uniface-element/ListBox";
    import type PageAttrs from "$lib/common/PageAttrs";
    import CommonPage from "$lib/common/CommonPage.svelte";
    import CardListBoard from "$lib/cards/CardListBoard.svelte";
    import FilterablePageBar from "$lib/common/FilterablePageBar.svelte";

    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let onRefreshClick: MouseClickHandler;
    export let page$attrs: PageAttrs;
    export let canBeClosed: boolean = false;
    export let gap: number = 12;
    export let list: Array<any> = [];
    export let filterFun: FunFilter | null = null;
    export let render: any;
    export let reload: any = null;

    let filter: string = '';
    export let placeholder: string = '';

</script>

<CommonPage page$attrs={page$attrs} content$style="overflow: hidden;" {canBeClosed} {reload}>
    <FilterablePageBar slot="header-ext" bind:filter filterable={filterFun!=null} {onCreateNewClick} {placeholder} {onRefreshClick}/>
    <CardListBoard {filterFun} filterText={filter} {list} {render} {gap} showHeader={$$slots['header']!=null}>
        <slot slot="header" name="header"/>
    </CardListBoard>

</CommonPage>