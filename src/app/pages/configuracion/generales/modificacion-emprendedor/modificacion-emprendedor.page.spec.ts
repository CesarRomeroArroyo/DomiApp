import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificacionEmprendedorPage } from './modificacion-emprendedor.page';

describe('ModificacionEmprendedorPage', () => {
  let component: ModificacionEmprendedorPage;
  let fixture: ComponentFixture<ModificacionEmprendedorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionEmprendedorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionEmprendedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
