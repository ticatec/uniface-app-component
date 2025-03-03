export default interface ListDataManager {

    get list(): Array<any>;

    loadData(params: any): Promise<void>;
}