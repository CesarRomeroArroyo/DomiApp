import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-bar',
  templateUrl: './icon-bar.component.html',
  styleUrls: ['./icon-bar.component.scss'],
})
export class IconBarComponent {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() iconName: string;
  @Input() type: string;  
  @Input() model: string; 
  @Input() nombre: string; 

}
