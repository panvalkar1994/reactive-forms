import { Component } from '@angular/core';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private fb:FormBuilder){}

  registrationForm = this.fb.group({
    userName: [''],
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
