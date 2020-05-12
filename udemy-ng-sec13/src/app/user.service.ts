// import { Injectable, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class UserService {
    // Could use this - but there is a better way! (for cross-components ONLY)
    // activatedEmitter = new EventEmitter<boolean>();
    activatedEmitter = new Subject<boolean>();
}
