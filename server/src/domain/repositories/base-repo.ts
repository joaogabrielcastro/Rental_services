// prettier-ignore
// some methods have tx as a parameter
// this represents that method supports transactions
export interface IBaseRepository<TEntity, TId> {
    save(
        entity: TEntity, tx?: any
    ): Promise<TEntity>;

    findAll(): Promise<TEntity[]>;
    
    findById(
        id: TId, tx?: any
    ): Promise<TEntity | null>;
    
    update(
        id: TId, entity: TEntity, tx?: any
    ): Promise<void>;
    
    delete(
        id: TId
    ): Promise<void>;
}
