import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.scss']
})
export class AdminContactsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.test();
  }

  // test(): void {
  //   db.execute('SELECT * FROM `balletShowItems`',
  //     null,
  //     (err: any, results: any, fields: any) => {
  //       console.log(err, results)
  //     });
  // }

}
