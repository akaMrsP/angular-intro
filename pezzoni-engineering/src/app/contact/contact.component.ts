import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('f') contactForm: NgForm;
  name: string;
  email: string;
  subject: string;
  description: string;

  constructor(private contactService: ContactService) {}

  onSubmit() {
    // console.log(this.contactForm.value);
    this.name = this.contactForm.value.name;
    this.email = this.contactForm.value.email;
    this.subject = this.contactForm.value.subject;
    this.description = this.contactForm.value.description;

    this.contactService.sendMessage(this.name, this.email, this.subject, this.description);

    this.contactForm.reset();
  }
}
