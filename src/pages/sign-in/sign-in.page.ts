import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;


  constructor(
      public events: Events,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      private authenticationService: AuthenticationService,
      private router: Router,
      private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }


  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      const user = loginForm.value.user;
      const password = loginForm.value.password;

      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      this.authenticationService.login(user, password)
          .pipe(first())
          .subscribe(
              data => {
                this.loading.dismiss().then(() => {
                this.router.navigateByUrl('/app/tabs/home');
                // return this.events.publish('user:login');
                });
              },
              error => {
                this.loading.dismiss().then(async () => {
                  const alert = await this.alertCtrl.create({
                    message: error,
                    buttons: [{ text: 'Ok', role: 'cancel' }],
                  });
                  await alert.present();
                });
              });

    }
  }
}
