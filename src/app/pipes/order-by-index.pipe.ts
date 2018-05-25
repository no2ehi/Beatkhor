import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByIndex'
})
export class OrderByIndexPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    value.sort((a, b) => a.position - b.position);

    for (let c = 0; c <= value.length; c++) {
      if (value[c] && value[c].slug === '') {
        value.splice(c, 1);
      }
    }
    return value;
  }

}
