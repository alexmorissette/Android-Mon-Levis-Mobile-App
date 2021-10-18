import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LieuxPage } from './lieux.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LieuxPageRoutingModule } from './lieux-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: LieuxPage }]),
    LieuxPageRoutingModule,
  ],
  declarations: [LieuxPage]
})
export class LieuxPageModule {}
