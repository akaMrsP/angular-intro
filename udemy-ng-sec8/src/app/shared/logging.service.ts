/* You do not *need* @Injectable here, because this service will
*  not use another service,
*   however, newer versions of Angular are adding @Injectable
*       as convention
*   It is a good habit to develop, because it might become
*       required in the future
*/

import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class LoggingService {
    logStatusChange(status: string) {
        console.log('A server status changed, new status: ' + status);
    }
}