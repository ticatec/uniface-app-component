import type {DataColumn} from "@ticatec/uniface-element";

const getStatusText = (value: any): string => {
    switch (value) {
        case 'A':
            return `<span style="color: #2DB08B">使用中</span>`
        default:
            return `<span style="color: #ff3e00">待启用</span>`
    }
}

const columns:Array<DataColumn> = [
    {
        text: '编码',
        field: 'code',
        width: 120,
        compareFunction: (o1:any, o2:any) =>  (o1?.code??'').localeCompare(o2?.code)
    },
    {
        text: '名称',
        field: 'name',
        width: 220,
        resizable: true,
        compareFunction: (o1:any, o2:any) =>  (o1?.name??'').localeCompare(o2?.name, 'zh')
    },
    {
        text: '简称',
        field: 'abbr',
        width: 220,
        resizable: true
    },
    {
        text: '地区',
        field: 'zoneName',
        width: 180,
        align: 'left',
        resizable: true
    },
    {
        text: '上级医院',
        field: 'parentName',
        width: 220,
        resizable: true
    },
    {
        text: '级别',
        field: 'hospitalLevel',
        width: 120,
        align: 'center'
    },
    {
        text: '状态',
        field: 'mode',
        width: 90,
        align: 'center',
        formatter: getStatusText,
        escapeHTML: true
    }
]

export default columns;