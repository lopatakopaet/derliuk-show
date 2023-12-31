import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {GalleryComponent} from "./components/gallery/gallery.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {RiderComponent} from "./components/rider/rider.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {ParodyTheaterComponent} from "./components/parody-theater/parody-theater.component";
import {BalletShowComponent} from "./components/ballet-show/ballet-show.component";
import {ItemDetailsComponent} from "./components/item-details/item-details.component";
import {AdminMainComponent} from "./components/admin/admin-main/admin-main.component";
import {AdminBalletPageComponent} from "./components/admin/admin-ballet-page/admin-ballet-page.component";
import {AdminItemDetailsComponent} from "./components/admin/admin-item-details/admin-item-details.component";
import {AdminRiderComponent} from "./components/admin/admin-rider/admin-rider.component";
import {AdminGalleryComponent} from "./components/admin/admin-gallery/admin-gallery.component";
import {AdminContactsComponent} from "./components/admin/admin-contacts/admin-contacts.component";
import {LoginComponent} from "./components/admin/login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
        children: [
          {
            path: '',
            redirectTo: '/ballet-show',
            // pathMatch: 'prefix',
            pathMatch: 'full',
          },
          {
            path: 'ballet-show',
            pathMatch: 'full',
            component: BalletShowComponent,
          },
          {
            path: 'parody-theater',
            pathMatch: 'full',
            component: BalletShowComponent,
            // component: ParodyTheaterComponent,
          }
        ]
      },
      {
        path: 'gallery',
        pathMatch: 'full',
        component: GalleryComponent,
      },
      {
        path: 'rider',
        pathMatch: 'full',
        component: RiderComponent,
      },
      {
        path: 'contacts',
        pathMatch: 'full',
        component: ContactsComponent,
      },
      {
        path: 'ballet-show/item-details/:id',
        pathMatch: 'full',
        component: ItemDetailsComponent,
      },
      {
        path: 'parody-theater/item-details/:id',
        pathMatch: 'full',
        component: ItemDetailsComponent,
      },

    ],
  },
  {
    path: 'admin',
    component: AdminMainComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'ballet-page',
        pathMatch: 'full',
        component: AdminBalletPageComponent,
      },
      {
        path: 'ballet-page/item-details/:id',
        pathMatch: 'full',
        component: AdminItemDetailsComponent,
      },
      {
        path: 'parody-page',
        pathMatch: 'full',
        component: AdminBalletPageComponent,
      },
      {
        path: 'parody-page/item-details/:id',
        pathMatch: 'full',
        component: AdminItemDetailsComponent,
      },
      {
        path: 'gallery',
        pathMatch: 'full',
        component: AdminGalleryComponent,
      },
      {
        path: 'rider',
        pathMatch: 'full',
        component: AdminRiderComponent,
      },
      {
        path: 'contacts',
        pathMatch: 'full',
        component: AdminContactsComponent,
      },
    ]
  },
  {path: 'login',
    component: LoginComponent,},
  { path: '**', component: MainComponent },
  // {
  //   path: 'main',
  //   loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  //
  // },
  // {
  //   path: 'admin',
  //   component: LoginComponent
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
