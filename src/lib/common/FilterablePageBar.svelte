<script lang="ts">

    import i18n from "@ticatec/i18n";
    import langRes from "$lib/i18n_resources/en_res";
    import Button from "@ticatec/uniface-element/Button";
    import SearchBox from "@ticatec/uniface-element/SearchBox";
    import Separator from "@ticatec/uniface-element/Separator";
    import type {MouseClickHandler} from "@ticatec/uniface-element";

    export let filter: string;
    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let onRefreshClick: MouseClickHandler;
    export let filterable: boolean = true;
</script>

<div style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
    {#if filterable}
        <SearchBox variant="outlined" compact bind:value={filter} style="width: 240px"/>
        <Separator/>
    {/if}
    {#if onCreateNewClick}
        <Button type="third" icon="uniface-icon-plus" label={i18n.getText('uniface.app.btnAddNew', langRes.uniface.app.btnAddNew)}
                onClick={onCreateNewClick}></Button>
        <Separator/>
    {/if}

    <Button type="primary" label={i18n.getText('uniface.app.btnRefresh', langRes.uniface.app.btnRefresh)} onClick={onRefreshClick}></Button>
</div>