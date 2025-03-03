<script lang="ts">

    import Card from "@ticatec/uniface-element/Card";
    import type {CardAction} from "@ticatec/uniface-element";
    export let data: any;

    let actions: Array<CardAction> = [
        {
            icon: 'uniface-icon-user',
            callback: () => {
                window.Toast.show('打折好消息', "success")
            }
        },
        {
            icon: 'uniface-icon-users',
            callback: () => {
                window.MessageBox.showConfirm('确定要删除当前角色吗？', '删除确认')
            }
        },
        {
            icon: 'uniface-icon-wifi',
            callback: () => {
                window.MessageBox.showInfo('干的漂亮', '信息提示')
            }
        },
        {
            icon: 'uniface-icon-wind',
            callback: () => {
            }
        }
    ]


</script>

<Card title="角色：{data.name}" {actions}>
    <div style="height: 80px; padding: 12px 15px; box-sizing: border-box; width: 100%">
        <span>{data.note??''}</span>
    </div>
</Card>