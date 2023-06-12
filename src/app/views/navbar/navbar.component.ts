import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output('showAside')showAside= new EventEmitter<boolean>()

  showNavbar(){
    this.showAside.emit(true)
  }

}
