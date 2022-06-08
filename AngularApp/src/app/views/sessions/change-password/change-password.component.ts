import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ActivatedRoute } from '@angular/router';
import { AppconstantsService } from 'app/shared/services/appconstants.service';
import { HttpClient } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { SRSUserApiModel } from 'app/shared/models/SRSUserApiModel';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: egretAnimations
})
export class ChangePasswordComponent implements OnInit {
  signupForm: FormGroup;
  userGuid: string;
  userEmail: string;
  matcher = new MyErrorStateMatcher();

  passwordChangedError: string = '';
  passwordChangedSuccess: boolean = false;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private appConstantService: AppconstantsService, private http: HttpClient) { }
  ngOnInit() {
    this.signupForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validators: this.checkPasswords });
    this.activatedRoute.queryParams.subscribe(params => {
      this.userGuid = params.id;
      this.userEmail = params.email;
      let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/GetEmail/" + this.userGuid;
      this.http.get<string>(url).subscribe(
        email => {
          this.userEmail = email;
        }
      );
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }
  onSubmit() {
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      console.log(this.signupForm.value);
      var updateUser = new SRSUserApiModel()
      updateUser.Email = this.userEmail;
      updateUser.Password = this.signupForm.get('password').value;
      this.changePasswordAPI(updateUser).subscribe((result) => {
        if (result == "") {
          this.passwordChangedError = '';
          this.passwordChangedSuccess = true;
        }
        else {
          this.passwordChangedError = result;
          this.passwordChangedSuccess = false;
        }
      });
    }
  }

  changePasswordAPI(item: SRSUserApiModel): Observable<any> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/ChangePassword";
    return this.http.post<SRSUserApiModel[]>(url, item);
  }
}


