import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Rider} from "../../../../interfaces/Rider";
import {ApiService} from "../../../services/api.service";
import {I18nService} from "../../../services/i18n.service";

@Component({
  selector: 'app-admin-rider',
  templateUrl: './admin-rider.component.html',
  styleUrls: ['./admin-rider.component.scss']
})
export class AdminRiderComponent implements OnInit {
  // @ViewChild('listForm') listForm: ElementRef;
  @ViewChild('listForm') listForm: ElementRef<HTMLDivElement> | undefined;
  @ViewChild("FileForm") FileForm?: ElementRef;
// в базе данных все храниться в ячейке с первым id (по умолчанию 1, если руками будет удаление, то меняется id)
  riderId: number = 1;
  currentFile?: string;
  currentRiderList: [] = [];


  riderData: {
    data_ua: {
      riderList: [];
      file: string;
    };
    data_en: {
      riderList: [];
      file: string;
    }
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
              public i18n: I18nService) { }

  ngOnInit(): void {
    this.apiService.getRiderData().subscribe(data => {
      if (data && data.length) {
        this.riderData = JSON.parse(data[0].data)
        this.riderId = JSON.parse(data[0].id);
        if (this.riderData) {
          // @ts-ignore
          this.currentRiderList = this.riderData['data_' + this.i18n.lang].riderList
          // @ts-ignore
          this.currentFile = this.riderData['data_' + this.i18n.lang].file
        }
      }
    })
  }

  addNewListElem():void {
    this.listForm?.nativeElement.insertAdjacentHTML('beforeend',
      '<div class="admin-list-input__wrap"><p class="admin-list-input" contenteditable="true" >\n' +
      '    </p>' +
      '<svg class="admin-list-del" xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">\n' +
      '      <g clip-path="url(#clip0_1461_1105)">\n' +
      '        <path d="M5.63188 5.88332H15.5195L14.805 15.8889C14.7909 16.0865 14.7025 16.2714 14.5576 16.4064C14.4127 16.5414 14.2221 16.6166 14.024 16.6167C14.024 16.6167 14.024 16.6167 14.024 16.6167H7.12737L5.63188 5.88332ZM5.63188 5.88332L6.34639 15.8889L6.34639 15.8889C6.36045 16.0865 6.44883 16.2714 6.59374 16.4064C6.73863 16.5414 6.9293 16.6166 7.12735 16.6167L5.63188 5.88332ZM14.104 2.79087L14.104 2.79086C13.9901 2.44903 13.7716 2.15168 13.4794 1.94094C13.1871 1.7302 12.836 1.61675 12.4757 1.61666H8.67653C8.67653 1.61666 8.67652 1.61666 8.67652 1.61666C8.31608 1.61657 7.96476 1.72994 7.67236 1.94069C7.37996 2.15144 7.16131 2.44889 7.04741 2.79086L7.04741 2.79087L6.60629 4.11666H3.90902C3.67474 4.11666 3.45006 4.20972 3.28441 4.37538C3.11875 4.54104 3.02568 4.76571 3.02568 4.99999C3.02568 5.23426 3.11875 5.45894 3.28441 5.6246C3.43864 5.77884 3.64405 5.87015 3.86072 5.882C3.861 5.88646 3.86131 5.89092 3.86165 5.89537C3.86166 5.89542 3.86166 5.89548 3.86167 5.89553L4.58414 16.0152L4.63402 16.0117L4.58414 16.0152C4.63014 16.6583 4.91805 17.2602 5.38992 17.6995C5.86179 18.1389 6.48258 18.3832 7.12734 18.3833H14.024C14.6688 18.3832 15.2896 18.1389 15.7615 17.6995C16.2333 17.2602 16.5212 16.6583 16.5672 16.0152L16.5174 16.0117L16.5672 16.0152L17.2897 5.89605L17.2897 5.89605L17.2898 5.8946L17.2903 5.88202C17.5071 5.87023 17.7127 5.77891 17.867 5.6246C18.0326 5.45894 18.1257 5.23426 18.1257 4.99999C18.1257 4.76572 18.0326 4.54104 17.867 4.37538C17.7013 4.20972 17.4766 4.11666 17.2424 4.11666H14.5451L14.104 2.79087ZM9.78643 9.06617L9.78651 9.06617L9.78617 9.06331C9.76086 8.84843 9.65757 8.65032 9.49589 8.50655C9.33421 8.36278 9.12538 8.28335 8.90902 8.28332C8.67474 8.28332 8.45006 8.37639 8.28441 8.54204C8.11875 8.7077 8.02568 8.93238 8.02568 9.16666V13.3333H8.02559L8.02577 13.3363L8.03161 13.4338L8.03152 13.4338L8.03187 13.4367C8.05846 13.6603 8.16941 13.8653 8.34207 14.0098C8.51472 14.1543 8.73603 14.2274 8.96079 14.2142C9.18554 14.201 9.39678 14.1025 9.55133 13.9388C9.70589 13.7751 9.7921 13.5585 9.79235 13.3334V13.3333V9.16666H9.79244L9.79226 9.16367L9.78643 9.06617ZM12.867 8.54205C12.7013 8.37639 12.4766 8.28332 12.2424 8.28332C12.0081 8.28332 11.7834 8.37639 11.6177 8.54204C11.4521 8.7077 11.359 8.93238 11.359 9.16666V13.3333C11.359 13.5676 11.4521 13.7923 11.6177 13.9579C11.7834 14.1236 12.0081 14.2167 12.2424 14.2167C12.4766 14.2167 12.7013 14.1236 12.867 13.9579C13.0326 13.7923 13.1257 13.5676 13.1257 13.3333V9.16666C13.1257 8.93238 13.0326 8.7077 12.867 8.54205ZM12.6838 4.11666H8.46753L8.71173 3.38332H12.4396L12.6838 4.11666Z" fill="white" stroke="white" stroke-width="0.1"/>\n' +
      '      </g>\n' +
      '      <defs>\n' +
      '        <clipPath id="clip0_1461_1105">\n' +
      '          <rect width="20" height="20" fill="white" transform="translate(0.575684)"/>\n' +
      '        </clipPath>\n' +
      '      </defs>\n' +
      '    </svg></div>');

    // let test = this.listForm?.nativeElement.querySelectorAll('.admin-list-input');
    //
    // if (test) {
    //   for (let i = 0; i < test.length; i++) {
    //     console.log('key i', test[i].textContent);
    //   }
    // }
  }

  removeList(e: ElementRef<any>): void {
    console.log(e.nativeElement?.remove());
  }

  changeRiderData(): void {
    let dataForServer;
    let riderData = {
      data_ua: {
        riderList: [],
        file: ''
      },
      data_en: {
        riderList: [],
        file: ''
      }
    };
    let riderList: [] = [];
    let riderElementsList = this.listForm?.nativeElement.querySelectorAll('.admin-list-input');
    if (this.riderData) {
      riderData = this.riderData;
    }

    if (riderElementsList) {
      for (let i = 0; i < riderElementsList.length; i++) {
        if (riderElementsList[i].textContent) {
          // @ts-ignore
          riderList.push(riderElementsList[i].textContent);
        }
      }
      // @ts-ignore
      riderData["data_" + this.i18n.lang].riderList = [...riderList];
    }
    dataForServer = JSON.stringify(riderData);

    // если есть данные с сервера, то обновляем их, берем id, куда перезаписать данные
    if (this.riderData) {
      this.apiService.changeRiderData({data: dataForServer, id: this.riderId}).subscribe(data => {
        // this.getContacts();
        console.log('changeRiderData', this.riderData);
      })
    } else {
      // добавляем данные, если это первая запись
      this.apiService.addRiderData({data: dataForServer}).subscribe(data => {
        // this.getContacts();
        console.log('addRiderData', this.riderData);

      })
    }

  }

}
