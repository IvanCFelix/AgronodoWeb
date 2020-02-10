import { UsernameValidator } from './../../validators/UsernameValidator ';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  settingActive = 1;
  user: FormGroup;

  constructor() { 

    
    this.user = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.required]),
      lastname: new FormControl("", Validators.required),
      number: new FormControl("", [Validators.required]),
      username: new FormControl("", [
        Validators.required,
        UsernameValidator.cannotContainSpace
      ])
    });
  }

  ngOnInit() {
  }

  update(user){
    console.log(user)
  }
}
