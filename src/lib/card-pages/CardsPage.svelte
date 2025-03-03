<script lang="ts">

    import Page from "@ticatec/uniface-element/Page";
    import Button from "@ticatec/uniface-element/Button";
    import SearchBox from "@ticatec/uniface-element/SearchBox";
    import type {FunFilter, MouseClickHandler} from "@ticatec/uniface-element";
    import utils from "@ticatec/uniface-element/utils";
    import type PageAttrs from "$lib/common/PageAttrs";
    import uniAppCtx from "$lib/common/uniAppCtx";
    import AppModule from "$lib/module/AppModule";
    import i18n from "@ticatec/uniface-element/I18nContext";
    import Separator from "@ticatec/uniface-element/Separator";


    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let onRefreshClick: MouseClickHandler;
    export let page$attrs: PageAttrs;
    export let gap: number = 8;
    export let list: Array<any> = [];
    export let filterFun: FunFilter | null = null;
    export let card: any;


    let filter: string = '';
    let filteredList: Array<any> = [];

    const closePage = (event: MouseEvent) => {
        AppModule.closeActivePage();
    }

    const doFilter = (arr: Array<any>, m: string) => {
        if (utils.isEmpty(m)) {
            filteredList = [...list];
        } else {
            filteredList = list.filter(item => filterFun?.(item, m));
        }
    }

    $: doFilter(list, filter);


</script>

<Page round={uniAppCtx.roundPage} shadow={uniAppCtx.shadowPage} title={page$attrs.title??'Title'} comment={page$attrs?.comment}
      style={page$attrs?.style??''}
      content$style="overflow: hidden;">
    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        {#if filterFun}
            <SearchBox variant="outlined" compact bind:value={filter} style="width: 240px"/>
            <Separator/>
        {/if}
        {#if onCreateNewClick}
            <Button type="third" icon="uniface-icon-plus" label={i18n.getText('uniface.appTemplate.btnCreateNew', 'Add New')} onClick={onCreateNewClick}></Button>
            <Separator/>
        {/if}

        <Button type="primary" label={i18n.getText('uniface.appTemplate.btnRefresh', 'Refresh')} onClick={onRefreshClick}></Button>
        {#if page$attrs?.canClose}
            <Button type="default" label={i18n.getText('uniface.appTemplate.btnRefresh', 'Close')} onClick={closePage}></Button>
        {/if}
    </div>

    <div style="width: 100%; height: 100%; padding: 12px; box-sizing: border-box; overflow: auto; display: flex; flex-direction: row; flex-wrap: wrap; gap: {gap}px">
        {#each filteredList as item}
            <svelte:component this={card} data={item}/>
        {/each}
    </div>

</Page>