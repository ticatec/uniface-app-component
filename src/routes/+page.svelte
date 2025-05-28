<script lang="ts">

    import "@ticatec/uniface-element/ticatec-uniface-web.css"
    import "@ticatec/uniface-google-material-icons/google_material_icons.css"
    import "@ticatec/uniface-filter-panel/uniface-filter-panel.css"
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
    uniAppCtx.roundPage = false;
    uniAppCtx.shadowPage = false;
    uniAppCtx.generateInfo = (total: number, pageCount: number, pageNo: number, rows: number) => `<span>第 <b>${pageNo} / ${pageCount||1}</b> 页 合计 <b>${total??0}</b> 条</span>`




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
                    switch (ex.status) {
                        case 401:
                            window.Toast.show("用户尚未登录或者令牌已经失效，请重新登录");
                            break;
                        case 404:
                            window.Toast.show("无效的资源地址，接口不存在，请联系平台系统管理员");
                            break;
                        case 403:
                            window.Toast.show("越权访问，如有疑惑请咨询平台系统管理员");
                            break;
                        default:
                            console.log('错误', ex.status, ex.code, ex.message, ex)
                            window.Toast.show(ex.message)
                    }

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




