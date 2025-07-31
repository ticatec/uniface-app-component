<script lang="ts">

    import type PageAttrs from "$lib/common/PageAttrs";
    import PaginationPanel, {type OnPageChange, type OnRowCountChanged} from "@ticatec/uniface-element/PaginationPanel";
    import CommonPage from "$lib/common/CommonPage.svelte";
    import CardListBoard from "$lib/cards/CardListBoard.svelte";
    import utils from "$lib/common/utils";
    import i18nRes from "$lib/i18nRes";

    export let page$attrs: PageAttrs;
    export let canBeClosed: boolean = false;
    export let gap: number = 12;
    export let list: Array<any> = [];
    export let total: number;
    export let pageCount: number;
    export let pageNo: number;
    export let onRowCountChanged: OnRowCountChanged;
    export let onPageChange: OnPageChange;
    export let render: any;

</script>

<CommonPage page$attrs={page$attrs} content$style="overflow: hidden; display: flex; flex-direction: column" {canBeClosed}>
    <CardListBoard {render} {gap} {list} showHeader={$$slots['search-panel']}>
        <slot name="search-panel" slot="header"/>
        <div slot="footer" style="width: 100%; padding: 8px 12px; box-sizing: border-box; flex: 0 0 auto; border-top: 1px solid var(--uniface-page-divid-color, #F0F0F0)">
            <PaginationPanel {pageCount} {pageNo} {total} {onRowCountChanged} {onPageChange} generateInfo={utils.generateInfo}
                             rowCountLabel={i18nRes.app.rowCountLabel}/>
        </div>
    </CardListBoard>
</CommonPage>