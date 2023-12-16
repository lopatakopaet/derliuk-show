import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {I18nService} from "../../services/i18n.service";
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.scss']
})
export class RiderComponent implements OnInit {
  showModal: boolean;
  lang: LangItem = dictionary;
  riderData: {
    data_ua: {
      riderList: [];
      file: string;
    };
    data_en: {
      riderList: [];
      file: string;
    };
    [key: string]: any;
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
    this.getRiderData()
  }

  getRiderData(): void {
    this.apiService.getRiderData().subscribe(data => {
      if (data && data.length) {
        this.riderData = JSON.parse(data[0].data)
        // this.riderId = JSON.parse(data[0].id);
      }
    })
  }

  onSave(): void {
    this.showModal = false;
  }

}
