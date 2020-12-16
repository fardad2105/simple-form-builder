import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
  ) { 
    if (this.authenticationService.userValue) { 
      this.router.navigate(['/']);
  }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formFields() {return this.loginForm.controls;}

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      console.log('Login Form Invalid')
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.formFields.username.value, this.formFields.password.value)
                              .pipe(first())
                              .subscribe(
                                data => {
                                  this.router.navigate([this.returnUrl])
                                },
                                error => {
                                  this.error = error;
                                  this.loading = false
                                }
                              )
  }

}
