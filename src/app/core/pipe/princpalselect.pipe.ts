import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'principalSelectPipe'
})
export class PrincipalSelectPipe implements PipeTransform {
  
  transform(value: string): string {
    return value == "1" ? "Si" : "No";
  }
}
