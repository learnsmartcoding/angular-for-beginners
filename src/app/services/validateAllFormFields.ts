import { FormGroup, FormControl, FormArray } from '@angular/forms';

export const validateAllFormFields = (formGroup: FormGroup) => {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      /** clear the error state that was added by the api. see modelStateFormMapper function*/
      control.updateValueAndValidity();
      control.markAsDirty({ onlySelf: true });
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    } else if(control instanceof FormArray){
      validateArrayFormFields(control);
      control.markAsTouched({onlySelf : true})
    }
  });
};


export const validateArrayFormFields = (formGroup: FormArray) => {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        /** clear the error state that was added by the api. see modelStateFormMapper function*/
        control.updateValueAndValidity();
        control.markAsDirty({ onlySelf: true });
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        validateAllFormFields(control);
      } else if(control instanceof FormArray){
        //validateAllFormFields(control);
      }
    });
  };