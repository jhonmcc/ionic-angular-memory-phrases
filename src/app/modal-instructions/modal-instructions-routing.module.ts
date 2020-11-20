import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInstructionsPage } from './modal-instructions.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInstructionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInstructionsPageRoutingModule {}
