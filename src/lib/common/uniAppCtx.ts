
interface IUnifaceAppContext {

    /**
     * 每页有多少行的的数据集合
     */
    rowsSet?: Array<number>;

    /**
     * 师傅为圆角页面
     */
    roundPage?: boolean;
    /**
     * 页面是否带阴影
     */
    shadowPage?: boolean;

}

const appCtx: IUnifaceAppContext = {

    rowsSet: [25, 50, 100],

    roundPage: true,

    shadowPage: true,

}

export default appCtx;