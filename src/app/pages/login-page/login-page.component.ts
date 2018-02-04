import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoreService} from '../../services/store/store.service';
import {ForgotPasswordModalComponent} from '../../sub-sections/forgot-password-modal/forgot-password-modal.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ILoginInput, RestHttpService} from '../../services/restHttp/rest-http.service';

@Component({
  moduleId: module.id,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginPageComponent implements OnInit {

  forgotPasswordModalConfig: MatDialogConfig = new MatDialogConfig;
  loginForm: FormGroup;
  loading = false;
  keepLoggedIn = false;

  constructor(
    public toastr: ToastsManager,
    public dialog: MatDialog,
    private vcr: ViewContainerRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private restHttpService: RestHttpService,
    private authService: AuthService,
    private storeService: StoreService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.createLoginForm();
    this.forgotPasswordModalConfig.width = '400px';
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // if user redirected here because they tried going to a protected route without being logged in show modal
      const notLoggedInError = params['notLoggedInError'];
      if (notLoggedInError) {
        this.toastr.error('Please login first', 'Error');
      }
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName :  ['', Validators.required ],
      password :  ['', Validators.required ]
    });
  }

  login() {
    this.loading = true;
    const formModel = this.loginForm.value;

    this.restHttpService.getLogin(<ILoginInput>{
      username: formModel.userName,
      password: formModel.password
    })
    .$observable
    .subscribe(
      response => {
        this.authService.setToken(response.token, this.keepLoggedIn);
        this.storeService.loadMeData();
        this.router.navigate(['/'], { queryParams: { justLoggedIn: true }});
      },
      error => {
        console.log('getLogin returned error.');
        console.log(error);
        this.toastr.error('Please check username and password are correct', 'Login failed');
        this.loading = false;
      }
    );
  }

  openForgotPasswordModal(): void {
    this.dialog.open(ForgotPasswordModalComponent, this.forgotPasswordModalConfig);
  }
}
