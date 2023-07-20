import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FilialeComponent } from './views/filiale/filiale.component';
import { CorrespondanceComponent } from './views/correspondance/correspondance.component';
import { PartenaireComponent } from './views/partenaire/partenaire.component';
import { ConfrereComponent } from './views/confrere/confrere.component';
import { AgenceComponent } from './views/agence/agence.component';
import { LoginComponent } from './views/login/login.component';
import { GuichetComponent } from './views/guichet/guichet.component';
import { SuccursaleComponent } from './views/succursale/succursale.component';
import { BureauxComponent } from './views/bureaux/bureaux.component';
import { DirectionComponent } from './views/direction/direction.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'filiale', component: FilialeComponent},
  {path:'correspondance', component: CorrespondanceComponent},
  {path:'partenaire', component: PartenaireComponent},
  {path:'confrere', component: ConfrereComponent},
  {path:'agence', component: AgenceComponent},
  {path:'login', component: LoginComponent},
  {path:'guichet', component: GuichetComponent},
  {path:'succursale', component: SuccursaleComponent},
  {path:'bureau', component: BureauxComponent},
  {path:'direction', component:DirectionComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes , { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
