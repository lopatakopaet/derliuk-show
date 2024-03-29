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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AdminItemComponent } from './components/admin/admin-item/admin-item.component';
import {CdkDrag, CdkDropList, CdkDropListGroup, DragDropModule} from "@angular/cdk/drag-drop";
import { LoginComponent } from './components/admin/login/login.component';
import {FormsModule} from "@angular/forms";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthInterceptor} from "./interceptors/auth-interceptor.service";
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { AdminSliderCommentsComponent } from './components/admin/admin-slider-comments/admin-slider-comments.component';
import {AdminCommentsComponent} from "./components/admin/admin-comments/admin-comments.component";
import { AdminSliderGalleryComponent } from './components/admin/admin-slider-gallery/admin-slider-gallery.component';
import { AdminSliderGalleryItemComponent } from './components/admin/admin-slider-gallery-item/admin-slider-gallery-item.component';
import { OrderCallModalComponent } from './components/order-call-modal/order-call-modal.component';
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
    AdminItemComponent,
    LoginComponent,
    SuccessModalComponent,
    AdminSliderCommentsComponent,
    AdminCommentsComponent,
    AdminSliderGalleryComponent,
    AdminSliderGalleryItemComponent,
    OrderCallModalComponent,
    // ModalOutletComponent,
    // PortalDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SwiperModule,
    AngularSvgIconModule.forRoot(),
    HttpClientModule,
    DragDropModule,
    FormsModule
  ],
  providers: [
    ApiService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule {}
