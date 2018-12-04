import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiProvider } from './providers/api/api';
import { HttpModule } from '@angular/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    RouterModule,
    SelectDropDownModule,
    HttpModule,
    HttpClientModule,
    SelectDropDownModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [ApiProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
