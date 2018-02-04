import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {RestHttpService} from '../../services/restHttp/rest-http.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ForgotPasswordModalComponent {

  emailForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
    private fb: FormBuilder,
    private restHttpService: RestHttpService,
    public toastr: ToastsManager,
  ) {
    this.createEmailForm();
  }

  closeModal() {
      this.dialogRef.close();
  }

  createEmailForm() {
    this.emailForm = this.fb.group({
      email :  ['', Validators.required ]
    });
  }

  sendEmail() {
    const formModel = this.emailForm.value;

    // TODO
    /*this.restHttpService.sendPasswordEmail(<IPasswordEmailInput>{
      email: formModel.email
    })
      .$observable
      .subscribe(
        () => {
          this.toastr.success('Your username and password have been sent to your email.', 'Email succeeded');
          this.closeModal();
        },
        () => {
          this.toastr.error('Sending password email failed.', 'Email failed');
        }
      );*/
  }

}
