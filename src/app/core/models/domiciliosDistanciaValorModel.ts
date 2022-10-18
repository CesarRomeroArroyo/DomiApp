export class DomiciliosDistanciaValorModel
{
    id: number;
    desde: string;	
    hasta: string;	
    valor: number;	
    cliente: string;	
    constructor() {
        this.id = 0;	
        this.desde = '';	
        this.hasta= '';	
        this.valor= 0;	
        this.cliente='';
    }
}