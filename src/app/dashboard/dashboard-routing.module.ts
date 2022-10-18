import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../pages/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'domiciliarios',
        loadChildren: () => import('../pages/configuracion/domiciliarios/domiciliarios.module').then(m => m.DomiciliariosPageModule)
      },
      {
        path: 'admindomiciliario',
        loadChildren: () => import('../pages/configuracion/domiciliarios/admin/admin.module').then(m => m.AdminPageModule)
      },
      {
        path: 'emprendedores',
        loadChildren: () => import('../pages/configuracion/emprendedores/emprendedores.module').then(m => m.EmprendedoresPageModule)
      },
      {
        path: 'adminemprendedores',
        loadChildren: () => import('../pages/configuracion/emprendedores/admin/admin.module').then(m => m.AdminPageModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('../pages/configuracion/emprendedores/productos/productos.module').then(m => m.ProductosPageModule)
      },
      {
        path: 'adminclientes',
        loadChildren: () => import('../pages/configuracion/emprendedores/clientes/admin-clientes/admin-clientes.module').then(m => m.AdminClientesPageModule)
      },
      {
        path: 'domicilios',
        loadChildren: () => import('../pages/configuracion/domicilios/domicilios.module').then(m => m.DomiciliosPageModule)
      },
      {
        path: 'admindomicilios',
        loadChildren: () => import('../pages/configuracion/domicilios/admin/admin.module').then(m => m.AdminPageModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('../pages/configuracion/categorias/categorias.module').then(m => m.CategoriasPageModule)
      },
      {
        path: 'admincategorias',
        loadChildren: () => import('../pages/configuracion/categorias/admin/admin.module').then(m => m.AdminPageModule)
      },
      /* {
        path: 'generales',
        loadChildren: () => import('../pages/configuracion/generales/generales.module').then(m => m.GeneralesPageModule)
      }, */
      {
        path: 'generales',
        loadChildren: () => import('../pages/configuracion/generales/admin-generales/admin-generales.module').then(m => m.AdminGeneralesPageModule)
      },
      {
        path: 'mapas',
        loadChildren: () => import('../pages/domicilios/mapas/mapas.module').then(m => m.MapasPageModule)
      },
      {
        path: 'listado',
        loadChildren: () => import('../pages/domicilios/listado/listado.module').then(m => m.ListadoPageModule)
      },
      {
        path: 'historico',
        loadChildren: () => import('../pages/domicilios/historico/historico.module').then(m => m.HistoricoPageModule)
      },
      {
        path: 'detalle',
        loadChildren: () => import('../pages/domicilios/historico/detalle/detalle.module').then( m => m.DetallePageModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('../pages/usuario/usuario.module').then(m => m.UsuarioPageModule)
      },
      {
        path: 'tipo-emprededor',
        loadChildren: () => import('../pages/configuracion/tipo-emprededor/tipo-emprededor.module').then( m => m.TipoEmprededorPageModule)
      },
      {
        path: 'admintipoemprende',
        loadChildren: () => import('../pages/configuracion/tipo-emprededor/admintipoemprende/admintipoemprende.module').then( m => m.AdmintipoemprendePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
