export interface BaseStorage {
    upload(): Promise<File>;
    download(): Promise<File>;
}
