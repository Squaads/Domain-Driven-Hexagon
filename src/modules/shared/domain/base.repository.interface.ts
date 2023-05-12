export interface IBaseRepository {
    create(createUserDto: any): Promise<any>;
    findAll(): Promise<any[]>;
    update(id: string, updateUserDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
