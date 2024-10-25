import {Directive, forwardRef, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[appDivisor]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DivisorDirective),
      multi: true
    }
  ]
})
export class DivisorDirective {
  @Input('appDivisor')
  divisor = '1';

  validate(control: AbstractControl): ValidationErrors | null {
    try {
      const actualValue = control.value;
      const divisor = parseFloat(this.divisor);
      return actualValue % divisor === 0 ? null : {appDivisor: true};
    } catch (error) {
      return {appDivisor: true};
    }
  }
}
