import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Erreur404PageRoutingModule } from './erreur404-routing.module';

import { Erreur404Page } from './erreur404.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Erreur404PageRoutingModule
  ],
  declarations: [Erreur404Page]
})
export class Erreur404PageModule {}
