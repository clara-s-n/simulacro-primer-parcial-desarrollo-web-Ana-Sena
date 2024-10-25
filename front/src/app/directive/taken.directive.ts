import {Directive, forwardRef, inject} from '@angular/core';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {ApiRestService} from '../services/api-rest.service';

@Directive({
  selector: '[AppTaken]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TakenDirective),
      multi: true
    },
  ]
})
export class TakenDirective {
  _apiService = inject(ApiRestService);
  async validate(control: AbstractControl) {
    const value = control.value;
    console.log({value});
    if (value === 'pedro') {
      return {appTaken: true};
    }
    return null;
  }
  constructor() { }

}
