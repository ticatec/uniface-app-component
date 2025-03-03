export default class CriteriaComponents {

    private map: Map<string, any>;
    private static instance: CriteriaComponents;

    static getInstance() {
        if (CriteriaComponents.instance == null) {
            CriteriaComponents.instance = new CriteriaComponents()
        }
        return CriteriaComponents.instance;
    }

    private constructor() {
        this.map = new Map<string, any>();
    }

    /**
     * 根据类型获取组件
     * @param type
     */
    get(type: string): any {
        return this.map.get(type);
    }

    /**
     * 注册一个组件类型
     * @param type
     * @param component
     */
    register(type: string, component: any) {
        this.map.set(type, component);
    }

}