import type ModulePage from "$lib/module/ModulePage";

export type PagesChangeListener = (pages: Array<ModulePage>) => void;

export default class AppModule {

    private readonly list: Array<ModulePage>;
    private readonly onPageChange: PagesChangeListener;
    private static instance:AppModule;

    static initialize(onPageChange: PagesChangeListener) {
        if (AppModule.instance == null) {
            AppModule.instance = new AppModule(onPageChange);
        }
    }

    static getInstance(): AppModule {
        return AppModule.instance;
    }

    private constructor(onPageChange: PagesChangeListener) {
        this.list = [];
        this.onPageChange = onPageChange;
    }

    /**
     * 新增一个页面
     * @param component
     * @param params
     */
    append(component: any, params?: any): string {
        let page: ModulePage = {id: `${new Date().getTime().toString(36)}`, component, params};
        this.list.push(page);
        this.onPageChange?.(this.list);
        return page.id;
    }

    /**
     * 把最后一页从当前模块移除
     */
    pop() {
        this.list.pop();
        this.onPageChange?.(this.list);
    }

    static closeActivePage() {
        AppModule.instance.pop();
    }

    static showPage(component: any, params: any = null) {
        AppModule.instance.append({component, params});
    }
}