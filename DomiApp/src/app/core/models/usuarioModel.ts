export class UsuarioModel {
    iduser: number;
    user: string;
    pass: string;
    permisos: string
    Nombre: string;
    munuser: number;
    codigo: string;
    hora: string;
    activo: string;
    email: string;
    almacen: number;
    caja: number;
    aplicacion: string;
    basededatos: string;
    per: string;
    fecini: string;
    fecfin: string;
    token: string;
    idunico: string;
    constructor() {
        this.iduser = 0;
        this.user = '';
        this.pass = '';
        this.permisos = ''
        this.Nombre = '';
        this.munuser = 0;
        this.codigo = '';
        this.hora = '';
        this.activo = '';
        this.email = '';
        this.almacen = 0;
        this.caja = 0;
        this.aplicacion = '';
        this.basededatos = '';
        this.per = '';
        this.fecini = '';
        this.fecfin = '';
        this.token = '';
        this.idunico = '';
    }
}