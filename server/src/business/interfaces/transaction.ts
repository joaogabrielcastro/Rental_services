export interface ITransaction {
    run<T>(cb: (tx: any) => Promise<T>, parent?: any): Promise<T>;
}
