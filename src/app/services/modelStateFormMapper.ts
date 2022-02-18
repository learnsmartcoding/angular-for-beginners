import { AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModelState } from 'src/app/models/modelState.model';
import { camelCase } from './camelCase';

export interface FieldMapping {
  [key: string]: string;
}

/**
 * This will map the model state from api(bad request) to the form control(form builder)
 * @param form the root form control/group
 * @param errorRes the error response
 */
export const modelStateFormMapper = (
  form: AbstractControl,
  errorRes: HttpErrorResponse,
  fieldMapping: FieldMapping
): string[] => {
  const errors = [];

  if (errorRes.status === 400) {
    const modelError = <ModelState>errorRes?.error.errors;

    for (const fieldName in modelError) {
      if (modelError.hasOwnProperty(fieldName)) {
        const newFieldName = (
          fieldMapping[camelCase(fieldName)] || camelCase(fieldName)
        ).split('.');

        let control: AbstractControl  | null= form;

        newFieldName.forEach(name => {
          if (control) {
            const camelCaseFieldName =
              fieldMapping[camelCase(name)] || camelCase(name);

            control = control.get(camelCaseFieldName);
          }
        });

        if (control) {
          control.setErrors({
            invalid: true,
            message: modelError[fieldName]
          });
        } else {    
          errors.push(modelError[fieldName]); 
        }
      }
    }
  } else {
      // this happens when a property is not having issue but something else is wrong and returned 400 error
    errors.push('something went wrong');
  }

  return errors;
};
