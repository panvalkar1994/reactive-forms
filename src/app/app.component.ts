import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
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

  get alternateEmails(){
    return this.registrationForm.controls.alternateEmails as FormArray;
  }

  addAletrnateEmails(){
    this.alternateEmails.push(this.fb.control(''));
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
      }),
      alternateEmails:this.fb.array([])
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

  loadApiData(){
    this.registrationForm.patchValue({
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
