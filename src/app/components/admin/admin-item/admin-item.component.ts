import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Item} from "../../../../interfaces/Item";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Data, Params, Router} from "@angular/router";
import {I18nService} from "../../../services/i18n.service";
import {BalletShowItemsService} from "../../../services/getBalletShowItems";
import {ParodyItemsService} from "../../../services/getParodyItems";

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.scss']
})
export class AdminItemComponent implements OnInit {

  @ViewChild("MainPhotoForm") MainPhotoForm?: ElementRef;
  @ViewChild("idPosition") idPosition?: ElementRef;
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
    idPosition: 0
  };
  @Input() fullMode?: boolean = false;
  imageSrc?: string;
  itemId?: string | null;
  data: Item = {
    tableName: "",
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
    idPosition: 0
  };
  currentRoute?: string;
  tableItemsName: string = "balletShowItems"; // для запросов в БД, указываем с какой таблицой работаем]

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              public i18n: I18nService,
              private router: Router,
              private balletShowItemsService: BalletShowItemsService,
              private parodyItemsService: ParodyItemsService,) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let hrefArr = this.router.url.split('/');
      if (hrefArr.includes('ballet-page')) {
        this.tableItemsName = 'balletShowItems';
      } else if (hrefArr.includes('parody-page')) {
        this.tableItemsName = 'parodyItems';
      }
        if (this.fullMode) {
          // если id == 0, значит номер новый, не из бд
          this.itemId = this.route.snapshot.paramMap.get('id') || "0";
          if (this.itemId === "0") {
            this.itemId = null;
          } else {
            this.getBalletShowItem(this.tableItemsName, this.itemId)
          }
        }
    })
  }

  saveItem(): void {
    let title = this.itemForm?.nativeElement.querySelector('.item__title')?.textContent;
    // @ts-ignore
    let description = this.itemForm?.nativeElement.querySelector('.item__description')?.innerHTML;
    let inProgram = this.itemForm?.nativeElement.querySelector('.item__in-program')?.textContent;
    let duration = this.itemForm?.nativeElement.querySelector('.item__duration')?.textContent;
    let seoText = this.itemForm?.nativeElement.querySelector('.seo-text')?.innerHTML;

    this.data["title_" + this.i18n.lang] = title || "";
    this.data["description_" + this.i18n.lang] = description || "";
    this.data["inProgram_" + this.i18n.lang] = inProgram || "";
    this.data["duration_" + this.i18n.lang] = duration || "";
    this.data["seoText_" + this.i18n.lang] = seoText || "";
    this.data.tableName = this.tableItemsName;
    if (this.tableItemsName == 'balletShowItems' && this.balletShowItemsService.currentBalletItems) {
      this.data.idPosition = this.balletShowItemsService.currentBalletItems?.length + 1 || 1;
    } else if (this.tableItemsName == 'parodyItems' && this.parodyItemsService.currentParodyItems) {
      this.data.idPosition = this.parodyItemsService.currentParodyItems?.length + 1 || 1
    }


    // если загрузили новое фото
    if (this.MainPhotoForm && this.imageSrc && !this.itemId) {
      this.apiService.saveFile(this.MainPhotoForm.nativeElement)
        .then(answer => {
          if (answer.message === "File uploaded successfully") {
            this.data.photo = answer.data.url;
            this.addBalletShowItem(this.data);
          } else {
            alert("Помилка при заватаженні файла")
            console.error('answer', answer);
          }
        })
    } else if (this.itemId && !this.imageSrc) {
      this.data.photo = this.item.photo;
      this.data.id = this.item.id;
      this.changeBalletShowItem(this.data);
    }

    else if (this.MainPhotoForm && this.itemId && this.imageSrc) {
      this.data.id = this.item.id;
      this.apiService.saveFile(this.MainPhotoForm.nativeElement)
        .then(answer => {
          if (answer.message === "File uploaded successfully") {
            this.data.photo = answer.data.url;
            this.changeBalletShowItem(this.data);
          } else {
            alert("Помилка при заватаженні файла")
            console.error('answer', answer);
          }
        })
    }
  }

  addBalletShowItem(data: Item): void {
    let isAddItem = confirm('Додати номер?');

    if (isAddItem) {
      this.apiService.addBalletShowItem(data).subscribe({
        next: (v) => {
          // обновить список номеров
          this.apiService.getMostPopularItems(this.tableItemsName).subscribe({
            next: (v) => {
              if (this.tableItemsName == 'balletShowItems') {
                this.balletShowItemsService.changeBalletShowItems(v);
              } else if (this.tableItemsName == 'parodyItems') {
                this.parodyItemsService.changeParodyItems(v);
              }
              },
            error: (e) => {},
            complete: () => {}
          })
          alert("Номер додано");
        },
        error: (e) => {alert('Не вдалося додати номер =(')},
        complete: () => {}
      })
    }
  }

  changeBalletShowItem(data: Item): void {
    console.log(this.data);
    let isChangeItem = confirm('Зберігти нові данні?');
    if (isChangeItem) {
      this.apiService.changeBalletShowItem(data).subscribe({
        next: (v) => {
          this.apiService.getMostPopularItems(this.tableItemsName).subscribe({
            next: (v) => {
              if (this.tableItemsName == 'balletShowItems') {
                this.balletShowItemsService.changeBalletShowItems(v);
              } else if (this.tableItemsName == 'parodyItems') {
                this.parodyItemsService.changeParodyItems(v);
              }
            },
            error: (e) => {alert('Не вдалося додати номер =(')},
            complete: () => {}
          })
          alert("Данні оновлено");
        },
        error: (e) => {alert('Не вдалося змінити данні =(')},
        complete: () => {}
      })
    }
  }

  getBalletShowItem(tableName: string, id: string | number): any {
    this.apiService.getBalletShowItem(tableName, id).subscribe(data => {
      this.item = data[0];
      this.data = data[0];
    })
  }

  // получить и обновить номера на странице
  getMostPopularItems(): void {
    this.apiService.getMostPopularItems(this.tableItemsName).subscribe({
      next: (v) => {
        if (this.tableItemsName == 'balletShowItems') {
          this.balletShowItemsService.changeBalletShowItems(v);
        } else if (this.tableItemsName == 'parodyItems') {
          this.parodyItemsService.changeParodyItems(v);
        }
      },
      error: (e) => {},
      complete: () => {}
    })
  }

  removeItem(tableName: string, item: Item): void {
    let isRemoveItem = confirm('Видалити номер?');
    if (isRemoveItem && item.id) {
      let fileForRemove = {
        filePath: item.photo
      }
      this.apiService.deleteFile(fileForRemove).subscribe({
        next: (v) => {
        },
        error: (e) => {
        },
        complete: () => {
          if (item.id)
          this.apiService.deleteAndChangePositionItem(this.tableItemsName, item.id).subscribe({
            next: (v) => {alert('Номер видалено')},
            error: (e) => {alert('Не вдалося видалити номер =(')},
            complete: () => {
              this.getMostPopularItems();
            }
          })
        }
      })
    }
  }

  // сохранить новые позиции в БД
  changeItemsPosition(): void {
    let newIdPosition = +this.idPosition?.nativeElement.value;
      this.apiService.changeItemPosition(this.tableItemsName, this.item, newIdPosition).subscribe({
        next: (v) => {this.getMostPopularItems()},
        error: (e) => {this.getMostPopularItems()},
        complete: () => {}
      })
  }
  // превью фото
  readURL(event: Event, elem: HTMLInputElement): void {

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

  keyPressNumbers(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
