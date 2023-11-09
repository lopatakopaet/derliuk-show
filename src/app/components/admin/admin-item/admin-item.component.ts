import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Item} from "../../../../interfaces/Item";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {I18nService} from "../../../services/i18n.service";

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.scss']
})
export class AdminItemComponent implements OnInit, AfterViewInit {

  // @ViewChild("MainPhotoForm") MainPhotoForm?: HTMLFormElement;
  @ViewChild("MainPhotoForm") MainPhotoForm?: ElementRef;
  // @ViewChild("mainPhotoInput") mainPhotoInput?: ElementRef;
  @ViewChild('itemForm') itemForm: ElementRef<HTMLDivElement> | undefined;
  @Input() item: Item = {
    id: 0,
    photo: "",
    description_ua: "",
    description_en: "",
    title_ua: "",
    title_en: "",
    inProgram_ua: "",
    inProgram_en: "",
    duration_ua: "",
    duration_en: "",
    seoText_ua: "",
    seoText_en: "",
  };
  @Input() fullMode?: boolean = false;
  imageSrc?: string;
  itemId?: string | null;
  data: Item = {
    photo: "",
    description_ua: "",
    description_en: "",
    title_ua: "",
    title_en: "",
    inProgram_ua: "",
    inProgram_en: "",
    duration_ua: "",
    duration_en: "",
    seoText_ua: "",
    seoText_en: "",
  };


  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              public i18n: I18nService) {
  }

  ngOnInit(): void {
    if (this.fullMode) {
      this.itemId = this.route.snapshot.paramMap.get('id') || "0";
      if (this.itemId === "0") {
        this.itemId = null;
      } else {
        this.getBalletShowItem(this.itemId)
      }
    }
  }

  ngAfterViewInit() {

  }

  savePhoto(formHtml: HTMLFormElement): any {
    this.apiService.saveFile(formHtml)
  }

  saveItem(): void {
    let title = this.itemForm?.nativeElement.querySelector('.item__title')?.textContent;
    let description = this.itemForm?.nativeElement.querySelector('.item__description')?.textContent;
    let inProgram = this.itemForm?.nativeElement.querySelector('.item__in-program')?.textContent;
    let duration = this.itemForm?.nativeElement.querySelector('.item__duration')?.textContent;
    let seoText = this.itemForm?.nativeElement.querySelector('.seo-text')?.textContent;

    this.data["title_" + this.i18n.lang] = title || "";
    this.data["description_" + this.i18n.lang] = description || "";
    this.data["inProgram_" + this.i18n.lang] = inProgram || "";
    this.data["duration_" + this.i18n.lang] = duration || "";
    this.data["seoText_" + this.i18n.lang] = seoText || "";
    // debugger

    // если загрузили новое фото
    if (this.MainPhotoForm && this.imageSrc) {
      this.apiService.saveFile(this.MainPhotoForm.nativeElement)
        .then(answer => {
          if (answer.message === "File uploaded succesfully") {
            this.data.photo = answer.data.url;
            this.addBalletShowItems(this.data);
            console.log('this.data9999', this.data)
            // debugger
          } else {
            alert("Помилка при заватаженні файла")
            console.error('answer', answer);
          }
        })
    }
    // если фото не загружали, но есть старое (редактируем существующий номер)
    else if (!this.imageSrc && this.item.photo) {
      this.data.photo = this.item.photo;
      this.data.id = this.item.id;
      console.log('changeBalletShowItem', this.data)
      this.changeBalletShowItem(this.data);
    }
  }

  addBalletShowItems(data: Item): void {
    this.apiService.addBalletShowItems(data).subscribe(req => {
      console.log("req", req);
    })
  }

  changeBalletShowItem(data: Item): void {
    this.apiService.changeBalletShowItem(data).subscribe(req => {
      console.log("req", req);
    })
  }

  // getItemData(): Item {
  //   this.data.title = this.itemForm?.nativeElement.querySelector('.item-title')?.textContent || "";
  //   return this.data;
  // }

  // savePhoto($event: Event, formHtml: HTMLFormElement): void {
  //   this.apiService.saveFile($event, formHtml).then(answer => {
  //     console.log("data", answer)
  //   })
  // }

  getBalletShowItem(id: string | number): any {
    this.apiService.getBalletShowItem(id).subscribe(data => {
      this.item = data[0]
    })
  }

  readURL(event: Event, elem: HTMLInputElement): void {
    console.log('elem', elem.value);

    if (!elem.value) {
      this.imageSrc = "";
      return
    }
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      const file = event.target.files[0];

      const reader = new FileReader();
      // @ts-ignore
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }
}
