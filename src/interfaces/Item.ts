export interface Item {
  id: number;
  photo: string;
  descriptionUa: string;
  descriptionEng: string;
  title: string;
  inProgram: string;
  duration: string;
  seoText: string;
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
