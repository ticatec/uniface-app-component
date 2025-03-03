<script lang="ts">

    import Page from "@ticatec/uniface-element/page";
    import Button, {ButtonBar} from "@ticatec/uniface-element/button";
    import SearchBox from "@ticatec/uniface-element/search-box";
    import SearchPanelDemo from "./SearchPanelDemo.svelte";
    import DynamicCriteriaPageDemo from "./DynamicCriteriaPageDemo.svelte";
    import CardsDemoPage from "./cards/CardsDemoPage.svelte";
    import AppModule from "$lib/module/AppModule";

    let filter: string = '';

    const handleButtonClick = () => {
        AppModule.showPage(CardsDemoPage);
    }

    const handleButtonClick1 = () => {
        AppModule.showPage(SearchPanelDemo);
    }

    const handleButtonClick2 = () => {
        AppModule.showPage(DynamicCriteriaPageDemo, {});
    }
</script>

<Page round title="急救病人管理" comment="病人转轨数据">
    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        <ButtonBar rightDivide>
            <SearchBox variant="outlined" compact bind:value={filter} style="width: 240px"/>
        </ButtonBar>
        <ButtonBar>
            <Button type="primary" label="刷新" onClick={handleButtonClick}></Button>
            <Button type="primary" label="查询" onClick={handleButtonClick1}></Button>
            <Button type="primary" label="动态查询" onClick={handleButtonClick2}></Button>
        </ButtonBar>
    </div>
    <div style="width: 100%; height: 100%; padding: 8px; box-sizing: border-box; overflow: auto">
        <div style="margin: 0 auto; background-color: #1e648d; height: 800px; width: 500px">

        </div>
    </div>
</Page>