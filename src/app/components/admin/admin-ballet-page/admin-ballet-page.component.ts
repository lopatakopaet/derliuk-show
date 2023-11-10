import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Item} from "../../../../interfaces/Item";

@Component({
  selector: 'app-admin-ballet-page',
  templateUrl: './admin-ballet-page.component.html',
  styleUrls: ['./admin-ballet-page.component.scss']
})
export class AdminBalletPageComponent implements OnInit {

  balletShowItems?: Item[];

  data: any = {
    title: 'Antre3',
    descriptionUa: 'Казково-легкий, чарівний номер стане красивим відкриттям програми чи івенту. Пориньте разом з нами у феєрію свята.',
    // descriptionEng: "",
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getBalletShowItems().subscribe(data=>{
      this.balletShowItems = data
      console.log(data);
    })

    // рабочий запрос
    // this.apiService.addBalletShowItem(this.data).subscribe(answer=>{
    //   console.log("data",answer)
    // })



  }

   savePhoto(formHtml: HTMLFormElement): void {
     this.apiService.saveFile(formHtml).then( answer =>{
       console.log("data",answer)
     })


    //  /** @type {HTMLFormElement} */
    //  const form: HTMLFormElement | null = formHtml;
    //  const url = new URL(form?.action);
    //  const formData = new FormData(form);
    //  // @ts-ignore
    //   const searchParams = new URLSearchParams(formData);
    //
    //  /** @type {Parameters<fetch>[1]} */
    //  const fetchOptions = {
    //    method: form.method, body: undefined
    //
    //  };
    //
    //  if (form.method.toLowerCase() === 'post') {
    //    if (form.enctype === 'multipart/form-data') {
    //      // @ts-ignore
    //      fetchOptions.body = formData;
    //    } else {
    //      // @ts-ignore
    //      fetchOptions.body = searchParams;
    //    }
    //  } else {
    //    // @ts-ignore
    //    url.search = searchParams;
    //  }
    //  console.log('formData', formData);
    //  console.log("fetchOptions", fetchOptions);
    //
    //
    // fetch(url, fetchOptions)
    //   .then(response => response.json())
    //   .then(data => console.log('data', data));

     // $event.preventDefault();
  }

}
