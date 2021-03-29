import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { forbiddenNameValidator } from './shared/custom-form.validator';
import { passwordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  registrationForm!:FormGroup;

  get userName(){
    return this.registrationForm.controls.userName;
  }
  get email(){
    return this.registrationForm.controls.email;
  }

  constructor(private fb:FormBuilder){}

  ngOnInit(){
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3),forbiddenNameValidator(/password/)]],
      password:[''],
      confirmPassword:[''],
      email:[''],
      subscribe:[false],
      address:this.fb.group({
        city:[''],
        state:[''],
        pincode:['']
      })
    }, {validator:passwordValidator});

    this.registrationForm.get('subscribe')?.valueChanges
      .subscribe(checkedValue=>{
        const email = this.registrationForm.controls.email;
        if(checkedValue){
          email.setValidators(Validators.required)
        }else{
          email.clearValidators();
        }
        email.updateValueAndValidity();
      })

  }
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
      email:'',
      subscribe:false,
      address:{
        city:'Gotham',
        state:'Gotham state',
        pincode:'777666'
      }
    });
  }
}
