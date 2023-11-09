export interface Item {
  id?: number;
  photo: string;
  description_ua?: string;
  description_en?: string;
  title_ua: string;
  title_en: string;
  inProgram_ua: string;
  inProgram_en: string;
  duration_ua: string;
  duration_en: string;
  seoText_ua: string;
  seoText_en: string;
  [key: string]: any;
}


// interface ItemType {
//   photo: string;
//   descriptionUa: string;
//   descriptionEng: string;
//   title: string;
// }
//
// export default class Item {
//   photo: string = '';
//   descriptionUa: string = '';
//   descriptionEng: string = '';
//   title: string = '';
//   lang: string = '';
//   constructor(data: ItemType, lang: string) {
//     this.photo = data.photo
//     this.descriptionUa = data.descriptionUa
//     this.descriptionEng = data.descriptionEng
//     this.title = data.title
//     this.lang = lang
//   }
//
//   get description(): string {
//     if (this.lang === "ua") {
//       return this.descriptionUa;
//     } else {
//       return this.descriptionEng;
//     }
//   }
//
// }
