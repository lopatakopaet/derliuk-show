export interface Comment {
  photo: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  created_at?: string | number;
  [key: string]: any
}
