import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-jalaali';

@Pipe({
  name: 'jalaaliDate'
})
export class JalaaliDatePipe implements PipeTransform {

  transform(date): any {
    moment.loadPersian({
      usePersianDigits: true,
      dialect: 'persian-modern'
    });
    return moment(new Date(date)).format('jDD jMMMM jYYYY');
  }

}
