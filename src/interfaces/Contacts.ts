export interface Contacts {
  id?: number;
  description_ua: string;
  description_en: string;
  phones: ["", "", ""];
  email: string;
  [key: string]: any
}
