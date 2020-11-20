import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-instructions',
  templateUrl: './modal-instructions.page.html',
  styleUrls: ['./modal-instructions.page.scss'],
})
export class ModalInstructionsPage implements OnInit {

  constructor(private ctrlModal : ModalController) { }

  ngOnInit() {
  }

  fecharModal(){
    this.ctrlModal.dismiss()
  }

}
