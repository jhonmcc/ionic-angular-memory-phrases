import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInstructionsPageRoutingModule } from './modal-instructions-routing.module';

import { ModalInstructionsPage } from './modal-instructions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInstructionsPageRoutingModule
  ],
  declarations: [ModalInstructionsPage]
})
export class ModalInstructionsPageModule {}
