import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    public snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      birthdate: ['', [Validators.required, CustomValidators.birthYear]],
      email: ['', [Validators.required, Validators.email]],
      githubUser: ['', Validators.required]
    });
  }


  ngOnInit() {
  }

  onSubmit() {
    let user = this.userForm.value;
    let ramdonId = Date.now().toString();
    let config = new MatSnackBarConfig();
    config.duration = 5000;

    this.cookieService.set(ramdonId, JSON.stringify(user));
    this.snackBar.open('User created successfully', null, config);
    this.router.navigate(['dashboard/UserList', ramdonId])
  }

  get formUser() { 
    return this.userForm.controls; 
  }

}

export class CustomValidators {
  static birthYear(c: FormControl): ValidationErrors {
    var ageDifMs = Date.now() - new Date(c.value).getTime();
    var ageDate = new Date(ageDifMs);
    let isValid = Math.abs(ageDate.getUTCFullYear() - 1970) > 3;

    const message = {
      'years': {
        'message': 'Invalid date'
      }
    };
    return isValid ? null : message;
  }
} 
