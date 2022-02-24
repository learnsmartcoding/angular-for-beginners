import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toPascal' })
export class ToPascalPipe implements PipeTransform {
    transform(value: string) {
        return value.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
            return m.toUpperCase();
        });
    }
}
