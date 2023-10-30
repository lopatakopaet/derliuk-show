import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-admin-ballet-page',
  templateUrl: './admin-ballet-page.component.html',
  styleUrls: ['./admin-ballet-page.component.scss']
})
export class AdminBalletPageComponent implements OnInit {

  data: any = {
    item_name: 'Antre1111111111',
    item_description: 'Казково-легкий, чарівний номер стане красивим відкриттям програми чи івенту. Пориньте разом з нами у феєрію свята.',

  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAll().subscribe(data=>{
      console.log("data",data)
    })
    this.apiService.addBalletShowItems(this.data).subscribe(answer=>{
      console.log("data",answer)
    })
  }

}
