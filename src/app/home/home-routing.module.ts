import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { NearByResultPage } from './nearby-result/nearby-result.page';
import { AddStationPage } from './add-station/add-station.page';
import { PaymentPage } from './payment/payment.page';
import { LoyalityPage } from './loyality/loyality.page';
import { ProfilePage } from './profile/profile.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'nearby-results',
    component: NearByResultPage,
  },
  {
    path: 'add-stations',
    component: AddStationPage,
  },
  {
    path: 'loyality',
    component: LoyalityPage,
  },
  {
    path: 'payment',
    component: PaymentPage,
  },
  {
    path: 'profile',
    component: ProfilePage,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
