import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './views/aside/aside.component';
import { HomeComponent } from './views/home/home.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './views/navbar/navbar.component';
import { AgenceComponent } from './views/agence/agence.component';
import { FilialeComponent } from './views/filiale/filiale.component';
import { PartenaireComponent } from './views/partenaire/partenaire.component';
import { ConfrereComponent } from './views/confrere/confrere.component';
import { CorrespondanceComponent } from './views/correspondance/correspondance.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalsComponent } from './views/modals/modals.component';
import { LoginComponent } from './views/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    HomeComponent,
    NavbarComponent,
    AgenceComponent,
    FilialeComponent,
    PartenaireComponent,
    ConfrereComponent,
    CorrespondanceComponent,
    ModalsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
