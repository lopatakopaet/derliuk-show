import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";
import {I18nService} from "../../services/i18n.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  hrefPageName: string = "ballet-show"// название страницы из url
  isBalletPage: boolean = true;
  lang: LangItem = dictionary;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public i18n: I18nService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let href = this.router.url;
      this.hrefPageName = href.split('/').slice(-1).join();
      this.isBalletPage = this.hrefPageName == "ballet-show";
    })
  }

}
