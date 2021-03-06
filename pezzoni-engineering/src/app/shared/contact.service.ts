import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Message } from './message.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
  private contactURL = environment.apiUrl + 'contact';

  constructor(private http: HttpClient) {}

  sendMessage(name: string, email: string, subject: string, description: string) {
    const contactMessage: Message = {
      name: name,
      email: email,
      subject: subject,
      description: description
    };

    this.http.post<{ message: string, sentMessage: Message }>(this.contactURL, contactMessage)
      .subscribe((responseData) => {
        console.log(responseData.message);
        // Client-side success message here
      });
  }
}
