<script lang="ts">

    import "@ticatec/uniface-element/ticatec-uniface-web.css"
    import "@ticatec/uniface-icons/feather-style.css"
    import "$lib/uniface-app-component.css"
    import "./app.css";
    import {onMount} from "svelte";

    import uniAppCtx from "$lib/common/uniAppCtx";
    import HomePage from "$lib/HomePage.svelte";
    import RestService, {ApiError} from "@ticatec/axios-restful-service";
    import {BaseDataService} from "@ticatec/app-data-service";
    import routes from "./routes";
    import {registerComponents} from "@ticatec/uniface-filter-panel";

    const isDev = import.meta.env.MODE == "development" || import.meta.env.DEV;
    const inFrame = window.frameElement !== null;
    let mainHome: any;
    let params: any;


    uniAppCtx.rowCountLabel = '行/页';
    uniAppCtx.generateInfo = (total: number, pageCount: number, pageNo: number, rows: number) => `<span>第 <b>${pageNo} / ${pageCount}</b> 页 合计 <b>${total}</b> 条</span>`




    onMount(async () => {
        if (isDev && !inFrame) {
            mainHome = (await import('@ticatec/uniface-dev-shell')).default;
            params = {
                menu: (await import('./menu')).default,
                title: '应用组件展示'
            }
        } else {
            registerComponents();
            let service = new RestService(window.location.origin, (ex: any) => {
                if (ex instanceof ApiError) {

                }
                return true
            });
            BaseDataService.setProxy(service);
            mainHome = HomePage;
            params = {
                routes
            }

        }
    });



</script>

{#if mainHome}
    <svelte:component this={mainHome} {...params}/>
{/if}




