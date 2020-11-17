import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  answered : String = ""
  stateAnswer: boolean = false
  verResposta: boolean = false
  stateMessage: boolean  = false
  
  constructor(
    private navParams : NavParams,
    private modalCrtl: ModalController) { }

  ngOnInit() {
    this.answered = ""
    this.stateAnswer = false
    this.verResposta = false
    this.stateMessage = false
    this.navParams.data.done = 0
    // console.log(this.navParams.data)
  }

  validarResposta($event){
    if (this.answered.length < 1){
      this.stateMessage = true
      setTimeout(() => {
        this.stateMessage = false
      }, 3000);
      return
    }

    if (this.answered.trim().toLowerCase() == this.navParams.data.answer.trim().toLowerCase()){
      this.stateAnswer = true
      this.navParams.data.done = 1
      setTimeout(() => {
        this.stateAnswer = false
        this.modalCrtl.dismiss(this.navParams.data)
      }, 4000);
      
    }
    else{
      this.stateAnswer = true
      if (this.navParams.data.trys > 1){
        this.navParams.data.trys -= 1
      }
      else{
        this.navParams.data.done = 2
        setTimeout(() => {
          this.stateAnswer = false
          this.modalCrtl.dismiss(this.navParams.data)
        }, 4000);
        
      }
    }
  
  }

  exibirResposta(){
    this.verResposta = true
    setTimeout(() => {
      this.verResposta = false
    }, 4000);
  }
}
