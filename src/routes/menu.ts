let menu = [
    {
        item: {text: "卡片页面展示"},
        children: [
            {
                item: {
                    text: "列表展示",
                    href: "/card/full-list"
                }
            },
            {
                item: {
                    text: "托管列表展示",
                    href: "/card/managed/full-list"
                }
            },
            {
                item: {
                    text: "分页列表展示",
                    href: "/card/paged-list"
                }
            },
            {
                item: {
                    text: "托管分页列表展示",
                    href: "/card/managed/paged-list"
                }
            }
        ]
    },
    {
        item: {
            text: "数据表展示"
        },
        children: [
            {
                item: {
                    text: "列表展示",
                    href: "/data-table/full-list"
                }
            },
            {
                item: {
                    text: "托管列表展示",
                    href: "/data-table/managed/full-list"
                }
            },
            {
                item: {
                    text: "分页列表展示",
                    href: "/data-table/paged-list"
                }
            },
            {
                item: {
                    text: "托管分页列表展示",
                    href: "/data-table/managed/paged-list"
                }
            },
            {
                item: {
                    text: "动态列表展示",
                    href: "/data-table/dynamic-paged-list"
                }
            },
            {
                item: {
                    text: "托管动态列表展示",
                    href: "/data-table/managed/paged-list1"
                }
            }
        ]
    }
]

export default menu;