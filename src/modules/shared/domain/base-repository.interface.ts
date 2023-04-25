export interface BaseRepository {
    create(entity: any): Promise<any>;
    findAll(): Promise<any[]>;
    update(id: string, entity: any): Promise<any>;
    remove(id: string): Promise<any>;
}
