import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-contact-us-modal',
  templateUrl: './contact-us-modal.component.html',
  styleUrls: ['./contact-us-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactUsModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContactUsModalComponent>) { }

  closeModal() {
      this.dialogRef.close();
  }

  openEmailClient() {
    const email = 'mailto:support@gmail.com';
    location.href = 'mailto:' + email;
  }

  ngOnInit() {
  }

}
