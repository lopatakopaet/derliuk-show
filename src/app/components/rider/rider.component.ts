import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {I18nService} from "../../services/i18n.service";

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.scss']
})
export class RiderComponent implements OnInit {
  showModal: boolean;
  currentFile?: string;
  currentRiderList: [] = [];
  riderList_ua: [] = [];
  riderList_en: [] = [];
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
              public i18n: I18nService) {
    this.showModal = true
  }

  ngOnInit(): void {
    this.apiService.getRiderData().subscribe(data => {
      if (data && data.length) {
        this.riderData = JSON.parse(data[0].data);
        let riderId = JSON.parse(data[0].id);
        if (riderId) {
          // @ts-ignore
          this.currentRiderList = this.riderData['data_' + this.i18n.lang].riderList
          // @ts-ignore
          this.currentFile = this.riderData['data_' + this.i18n.lang].file
        }
      }
    })
  }

  onSave(): void {
    this.showModal = false;
  }

}
