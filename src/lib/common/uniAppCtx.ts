import type {GenerateTotalInfo} from "@ticatec/uniface-element/PaginationPanel";

interface IUnifaceAppContext {
    /**
     * 每页行数的标签文字
     */
    rowCountLabel?: string,
    /**
     * 根据记录数生成文字描述
     */
    generateInfo?: GenerateTotalInfo,
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

    generateInfo: undefined,

    rowCountLabel: undefined,

    roundPage: true,

    shadowPage: true,

}

export default appCtx;