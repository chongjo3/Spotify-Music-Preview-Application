import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: { userName: ""; password: ""; _id: ""; } = { userName: "",password: "", _id: "" };
  warning: String = "";
  loading: boolean = false;
  private loginSub: any;
  constructor(private router: Router, private _AuthService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    if (this.user.userName!="" && this.user.password!=""){
      this.loading = true;
      this.loginSub = this._AuthService.login(this.user).subscribe(
         success => {
          this.loading = false;
          localStorage.setItem('access_token', success.token);
          this.router.navigate(['/newReleases']);
        },
        err =>{
          this.warning = err.error.message;
          this.loading = false;
        }
      )};
   }
}
