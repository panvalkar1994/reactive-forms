import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { forbiddenNameValidator } from './shared/custom-form.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  get userName(){
    return this.registrationForm.controls.userName;
  }

  constructor(private fb:FormBuilder){}

  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3),forbiddenNameValidator(/password/)]],
    password:[''],
    confirmPassword:[''],
    address:this.fb.group({
      city:[''],
      state:[''],
      pincode:['']
    })
  })
  // registrationForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password:new FormControl(''),
  //   confirmPassword:new FormControl(''),
  //   address:new FormGroup({
  //     city:new FormControl(''),
  //     state:new FormControl(''),
  //     pincode:new FormControl('')
  //   })
  // });

  loadApiData(){
    this.registrationForm.setValue({
      userName :'Bruce',
      password:'test',
      confirmPassword:'test',
      address:{
        city:'Gotham',
        state:'Gotham state',
        pincode:'777666'
      }
    });
  }
}
