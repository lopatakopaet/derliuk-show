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

            // children: [
            //   {
            //     path: 'item-details/:id',
            //     pathMatch: 'full',
            //     component: ItemDetailsComponent,
            //   }
            // ]
          },
          {
            path: 'parody-theater',
            pathMatch: 'full',
            component: ParodyTheaterComponent,
            // children: [
            //   {
            //     path: 'item-details/:id',
            //     pathMatch: 'full',
            //     component: ItemDetailsComponent,
            //   }
            // ]
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
      }
    ],
  },
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
