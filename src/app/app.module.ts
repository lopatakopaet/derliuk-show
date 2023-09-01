import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { RiderComponent } from './rider/rider.component';
import { ButtonComponent } from './button/button.component';
import { ButtonRequestCallComponent } from './button-request-call/button-request-call.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PopularItemComponent } from './popular-item/popular-item.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
