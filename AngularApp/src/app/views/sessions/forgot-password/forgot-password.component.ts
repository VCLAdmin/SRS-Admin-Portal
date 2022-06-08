import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail;
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
   async submitEmail() {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    await this.delay(5000);
    this.snackBar.open('An Email has been sent to your account', 'Forgot Password', {
      duration: 2000,
    });
    this.submitButton.disabled = false;
    this.progressBar.mode = 'determinate';
  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
