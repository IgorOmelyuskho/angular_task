import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalComa'
})
export class DecimalComaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.toString().replace('.', ',');
  }

}
