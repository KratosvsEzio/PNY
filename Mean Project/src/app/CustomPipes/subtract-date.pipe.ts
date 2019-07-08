import { Pipe, PipeTransform } from '@angular/core';
import { add, subtract } from 'add-subtract-date';

@Pipe({
  name: 'subtractDate'
})
export class SubtractDatePipe implements PipeTransform {

  transform(value: any, ...args): any {
    const d: Date = new Date();
    const difference = value.getDate() - d.getDate();
    // const fortyDaysBack = subtract(d, 40, 'days');
    console.log(difference, 'asdassdas');
    return null;
  }

}
