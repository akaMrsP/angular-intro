import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // We could have also passed the form as a parameter to onSubmit()
  @ViewChild('form', {static: false}) subscriptionForm: NgForm;
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  defaultSubscription = 'Advanced';
  submitted = false;
  user = {
    email: '',
    subscription: '',
    password: ''
  };

  onSubmit() {
    console.log(this.subscriptionForm.value);
    this.submitted = true;
    this.user.email = this.subscriptionForm.value.email;
    this.user.subscription = this.subscriptionForm.value.subscription;
    this.user.password = this.subscriptionForm.value.password;
  }
}
