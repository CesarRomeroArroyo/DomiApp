import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCancelarDomicilioPage } from './modal-cancelar-domicilio.page';

describe('ModalCancelarDomicilioPage', () => {
  let component: ModalCancelarDomicilioPage;
  let fixture: ComponentFixture<ModalCancelarDomicilioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCancelarDomicilioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCancelarDomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
