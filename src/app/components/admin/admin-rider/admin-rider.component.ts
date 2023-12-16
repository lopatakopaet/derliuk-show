import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Rider} from "../../../../interfaces/Rider";
import {ApiService} from "../../../services/api.service";
import {I18nService} from "../../../services/i18n.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-rider',
  templateUrl: './admin-rider.component.html',
  styleUrls: ['./admin-rider.component.scss']
})
export class AdminRiderComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: ElementRef;
  @ViewChild("FileForm") FileForm?: ElementRef;
  @ViewChild('listForm') listForm: ElementRef<HTMLDivElement> | undefined;

  riderId: number = 0;

  riderData: {
    data_ua: {
      riderList: [];
      file: string;
    };
    data_en: {
      riderList: [];
      file: string;
    }
    [key: string]: any
  } = {
    data_ua: {
      riderList: [],
      file: ''
    },
    data_en: {
      riderList: [],
      file: ''
    }
  }

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              public i18n: I18nService,
              private router: Router) { }

  ngOnInit(): void {
  this.getRiderData()
  }

  getRiderData(): void {
    // this.apiService.getRiderData().subscribe(data => {
    //   console.log(this.i18n.lang);
    //   if (data && data.length) {
    //     this.riderData = JSON.parse(data[0].data)
    //     // console.log('this.riderData[\'data_\'+ this.i18n.lang][\'riderList\']', this.riderData['data_'+ this.i18n.lang]['riderList']);
    //     console.log('this.riderData1', this.riderData);
    //     this.riderId = JSON.parse(data[0].id);
    //     console.log('this.riderId1', this.riderId);
    //   }
    // })
    this.apiService.getRiderData().subscribe({
      next: (data) => {
        console.log(this.i18n.lang);
        if (data && data.length) {
          this.riderData = JSON.parse(data[0].data)
          // this.riderData = data[0].data;
          // console.log('this.riderData[\'data_\'+ this.i18n.lang][\'riderList\']', this.riderData['data_'+ this.i18n.lang]['riderList']);
          console.log('this.riderData1', this.riderData);
          this.riderId = JSON.parse(data[0].id);
          console.log('this.riderId1', this.riderId);
        }
      },
      error: (e) => {},
      complete: () => {}
    })
  }

  addNewListElem(): void {
    this.riderData['data_'+ this.i18n.lang]['riderList'].push('Додати опис')
  }

  removeList(index: number): void {
    let riderList = this.riderData['data_'+ this.i18n.lang]['riderList'];
    if (riderList?.length) {
      riderList.splice(index, 1);
    }
  }

  changeRiderData(file?: string): void {
    let dataForServer;
    let riderData: {
      data_ua: {
        riderList: [];
        file: string;
      };
      data_en: {
        riderList: [];
        file: string;
      }
      [key: string]: any
    };
    riderData = this.riderData;
    let riderList: [] = [];
    let riderElementsList = this.listForm?.nativeElement.querySelectorAll('.admin-list-input');
    if (riderElementsList) {
      for (let i = 0; i < riderElementsList.length; i++) {
        if (riderElementsList[i].textContent) {
          // @ts-ignore
          riderList.push(riderElementsList[i].textContent);
        }
      }
      riderData["data_" + this.i18n.lang].riderList = [];
      riderData["data_" + this.i18n.lang].riderList = [...riderList];
    }

    if (file == 'del') {
      riderData["data_" + this.i18n.lang].file = '';
    } else if (file) {
      riderData["data_" + this.i18n.lang].file = file;
    }
    // dataForServer = JSON.stringify(riderData);

    // если есть данные с сервера, то обновляем их, берем id, куда перезаписать данные

    if (this.riderId) {
      this.apiService.changeRiderData({data: riderData, id: this.riderId}).subscribe({
        next: (v) => {
          alert('Дані змінено')
        },
        error: (e) => {
          alert('Не вдалося змінити дані =(');
          console.error('err', e)
        },
        complete: () => {}
      })
    } else {
      // добавляем данные, если это первая запись
      this.apiService.addRiderData({data: riderData}).subscribe({
        next: (v) => {
          alert('Дані додано')
        },
        error: (e) => {
          alert('Не вдалося додати дані =(');
          console.error('err', e)
        },
        complete: () => {}
      })
    }
  }

  saveRider(): void {
    let isChangeRider = confirm("Внести зміни?");
    if (isChangeRider) {
      if (this.fileInput?.nativeElement.value) {
        this.apiService.saveFile(this.FileForm?.nativeElement)
          .then(answer => {
            if (answer.message === "File uploaded successfully") {
              this.changeRiderData(answer.data.url);
            } else {
              alert("Помилка при заватаженні файла")
              console.error('answer', answer);
            }
          })
      } else {
        this.changeRiderData()
      }
    }
  }
  delFile(): void {
    let isRemoveFile = confirm('Видалити файл?');
    if (isRemoveFile) {
      let fileForRemove = {
        filePath: this.riderData['data_'+ this.i18n.lang]['file']
      };

      this.apiService.deleteFile(fileForRemove).subscribe({
        next: (v) => {
          let file = 'del';
          this.changeRiderData(file)
        },
        error: (e) => {
          let file = 'del';
          this.changeRiderData(file)
        },
        complete: () => {

        }
      })
    }

  }
}
