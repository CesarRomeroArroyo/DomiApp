export class CategoriasModel {
    id: number;
    nombre: string;
    estado: number;
    padre:number;
    cliente:string;
    constructor() {
        this.id = 0;
        this.nombre = '';
        this.estado =0;
        this.padre=0;
        this.cliente='';
    }
}