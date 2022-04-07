/*********************************************************************************
* WEB422 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students.
* 
* Name: Joshua Chong Student ID: 114376205 Date: 3/27/2022
*
********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  token: any;
  title = 'a5';
  searchString: String = "";

  constructor(private router: Router, private _AuthService: AuthService){}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this._AuthService.readToken();
      }
    });
  }

  handleSearch(){
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
