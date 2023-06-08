import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userId'
})
export class UserIdPipe implements PipeTransform {

  transform(value?: string, ...args: any[]): string {

    if (!value) {
      return ' ';
    }

    const arrStr = value.split('-');

    return arrStr[4] || ' ';
  }

}
