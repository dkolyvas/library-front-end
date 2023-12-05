export interface BookInsertDTO {
    isbn: string|undefined;
    title: string|undefined;
    description?: string|undefined;
    categoryId: number|undefined;
    position: string|undefined;
    author?: string;
}
