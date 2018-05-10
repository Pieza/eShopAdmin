import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AuthService } from "../../services/auth-service";
import { RegisterPage } from "../register/register";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: any;
  password: any;

  constructor(public nav: NavController, public authService: AuthService, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  // login and go to home page
  login() {
    if (!this.email || !this.password) {
      let alert = this.alertCtrl.create({
        message: 'Por favor digita un correo y contraseña válidos.',
        buttons: ['OK']
      });
      return alert.present();
    }

    let loading = this.loadingCtrl.create({
      content: 'Por favor espera...'
    });
    loading.present();

    this.authService.login(this.email, this.password).then(authData => {
      loading.dismiss();
      this.nav.setRoot(HomePage);
    }, error => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
    //this.nav.setRoot(HomePage);
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }
}
