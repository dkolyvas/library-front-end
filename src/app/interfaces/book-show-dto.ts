export interface BookShowDTO {
  id: number;
  isbn: string;
  title: string;
  description?: string;
  category? : string;
  categoryId?: number;
  position?: string;
  author?: string;
  available: boolean;

}
