import { Directive, Input } from '@angular/core';
import { AbstractControl, NgModel, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[matchInput]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateMatchInputDirective,
      multi: true
    }
  ]
})
export class ValidateMatchInputDirective implements Validator {
  @Input() matchInput!: NgModel;
  private subscription: Subscription | null = null;

  constructor() { }

  private cancelSubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.cancelSubscription();

    this.subscription = this.matchInput.control.valueChanges?.subscribe(() => {
      control.updateValueAndValidity({ onlySelf: true });
    }) || null

    return control.value?.trim() === this.matchInput.value?.trim()
      ? null
      : { matchinput: { matchInput: this.matchInput.name } };
  }

  ngOnDestroy(): void {
    this.cancelSubscription();
  }
}
