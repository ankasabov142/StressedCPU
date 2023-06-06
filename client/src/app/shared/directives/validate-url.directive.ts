import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[isURL]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateUrlDirective,
      multi: true
    }
  ]
})
export class ValidateUrlDirective implements Validator {
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    try {
      const url = new URL(control.value?.trim());
      if (!url || !url.host || !url.origin) {
        throw true;
      }
    } catch (err) {
      return { isurl: true };
    }

    return null;
  }
}