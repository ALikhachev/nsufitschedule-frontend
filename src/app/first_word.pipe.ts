import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'firstWord'
})
export class FirstWordPipe implements PipeTransform {
  transform(value: any): any {
    return value.split(' ')[0];
  }
}
