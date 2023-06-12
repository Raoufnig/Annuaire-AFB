import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  currentUrl !: string;
 
  @Input("state") state= false;
  @Output('hideAside')hideAside= new EventEmitter<boolean>()
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("Navigation End");
        this.currentUrl = event.url;
        console.log("Current url: " + this.currentUrl);
      }
    })
  }

  hideNavbar(){
    this.state = false
    this.hideAside.emit(this.state)
  }
}
