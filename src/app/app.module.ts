import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformationTableComponent } from './information-table/information-table.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AppListComponent } from './app-list/app-list.component';

@NgModule({
  declarations: [
    AppComponent,
    InformationTableComponent,
    CalculatorComponent,
    AppListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
