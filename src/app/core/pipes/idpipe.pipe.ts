import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idpipe'
})
export class IdpipePipe implements PipeTransform {

  transform(data:number, Data:any): string {
   let valor:string;
   for(let info in Data){
     if(Data[info].id==data){
        valor=Data[info].nombre || Data[info].razon_social ||  Data[info].direccion;
     }
   }
    return valor;
  }

  

}
