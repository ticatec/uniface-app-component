<script lang="ts">

    import i18n from "@ticatec/i18n";
    import langRes from "$lib/i18n_resources/en_res";

    export let error: any;
    export let canBeClosed: boolean;

</script>

<div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center">
    <div>
        <span>{i18n.getText('unifaceApp.moduleError', langRes.unifaceApp.moduleError)}</span>
    </div>
    <div>
        <span>{error?.message ?? error}</span>
    </div>

</div>