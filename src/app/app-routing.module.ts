import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {GalleryComponent} from "./gallery/gallery.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {RiderComponent} from "./rider/rider.component";
import {ContactsComponent} from "./contacts/contacts.component";

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'main',
    // pathMatch: 'full',
    component: MainComponent,
    children: [
      {
        path: '',
        // pathMatch: 'full',
        component: MainPageComponent,
      },
      {
        path: 'gallery',
        // pathMatch: 'full',
        component: GalleryComponent,
      },
      {
        path: 'rider',
        // pathMatch: 'full',
        component: RiderComponent,
      },
      {
        path: 'contacts',
        // pathMatch: 'full',
        component: ContactsComponent,
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
