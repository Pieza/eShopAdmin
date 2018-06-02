import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, AlertController } from 'ionic-angular';
import { OrderProvider } from "../../providers/order/order";
import { Order } from "../../models/order";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-modal-order',
  templateUrl: 'modal-order.html',
})
export class ModalOrderPage {
  order: Order;

  constructor(public nav: NavController, public viewCtrl: ViewController, public navParams: NavParams,
              public alertCtrl: AlertController, public orderProvider: OrderProvider) {
    this.order = navParams.get('order');
  }

  // dismiss modal
  dismiss() {
    this.viewCtrl.dismiss();
  }

  // change status to serving
  serve() {
    this.orderProvider.updateStatus(this.order.id, 'entregando');
    this.dismiss();
  }

  // change status to complete
  complete() {
    this.orderProvider.updateStatus(this.order.id, 'completada');
    this.dismiss();
  }

  // cancel order
  cancel() {
    let alert = this.alertCtrl.create({
      message: '¿Seguro que deseas cancelar esta orden?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Si',
          handler: () => {
            this.orderProvider.updateStatus(this.order.id, 'cancelada');
            this.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
}
