import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from "@angular/common";

@Pipe({
  name: 'time',
  pure: false,
})
export class TimePipe implements PipeTransform {
  transform(value: string): string {
    const timestamp = new Date(value);
    const now = new Date();
    if (timestamp.getDate() !== now.getDate()) {
      return formatDate(timestamp, 'dd/MM/yyyy', 'en-US');
    }
    const hourDif = now.getHours() - timestamp.getHours();
    if (hourDif) {
      return hourDif === 1 ? `${hourDif} hour ago` : `${hourDif} hours ago`;
    }
    const minDif = now.getMinutes() - timestamp.getMinutes();
    if (minDif) {
      return minDif === 1 ? `${minDif} minute ago` : `${minDif} minutes ago`;
    }
    const secDif = now.getSeconds() - timestamp.getSeconds();
    return secDif === 1 ? `${secDif} second ago` : `${secDif} seconds ago`
  }
}
