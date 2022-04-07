import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerUser: { userName: ""; password: ""; password2: ""; } = { userName: "",password: "",password2: "" };
  warning: String = "";
  success: boolean = false;
  loading: boolean = false;
  private registerSub: any;
  constructor(private _AuthService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    if (this.registerUser.userName!="" && this.registerUser.password!="" && this.registerUser.password2!=""){
      this.loading = true;
      this.registerSub = this._AuthService.register(this.registerUser).subscribe(
         data => {
          this.success = true;
          this.warning = ""; 
          this.loading=false;
        },
        err =>{
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      )};
   }
     
  ngOnDestroy(): void {
    this.registerSub.unsubscribe();
  }

}
