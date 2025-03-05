<script lang="ts">

    import columns from "./data-table-old/columns";
    import type MetaCriteriaField from "$lib/filter-panel/MetaCriteriaField";
    import InlineComponent from "./data-table-old/InlineComponent.svelte";
    import {onMount} from "svelte";
    import PagedDataTablePage from "$lib/data-table-pages/PagedDataTablePage.svelte";
    import Button from "@ticatec/uniface-element/Button";
    import SimpleDataTablePageDemo from "./SimpleDataTablePageDemo.svelte";
    import type PageAttrs from "$lib/common/PageAttrs";
    import AppModule from "$lib/module/AppModule";
    import type {IndicatorColumn} from "@ticatec/uniface-element";
    import DynamicFilterPanel from "@ticatec/uniface-filter-panel/DynamicFilterPanel";


    let criteria: any = {}


    let indicatorColumn: IndicatorColumn = {
        width: 60,
        selectable: true,
        buildInlineComponent: async (data: any) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (data.id == 5) {
                        reject(new Error('详情不存在'))
                    } else {
                        resolve(InlineComponent)
                    }
                }, 3000);
            })
        },
        getInlineError: (ex: Error) => ex.message
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
        width: 150,
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

    let total: number = 20;
    let pageCount = 5;
    let pageNo = 3;

    const handlePageChange = (p: number) => {
        console.log('当前页面：', p);
        pageNo = p;
    }

    const handleRowCountChange = (rows: number) => {
        console.log('每页行数：', rows);
    }

    const createNewClick = () => {
        AppModule.showPage(SimpleDataTablePageDemo, {})
    }

    let page$attrs: PageAttrs = {
        title: '卒中患者列表'
    }

    let labels = {
        advancedCriteriaTitle: '所有查询条件'
    }

    let variant

    let actions = [

    ]
    //
    //     <svelte:fragment slot="action-bar">
    // <Button type=primary label=新增 onClick={createNewClick}/>
    // <Button type=forth label=导出数据 onClick={searchClickHandler}/>
    // <Button type=forth label=批量导入 onClick={searchClickHandler}/>
    // </svelte:fragment>
</script>

<PagedDataTablePage bind:selectedRows {list} page$attrs={page$attrs} rowHeight={60}
                              {criteria} {actionsColumn} {indicatorColumn} {columns} {fields} {labels}
                              {resetClickHandler} {searchClickHandler} {total} {pageCount} {pageNo} onPageChange={handlePageChange}
                              onRowCountChanged={handleRowCountChange}>
    <DynamicFilterPanel slot="search-panel" style="flex: 0 0 auto" bind:criteria {fields} {actions} {resetClickHandler} {searchClickHandler}
                        variant="outlined">
    </DynamicFilterPanel>
</PagedDataTablePage>