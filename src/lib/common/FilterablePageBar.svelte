<script lang="ts">

    import Button from "@ticatec/uniface-element/Button";
    import SearchBox from "@ticatec/uniface-element/SearchBox";
    import Separator from "@ticatec/uniface-element/Separator";
    import type {MouseClickHandler} from "@ticatec/uniface-element/types";
    import i18nRes from "$lib/i18nRes/i18nRes";

    export let filter: string;
    export let onCreateNewClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let onRefreshClick: MouseClickHandler;
    export let filterable: boolean = true;

    export let placeholder: string = '';

</script>

<div style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
    {#if filterable}
        <SearchBox variant="outlined" compact bind:value={filter} {placeholder} style="width: 240px"/>
        <Separator/>
    {/if}
    {#if onCreateNewClick}
        <Button type="third" icon="icon_google_add" label={i18nRes.app.btnAddNew}
                onClick={onCreateNewClick}></Button>
        <Separator/>
    {/if}

    <Button type="primary" label={i18nRes.app.btnRefresh} onClick={onRefreshClick}></Button>
</div>