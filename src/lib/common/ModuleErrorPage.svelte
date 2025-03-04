<script lang="ts">

    import i18n from "@ticatec/uniface-element/I18nContext";

    export let ex: any;
</script>

<div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center">
    <div>
        <span>{i18n.getText('uniface.app.moduleError', "Can't load current module.")}</span>
    </div>
    <div>
        <span>{ex.message ?? ex}</span>
    </div>

</div>