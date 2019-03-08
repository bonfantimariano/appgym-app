import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Events, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';

import {AlertService, UserService} from '../../_services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signupForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
      public events: Events,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      private alertService: AlertService,
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      gymName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log('Form is not valid yet, current value:', signupForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      this.userService.register(this.signupForm.value)
          .pipe(first())
          .subscribe(
              data => {
                this.loading.dismiss().then(async () => {
                  const alert = await this.alertCtrl.create({
                    message: 'Registration successful',
                    buttons: [
                      {
                        text: 'OK',
                        handler: () => {
                          console.log('OK clicked');
                          this.router.navigate(['/login']);
                        }
                      }
                    ]
                  });
                  await alert.present();
                });
              },
              error => {
                this.loading.dismiss().then(async () => {
                  const alert = await this.alertCtrl.create({
                    message: error,
                    buttons: [{ text: 'Ok', role: 'cancel' }],
                  });
                  await alert.present();
                  this.signupForm.reset();
                });
              });

    }
  }

}
