import { ModalPage } from './../modal/modal.page';
import { Component } from '@angular/core';
import { AlertController, IonBackdrop, ModalController, ToastController } from '@ionic/angular';

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
    if (resModal.role == 'backdrop'){
      console.log('o modal foi fechado')
      return
    }
    card.done = resModal.data.done
    this.updateLocalStorage()
    console.log(this.cards)
  }

  exibeInfo(){
    alert('yay')
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
