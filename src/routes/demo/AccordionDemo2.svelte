<script lang="ts" context="module">

    let pageIdx: number = 0;

</script>

<script lang="ts">

    import AccordionDemo from "./AccordionDemo.svelte";
    import AccordionPanel from "@ticatec/uniface-element/Accordion";
    import type {AccordionItem} from "@ticatec/uniface-element/Accordion";
    import AccPanel from "./AccPanel.svelte";
    import Box from "@ticatec/uniface-element/Box";
    import Button from "@ticatec/uniface-element/Button";
    import {onMount} from "svelte";
    import AppModule from "$lib/module/AppModule";

    let accordions: Array<AccordionItem> = [
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        }
    ]


    let accordions1: Array<AccordionItem> = [
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1fjslk lksdfjlksdfj lksadjlks;afjlksfjkalk;sfjks;dfjk;sfjk;flsk;df jlskdfj;lsdk;fj lksf;j saf; ds",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        }
    ]

    onMount(() => {
        console.log('加载手风琴组件');
        pageIdx = pageIdx + 1;
    })

</script>

<div style="padding: 12px; box-sizing: border-box; height: 100%; width: 100%; overflow: auto; display: flex; flex-direction: row">
    <Box style="width: 320px; height: 600px; margin-right: 10px">
        <AccordionPanel exclusive accordions={accordions1} header="组件1" compact>

        </AccordionPanel>
    </Box>
    <Box style="width: 320px; height: 600px; margin-right: 10px">
        <AccordionPanel {accordions} header="组件1">

        </AccordionPanel>
    </Box>
    <Box style="width: 300px; height: 400px">
        <div>
            <Button label="打开新页面" onClick={()=>{AppModule.showPage(AccordionDemo)}}></Button>
            <Button label="关闭" onClick={()=>{AppModule.closeActivePage()}}></Button>

        </div>
        <div style="margin: 10px 0">
            <span>页面序号:{pageIdx}</span>
        </div>
    </Box>

</div>