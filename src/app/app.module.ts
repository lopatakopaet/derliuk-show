import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
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
// import {SwiperModule} from "swiper/angular";
import { OrderShowModalComponent } from './components/order-show-modal/order-show-modal.component';
import { LeaveFeedbackModalComponent } from './components/leave-feedback-modal/leave-feedback-modal.component';
import { SliderCommentComponent } from './components/slider-comment/slider-comment.component';
import { SliderGalleryComponent } from './components/slider-gallery/slider-gallery.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminMenuComponent } from './components/admin/admin-menu/admin-menu.component';
import { AdminBalletPageComponent } from './components/admin/admin-ballet-page/admin-ballet-page.component';
import { AdminItemDetailsComponent } from './components/admin/admin-item-details/admin-item-details.component';
import { AdminRiderComponent } from './components/admin/admin-rider/admin-rider.component';
import { AdminGalleryComponent } from './components/admin/admin-gallery/admin-gallery.component';
import { AdminContactsComponent } from './components/admin/admin-contacts/admin-contacts.component';
import {ApiService} from "./services/api.service";
import {HttpClientModule} from "@angular/common/http";
// import { ModalOutletComponent } from './components/modal-outlet/modal-outlet.component';

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
    OrderShowModalComponent,
    LeaveFeedbackModalComponent,
    SliderCommentComponent,
    SliderGalleryComponent,
    ItemDetailsComponent,
    AdminMainComponent,
    AdminHeaderComponent,
    AdminMenuComponent,
    AdminBalletPageComponent,
    AdminItemDetailsComponent,
    AdminRiderComponent,
    AdminGalleryComponent,
    AdminContactsComponent,
    // ModalOutletComponent,
    // PortalDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SwiperModule,
    AngularSvgIconModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule {}
