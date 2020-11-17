import { ModalPage } from './../modal/modal.page';
import { Component } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cards : any[] = [{phrase: 'hello', answer: 'hola', trys: 2, done: 0}]

  constructor(
    private alertCtrl : AlertController,
    private toastCtrl : ToastController,
    private modalCtrl : ModalController
    ){
      let listCards = localStorage.getItem('cardsBD')
      if (listCards != null){
        this.cards = JSON.parse(listCards)
      }
    }

  async openModal(card : any){
    let modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'custom-modal',
      componentProps: card,
      showBackdrop: true,
      backdropDismiss: true,
      keyboardClose: false
    })
    // console.log(card)

    await modal.present()
    let resModal = await modal.onDidDismiss()
    
    // this.updateLocalStorage()
    console.log('from modal\n' + resModal.data)
    card.done = resModal.data.done
    console.log(this.cards)
  }

  exibeInfo(){
    alert('yay')
  }

  async openCardAsk(card : any){
    let openCard = await this.alertCtrl.create({
      subHeader: 'Qual a tradução da frase:',
      message: '<h4>' + card.phrase + '</h4>',
      cssClass: 'askCard',
      inputs: [{
        name: 'answer',
        type: 'text',
        placeholder: 'insira a resposta aqui'
      }],
      buttons: [{
        text: 'Ver',
        cssClass: 'warning',
        handler: (form) => {
          if (form.answer.trim().toLowerCase() == card.answer.toLowerCase()){
            this.openCardAnswer(card)
          }
          else{
            if (card.trys > 1){
              this.openCardAsk(card)
              console.log(card)
            }
            else{
              card.trys = 3
              card.done = false
              this.updateLocalStorage()
              // console.log('exedeu tentativa')
              return
            }          
          }
        }
      },
      {
        text: 'Tentativas restantes: ' + card.trys
      }]
    })
    await openCard.present()
  }

  async openCardAnswer(card : any){
    let cardAnswer = await this.alertCtrl.create({
      header: 'Correto!',
      subHeader: card.phrase,
      message: card.answer,
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]      
    })
    card.trys = 3
    card.done = true
    this.updateLocalStorage()
    await cardAnswer.present()
  }

  async addCard(){
    let addCard = await this.alertCtrl.create({
      header: "Adicionar Cartão",
      cssClass: 'custom-alert',
      inputs: [{
        name: 'phrase',
        type: 'text',
        placeholder: 'EX: Hi write the phrase here!'
      },
      {
        name: 'answer',
        type: 'text',
        placeholder: 'EX: Oi escreva a frase aqui!'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'Cancel',
        cssClass: 'danger',
        handler: () => {
          console.log('Cancelado')
        }
      },
      {
        text: 'Salvar',
        cssClass: 'primary',
        handler: (form) => {
          this.addItem(form)
        }
      }]
    })
    await addCard.present()
  }

  async addItem(form: any){
    if (form.phrase.trim().length < 1 || form.answer.trim().length < 1){
      let toast = await this.toastCtrl.create({
        header: 'É necessário inserir a frase e sua tradução',
        duration: 3000, 
        position: 'middle'
      })
      return toast.present()
    }
    form.phrase = form.phrase.trim()
    form.answer = form.answer.trim()
    form['trys'] = 2
    form['done'] = 0
    // console.log(form)
    this.cards.push(form)
    // console.log(this.cards)
    this.updateLocalStorage()
  }

  updateLocalStorage(){
    localStorage.setItem('cardsDB', JSON.stringify(this.cards))
  }

  deleteCard(card : any){
    this.cards = this.cards.filter(cardsArray => card != cardsArray)
    this.updateLocalStorage()
  }

}
