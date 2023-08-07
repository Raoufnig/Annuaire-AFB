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
import { LoginComponent } from './views/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuccursaleComponent } from './views/succursale/succursale.component';
import { GuichetComponent } from './views/guichet/guichet.component';
import { BureauxComponent } from './views/bureaux/bureaux.component';
import { DirectionComponent } from './views/direction/direction.component';



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
    LoginComponent,
    SuccursaleComponent,
    GuichetComponent,
    BureauxComponent,
    DirectionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
