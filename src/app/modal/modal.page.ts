import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  answered : String = ""
  state: boolean = true
  constructor(
    private navParams : NavParams) { }

  ngOnInit() {
    // console.log(card)
    console.log(this.navParams.data)
  }

  validarResposta($event){
    this.state = false
    console.log(this.navParams.data)
    console.log(this.answered)
  }
}
