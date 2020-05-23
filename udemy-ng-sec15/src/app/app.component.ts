import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('f') signupform: NgForm;
  defaultQuestion = 'pet';
  questionAnswer = '';
  genders = ['female', 'male', 'other'];
  submitted = false;
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };

  suggestUserName() {
    const suggestedName = 'Superuser';
    //  Cool that we can overwrite fields - but not the best approach:
    // this.signupform.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });

    // setValue - sets the values for the WHOLE form
    // patchValue - sets only specific parts of the form
    // Better approach - take advantage of the form group inside of the form itself:
    this.signupform.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // The onSubmit for passing in the local reference
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  // The onSubmit for use with ViewChild
  onSubmit() {
    console.log(this.signupform);
    this.submitted = true;
    this.user.username = this.signupform.value.userData.username;
    this.user.email = this.signupform.value.userData.email;
    this.user.secretQuestion = this.signupform.value.secret;
    this.user.answer = this.signupform.value.questionAnswer;
    this.user.gender = this.signupform.value.gender;

    // alternatively pass the same object as in setValue() to reset() 
    //   which will reset the form to specific values!
    this.signupform.reset();
  }
}
