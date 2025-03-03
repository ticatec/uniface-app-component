<script lang="ts">

    import TenantManager from "../../cards/managed-paged-cards/TenantManager";
    import CriteriaFilterPanel from "../../cards/managed-paged-cards/CriteriaFilterPanel.svelte";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";
    import ManagedPagedDataTablePage from "$lib/managed-pages/ManagedPagedDataTablePage.svelte";
    import type {ActionsColumn, IndicatorColumn, RowAction} from "@ticatec/uniface-element";
    import columns from "./TenantColumns";
    import ManagedDynamicCriteriaDataTablePage from "$lib/managed-pages/ManagedDynamicCriteriaDataTablePage.svelte";
    import type MetaCriteriaField from "$lib/filter-panel/MetaCriteriaField";

    const dataMgr = new TenantManager();

    let page$attrs = {
        title: "托管卡片页面演示"
    };

    let list: Array<any> = [];
    let tablePage: any;

    let criteria: any = {}


    const saveCallback = (data: any, isNew: boolean) => {

    }

    const addNewRole = () => {
        let data = {};
        //window.Dialog.showModal(RoleDetailPanel, {saveCallback, data})
    }

    let actions: ButtonActions = [
        {label: '新增', type: 'primary', handler: addNewRole}
    ]

    let indicatorColumn: IndicatorColumn = {
        width: 40,
        selectable: false
    }

    const actionsColumn: ActionsColumn = {
        title: '操作',
        width: 150,
        getActions: (item: any): Array<RowAction> => {
            return []
        }
    }

    let criteriaFields: Array<MetaCriteriaField> = [
        {
            type: 'text-editor',
            attrs: {
                field: 'code',
                placeholder: '*代表任何字符'
            },
            label: '编号',
            size: 'x20',
            isAdvanced: false
        },
        {
            type: 'text-editor',
            attrs: {
                field: 'name',
                placeholder: '*代表任何字符'
            },
            label: '名称',
            size: 'x20',
            isAdvanced: false
        },
        {
            type: 'options-select',
            attrs: {
                field: 'gender',
                props: {
                    options: [
                        {code: 'M', text: 'Male'},
                        {code: 'F', text: 'Female'}
                    ],
                    emptyText: '所有'
                }

            },
            label: '名称',
            size: 'x20',
            isAdvanced: false
        }
    ];

    $: console.log('数据列表', tablePage);
</script>

<ManagedDynamicCriteriaDataTablePage fields={criteriaFields} {actionsColumn} {indicatorColumn} dataManager={dataMgr} bind:list
                                     page$attrs="{page$attrs}"
                                     bind:criteria {columns} rowHeight={48}>
</ManagedDynamicCriteriaDataTablePage>