import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['female', 'male', 'other'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  // Initialize the form *before* it is rendered!  
  ngOnInit() {
              // Takes an object of controls and possibly other FormGroups
    this.signupForm = new FormGroup({
      // controls - key/value pairs
                  // Arguments: 1) initial state/value, 
                            //  2) single validator or array of validators, 
                            //  3) potential asynchronous validators
      // A nested group!
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), // passing in the *reference* to the validator methods, do NOT call them here
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('female'), // default gender is 'female'
      // A FormArray holds an array of controls
      'hobbies': new FormArray([])  // Can initialize with new FormControl, or leave blank
    });

    // *** Observables for Form or specific Controls
    // Track the form state (in general) - could also call on an individual form control
    // Form value:
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    // Form state:
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    // Setting the value(s) ourselves!
    this.signupForm.setValue({
      'userData': {
        'username': 'Amy', 
        'email': 'amy@test.com'
      },
      'gender': 'female',
      'hobbies': []
    });

    // To update only a part of the Form, use patchValue!
    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna'
      }
    });
  }

    onSubmit() {
      console.log(this.signupForm);
      // Don't forget to reset after submission!
      // Resets the radio buttons, too
        // If you don't want this, pass an object to reset() to only reset specific values
      this.signupForm.reset();
    }

    onAddHobby() {
      const control = new FormControl(null, Validators.required);
      // Must be cast to a FormArray
      (<FormArray>this.signupForm.get('hobbies')).push(control);
    }

    getControls() {
      return (<FormArray>this.signupForm.get('hobbies')).controls;
    }

    forbiddenNames(control: FormControl): {[s: string]: boolean} {
      if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
        return {'nameIsForbidden': true};
      }
      // This *should be* null, not {'nameIsForbidden': false}
      return null;
    }

    // Asynchronous Validator!
    forbiddenEmails (control: FormControl): Promise<any> | Observable<any> {
      const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true});
          } else {
            resolve(null);
          }
        }, 1500);
      });
      return promise;
    }
}
