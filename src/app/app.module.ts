import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PainelComponent } from './painel/painel.component';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'painel', component: PainelComponent },
    ]),
    GoogleMapsModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    NavbarComponent,
    HomeComponent,
    PainelComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
