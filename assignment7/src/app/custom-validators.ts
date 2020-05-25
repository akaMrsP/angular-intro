import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {
    // key          : value     pair
    // {[s: string] : boolean}
    static invalidProjectName(control: FormControl): {[s: string]: boolean} {
        if (control.value === 'Test') {
            return {'nameIsForbidden': true};
        }
        return null;
    }

    static asyncInvalidProjectName (control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise((resolve, reject) => {
            if (control.value === 'Tester') {
                resolve ({'nameIsForbidden': true});
            } else {
                resolve (null);
            }
        });
        return promise;
    }
    
}