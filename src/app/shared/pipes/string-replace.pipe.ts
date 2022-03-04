import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacestring',
})
export class ReplaceStringPipe implements PipeTransform {
  transform(value: any, arg1: string, arg2: string): any {
    if (!value) {
      return value;
    }
    return value.replace(arg1, arg2);
  }
}
