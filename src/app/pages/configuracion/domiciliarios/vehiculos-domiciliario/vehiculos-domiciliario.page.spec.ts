import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehiculosDomiciliarioPage } from './vehiculos-domiciliario.page';

describe('VehiculosDomiciliarioPage', () => {
  let component: VehiculosDomiciliarioPage;
  let fixture: ComponentFixture<VehiculosDomiciliarioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculosDomiciliarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosDomiciliarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
