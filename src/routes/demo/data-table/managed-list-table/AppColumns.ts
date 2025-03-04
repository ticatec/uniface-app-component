import type {DataColumn} from "@ticatec/uniface-element";

const getStatusText = (value: any): string => {
    switch (value) {
        case 1:
            return `<span style="color: #2DB08B">活动</span>`
        default:
            return `<span style="color: #ff3e00">暂停</span>`
    }
}

const columns:Array<DataColumn> = [
    {
        text: '编码',
        field: 'code',
        width: 120,
        resizable: true,
        compareFunction: (o1: any, o2: any) => (o1?.code??'').localeCompare(o2?.code)
    },
    {
        text: '名称',
        field: 'name',
        width: 220,
        resizable: true,
        compareFunction: (o1: any, o2: any) => (o1?.name??'').localeCompare(o2?.name, 'zh')
    },
    {
        text: '版本',
        field: 'version',
        width: 90,
        align: 'center'
    },
    {
        text: '应用入口',
        field: 'uri',
        width: 120,
        resizable: true
    },
    {
        text: '类型',
        field: 'mode',
        width: 90,
        align: 'center',
        formatter: (value: any) => value == 1 ? '商业应用' : '平台应用'
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