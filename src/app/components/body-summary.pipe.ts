import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'body-summary'
})
export class BodySummaryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
