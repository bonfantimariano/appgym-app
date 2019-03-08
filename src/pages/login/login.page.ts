  import {Component, OnInit} from '@angular/core';
  import { FormGroup, Validators, FormBuilder } from '@angular/forms';
  import { Events, LoadingController, AlertController } from '@ionic/angular';
  import {ActivatedRoute, Router} from '@angular/router';

  import { first } from 'rxjs/operators';

  import { AuthenticationService } from '../../_services';

  @Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
  })
  export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public loading: HTMLIonLoadingElement;
    returnUrl: string;

    constructor(
        public events: Events,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder) {}

    ngOnInit() {
        console.log('ngOnInit');
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
                        this.loginForm.reset();
                        return this.router.navigateByUrl(this.returnUrl);
                    });
                  },
                  error => {
                    this.loading.dismiss().then(async () => {
                      const alert = await this.alertCtrl.create({
                        message: error,
                        buttons: [{ text: 'Ok', role: 'cancel' }],
                      });
                      await alert.present();
                      this.loginForm.reset();
                    });
                  });
            }
    }
  }
