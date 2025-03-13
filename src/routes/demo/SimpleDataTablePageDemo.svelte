<script lang="ts">

    import columns from "./data-table-old/columns";
    import type MetaCriteriaField from "$lib/filter-panel/MetaCriteriaField";
    import {onMount} from "svelte";
    //import SimpleFormDemo from "./forms/SimpleFormDemo.svelte";
    import CommonDataTablePage from "$lib/data-table/ListPage.svelte";
    import type {FunFilter} from "@ticatec/uniface-element";
    import type PageAttrs from "$lib/common/PageAttrs";
    import AppModule from "$lib/module/AppModule";

    let criteria: any = {}


    let indicatorColumn = {
        width: 60,
        selectable: false
    }

    const resetClickHandler = () => {
        criteria = {};
    }
    const searchClickHandler = () => {
        console.log('查询数据', criteria)
    };

    let fields: Array<MetaCriteriaField> = [
        {
            type: "text-editor",
            attrs: {
                field: "name"
            },
            label: "姓名",
            size: 'x15'
        },
        {
            type: "number-range",
            attrs: {
                fromField: "minAge",
                toField: "maxAge"
            },
            label: "年龄范围",
            size: 'x30',
            isAdvanced: true
        },
        {
            type: "options-select",
            attrs: {
                field: "gender",
                props: {
                    emptyText: "所有",
                    options: [
                        {code: "M", text: "男性"},
                        {code: "F", text: "女性"}
                    ]
                }

            },
            label: "性别",
            size: 'x15'
        }
    ]


    let actionsColumn = {
        title: "动作",
        width: 130,
        vacancy: 3,
        getActions: (item: any) => {
            return [
                {
                    label: '查看',
                    callback: () => {
                        console.log(item)
                    }
                },
                {
                    label: '修改',
                    callback: () => {
                        console.log(item)
                    }
                },
                {
                    label: '锁定',
                    callback: () => {
                        console.log(item)
                    }
                },
                {
                    label: '解锁',
                    callback: () => {
                        console.log(item)
                    }
                },
                {
                    label: '删除',
                    callback: () => {
                        console.log(item)
                    }
                }
            ]
        }
    }

    onMount(() => {
        setTimeout(() => {
            list = [
                {
                    name: "张三",
                    gender: "M",
                    address: "18 Cold Street. 18 Cold Street. 18 Cold Street. 18 Cold Street. 18 Cold Street.",
                    phone: "04-35689 215",
                    concat: "James",
                    admissionDate: ""
                },
                {
                    name: "张三",
                    gender: "M",
                    address: "河北省石家庄市红旗大街",
                    phone: "04-35689 215",
                    concat: "James",
                    admissionDate: ""
                },
                {id: 5},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ]
        }, 5000)
    })


    export let selectedRows: Array<any> = [];

    export let list: Array<any> = [];

    $: console.log('选中数据', selectedRows);


    const createNewClick = () => {
       // AppModule.showPage(SimpleFormDemo)
    }

    let  page$attrs: PageAttrs = {
        title: '卒中患者列表',
        canClose: true
    }

    let filterFun: FunFilter = (item: any, text: string): boolean => {
        return (item.name ?? '').indexOf(text) > -1 || (item.address ?? '').indexOf(text) > -1;
    }

</script>

<CommonDataTablePage bind:selectedRows {list} page$attrs={page$attrs}
                      onRefreshClick={()=>{}} onCreateNewClick={createNewClick}
                     {actionsColumn} {indicatorColumn} {columns} {filterFun}>

</CommonDataTablePage>