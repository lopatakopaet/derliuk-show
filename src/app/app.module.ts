import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './main/main.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { RiderComponent } from './components/rider/rider.component';
import { ButtonComponent } from './components/button/button.component';
import { ButtonRequestCallComponent } from './components/button-request-call/button-request-call.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PopularItemComponent } from './components/popular-item/popular-item.component';
import { BalletShowComponent } from './components/ballet-show/ballet-show.component';
import { ParodyTheaterComponent } from './components/parody-theater/parody-theater.component';
import { CommentComponent } from './components/comment/comment.component';
import {SwiperModule} from "swiper/angular";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    GalleryComponent,
    MainPageComponent,
    FooterComponent,
    RiderComponent,
    ButtonComponent,
    ButtonRequestCallComponent,
    ContactsComponent,
    PopularItemComponent,
    BalletShowComponent,
    ParodyTheaterComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    AngularSvgIconModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
