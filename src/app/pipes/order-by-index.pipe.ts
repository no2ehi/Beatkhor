import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByIndex'
})
export class OrderByIndexPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    value.sort((a, b) => a.position - b.position);
    console.log(value);
    return value;
  }

}
