import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NearByResultPage } from './nearby-result/nearby-result.page';
import { AddStationPage } from './add-station/add-station.page';
import { PaymentPage } from './payment/payment.page';
import { LoyalityPage } from './loyality/loyality.page';
import { ProfilePage } from './profile/profile.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, NearByResultPage, AddStationPage, PaymentPage, LoyalityPage, ProfilePage]
})
export class HomePageModule {}
