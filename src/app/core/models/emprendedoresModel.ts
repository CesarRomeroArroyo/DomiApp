export class EmprendedoresModel {
    constructor(
        public id:number = 0,
        public nombre:string = '',	
        public tip_ide:string = '',	
        public num_ide:string = '',
        public direccion:string = '',	
        public telefono:number = 0,	
        public email:string = '',
        public tipo:number = 0,	
        public usuario:string = '',	
        public password:string = '',	
        public lon:string = '',	
        public lat:string = '',	
        public estado:number = 0,	
        public pago_domiciliario:number = 0,
        public valor_domicilio:number = 0,
        public cliente:string = '',
        public idunico:string = ''
        ) {}
}