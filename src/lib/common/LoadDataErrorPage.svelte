<script lang="ts">

    import i18n from "@ticatec/i18n";
    export let message: string;

</script>
<div class="uniface-module-board">
    <div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center">
        <div>
            <span>{i18n.get('uniapp.page_initialize_load_error'??"Can't initialize this module.")}</span>
        </div>
        <div>
            <span>{message}</span>
        </div>

    </div>
</div>