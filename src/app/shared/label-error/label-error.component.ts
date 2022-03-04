import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-label-error',
  templateUrl: './label-error.component.html',
  styleUrls: ['./label-error.component.css']
})
export class LabelErrorComponent {
  @Input()
  public control!: AbstractControl | null;

  public get errors(): { invalid: boolean; message: string }[] {
    const control = this.control;
    if (
      (control?.invalid || (control?.errors && control?.errors.invalid)) &&
      (control?.dirty || control?.touched)
    ) {
      return [{ invalid: true, message: control?.errors?.message }];
    }

    return [{ invalid: false, message: '' }];
  }
}
