import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppListComponent } from './app-list/app-list.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { InformationTableComponent } from './information-table/information-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-list', pathMatch: 'full' },
  {path: 'app-list', component: AppListComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'information-table', component: InformationTableComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
