import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-cancelar-domicilio',
  templateUrl: './modal-cancelar-domicilio.page.html',
  styleUrls: ['./modal-cancelar-domicilio.page.scss'],
})
export class ModalCancelarDomicilioPage implements OnInit {

  @Input() domi_id: string;
  @Input() domicilio: string;

  constructor() { }

  ngOnInit() {
    console.log(this.domi_id);
    console.log(this.domicilio);
    
  }

}
