export default interface PagingDataManager {
    get list(): Array<any>;

    get count(): number;

    get pageNo(): number;

    get pageCount(): number;

    get criteria(): any;

    refresh(): Promise<void>;

    resetCriteria(): any;

    resetSearch(): Promise<void>;

    search(params: any): Promise<void>;

    setRowsPage(rows: number): Promise<void>;

    setPageNo(value: number): Promise<void>;
}