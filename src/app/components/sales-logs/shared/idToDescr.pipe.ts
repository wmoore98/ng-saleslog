import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'idToDescr'
})
export class IdToDescrPipe implements PipeTransform {
  transform(value: any) {
    let returnStr = '';
    if (value && value.length === 7) {
      const year = value.substr(0, 4);
      const monthNum = value.substr(5, 2);
      const d = new Date(+year, +monthNum - 1, 1);
      const locale = 'en-us';
      const month = d.toLocaleString(locale, {month: 'long'});
      returnStr = `${month} ${year}`;
    }
    return returnStr;
  }

}
