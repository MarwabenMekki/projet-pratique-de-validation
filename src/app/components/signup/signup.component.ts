import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  test = true;
  path: string = "";
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService:UserService) { }

  ngOnInit(): void {
    this.path = this.router.url;
    console.log("here path", this.path);

    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(5)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      confirmPassword: ["", [Validators.required]],

    });
  }

  signup() {

    console.log("here signup", this.signupForm.value);
    if (this.path == "/subscription") {
      this.signupForm.value.role = "employee";
    } else {
      this.signupForm.value.role = "admin";
    }

    this.userService.signup(this.signupForm.value).subscribe(
      (response) => {
        console.log("here response after signup", response.msg);
      }
    );
  }

  matchPwd() {
    let pwd = this.signupForm.value.password;
    let confirmPwd = this.signupForm.value.confirmPassword;

    if (confirmPwd != "") {
      this.test = false;
    }

    if (pwd == confirmPwd) {
      this.test = true;
    } else {
      this.test = false;
    }
  }
}
