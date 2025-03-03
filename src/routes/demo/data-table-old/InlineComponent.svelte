<script lang="ts">
    export let data;


    let height: number = Math.round(Math.random() * 160) + 200;

</script>
<div style="width: 100%; padding: 6px; box-sizing: border-box">
    <div style="height: {height}px; text-align: center">
        <span style="top: 50%; transform: translateY(-50%); display: inline-block; position: relative">表格内嵌内容, 高度{height}px;</span>
    </div>
</div>