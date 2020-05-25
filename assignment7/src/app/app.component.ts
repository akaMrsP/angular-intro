import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Project Name, Email, Project Status Dropdown, Submit
  projectForm: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];
  // forbiddenProjectNames = 'Test';

  ngOnInit() {
    this.projectForm = new FormGroup({
      // 'projectName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      // 'projectName': new FormControl(null, [Validators.required, this.forbiddenNames]),
      'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidProjectName], CustomValidators.asyncInvalidProjectName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('Critical')
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  // Below is my solution - Max used a separate file
  // forbiddenNames(control: FormControl): {[s: string]: boolean} {
  //   if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
  //     return {'nameIsForbidden': true};
  //   }
  //   return null;
  // }

  // // Asynchronous version
  // forbiddenNames(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise((resolve, reject) => {
  //     // This should actually be a loop, in case we need a forbiddenProjectNames array
  //     if (control.value === this.forbiddenProjectNames) {
  //       resolve({'nameIsForbidden': true});
  //     } else {
  //       resolve(null);
  //     }
  //   });
  //   return promise;
  // }
}
