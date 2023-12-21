export interface Comment {
  id?: number;
  tableName?: string;
  photo: string;
  name: string;
  date: string;
  rating: number | string;
  comment: string;
  created_at?: string | number;
  [key: string]: any
}
