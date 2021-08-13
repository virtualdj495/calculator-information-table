import { InvokeFunctionExpr } from '@angular/compiler';
import { unsupported } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';

import { Person, People } from '../Person';

@Component({
  selector: 'app-information-table',
  templateUrl: './information-table.component.html',
  styleUrls: ['./information-table.component.css']
})
export class InformationTableComponent implements OnInit {

  varstaMin: any = null;
  varstaMax: any = null;
  varstaMinOld!: number;
  varstaMaxOld!: number;
  stare!: any;
  filteredOcupatie!: any;
  newFilterVarsta!: boolean;
  newFilterOcupatie!: boolean;
  people=People;
  stateVarsta: boolean=true;
  stateOcupatie: boolean=true;
  changeVarsta: boolean=false;
  changeOcupatie: boolean=false;
  controlOcupatie: any='Unsort';
  controlVarsta: any='Unsort';
  doubleClickVarsta:boolean=true;
  doubleClickOcupatie: boolean=true;

  selectedPeople: Array<Person> = [];
  originalList: Array<Person>= [];
  filteredlist: Array<Person>= [];

  listaVarsta: Array<number>= [];
  listaOcupatie: Array<string>=[];


  constructor() { }

  ngOnInit(): void {
  }

  filter() {
    this.selectedPeople = [];
    for(const p of this.originalList){
      if (p.ocupatie !== this.controlOcupatie && this.controlOcupatie !== "Unsort") {
        continue;
      }
      if (p.varsta < this.varstaMin && this.varstaMin !== null) {
        continue;
      }
      if (p.varsta > this.varstaMax && this.varstaMax !== null) {
        continue;
      }

      /*
      if(this.varstaMin == null && this.varstaMax == null && this.controlOcupatie !== 'Unsort'){
        if (p.ocupatie !== this.controlOcupatie) {
          continue;
        }
      }
      if(this.varstaMin != null && this.varstaMax != null && this.controlOcupatie == 'Unsort'){
        if (p.varsta < this.varstaMin || p.varsta > this.varstaMax) {
          continue;
        }
      }
      if(this.varstaMin != null && this.varstaMax != null && this.controlOcupatie !== 'Unsort'){
        if(p.varsta < this.varstaMin || p.varsta > this.varstaMax) {
          continue;
        }
        if (p.ocupatie !== this.controlOcupatie) {
          continue;
        }
      }
      if(this.varstaMin != null && this.varstaMax == null && this.controlOcupatie !== 'Unsort'){
        if(p.varsta < this.varstaMin) {
          continue;
        }
        if (p.ocupatie !== this.controlOcupatie) {
          continue;
        }
      }
      if(this.varstaMin == null && this.varstaMax != null && this.controlOcupatie !== 'Unsort'){
        if(p.varsta > this.varstaMax) {
          continue;
        }
        if (p.ocupatie !== this.controlOcupatie) {
          continue;
        }
      }
      if(this.varstaMin != null && this.varstaMax == null && this.controlOcupatie == 'Unsort'){
        if(p.varsta < this.varstaMin) {
          continue;
        }
      }
      if(this.varstaMin == null && this.varstaMax != null && this.controlOcupatie == 'Unsort'){
        if(p.varsta > this.varstaMax) {
          continue;
        }
      }
      if(this.varstaMin == null && this.varstaMax == null && this.controlOcupatie == 'Unsort'){
        this.selectedPeople = [];
        for(const p of this.originalList){
          this.selectedPeople.push(p);
        }
      }
      */
      this.selectedPeople.push(p);

    }
  }

  addPeopleToTable(): void {
    const rand= Math.floor(Math.random()*People.length);
    if(this.selectedPeople.length == this.originalList.length){
      this.selectedPeople.push(People[rand]);
      this.originalList.push(People[rand]);
      this.filteredlist.push(People[rand]);

      this.addVarstatoFilterList(People[rand]);
      this.addOcupatietoFilterList(People[rand]);
    }else{
      this.originalList.push(People[rand]);
      this.addVarstatoFilterList(People[rand]);
      this.addOcupatietoFilterList(People[rand]);
      if(People[rand].varsta >= this.varstaMin && People[rand].varsta <= this.varstaMax && People[rand].ocupatie == this.filteredOcupatie)
        this.selectedPeople.push(People[rand]);
    }

  }
  addVarstatoFilterList(selectedPerson: Person): void{
    let duplicate = 0;
    let i=0;
    while(duplicate == 0 && i<this.listaVarsta.length){
      if(selectedPerson.varsta == this.listaVarsta[i]){
        duplicate =1;
      }
      i++;
    }
    if(duplicate==0){
      this.listaVarsta.push(selectedPerson.varsta);
      this.listaVarsta=this.listaVarsta.sort();
    }
  }

  addOcupatietoFilterList(selectedPerson: Person): void{
    let duplicate = 0;
    let i=0;
    while(duplicate == 0 && i<this.listaOcupatie.length){
      if(selectedPerson.ocupatie == this.listaOcupatie[i]){
        duplicate =1;
      }
      i++;
    }
    if(duplicate==0){
      this.listaOcupatie.push(selectedPerson.ocupatie);
      this.listaOcupatie=this.listaOcupatie.sort();
    }
  }


  deletePerson(selectedPerson: Person): void{
    this.selectedPeople.splice(this.selectedPeople.indexOf(selectedPerson),1);
    this.listaOcupatie.splice(this.selectedPeople.indexOf(selectedPerson),1);
    this.listaVarsta.splice(this.selectedPeople.indexOf(selectedPerson),1);
    if(this.selectedPeople.length == 0){

      this.varstaMin= undefined;
      this.varstaMax= undefined;
    }
  }

  sortPeople(id:number):void{

    switch(id){
        case 1:
          this.selectedPeople=this.selectedPeople.sort(
            (a: Person,b: Person) =>{
              return a.nume.localeCompare(b.nume);
            });
          break;
        case 2:
          this.selectedPeople=this.selectedPeople.sort(
            (a: Person,b: Person) =>{
              return a.prenume.localeCompare(b.prenume);
            });
          break;
        case 3:
          this.selectedPeople=this.selectedPeople.sort(
            (a: Person,b: Person) =>{
              return a.varsta.toString().localeCompare(b.varsta.toString());
            });
          break;
        case 4:
          this.selectedPeople=this.selectedPeople.sort(
            (a: Person,b: Person) =>{
              return a.ocupatie.localeCompare(b.ocupatie);
            });
          break;
        case 5:
            this.selectedPeople=[];
            for(let i=0;i<this.originalList.length;i++)
              this.selectedPeople.push(this.originalList[i]);
        break;
    }
  }

  sortBySelectedVarsta(): void{
    console.log();
    if(this.varstaMax==this.varstaMaxOld && this.varstaMin==this.varstaMaxOld && this.doubleClickVarsta==true){
      console.log(' dublu click varsta');
      this.doubleClickVarsta=true;
      this.selectedPeople=[];
      for(let j=0;j<this.filteredlist.length;j++){
        this.selectedPeople.push(this.filteredlist[j]);
      }
    }else
    if(this.stateVarsta== true || (this.varstaMax!= this.varstaMaxOld && this.varstaMin!= this.varstaMinOld && this.stateOcupatie== true)){
      console.log(' new varsta -> ' + this.stateOcupatie);
      console.log(this.stateVarsta +" "+ this.stateOcupatie);
      this.selectedPeople=[];
      for(let j=0;j<this.originalList.length;j++){
        this.selectedPeople.push(this.originalList[j]);
      }
      this.stateVarsta=false;
      this.newFilterVarsta=true;
      this.doubleClickOcupatie=true;
    }else{
      console.log(' filtru varsta dupa ocupatie');
      this.selectedPeople=[];
      console.log(this.filteredOcupatie);
      for(let j=0;j<this.originalList.length;j++){
        if(this.originalList[j].ocupatie==this.filteredOcupatie)
          this.selectedPeople.push(this.originalList[j]);
      }
      this.doubleClickOcupatie=false;
    }

    let i=0;
    let change=false;
    while(i<this.selectedPeople.length){
      if(this.selectedPeople[i].varsta < this.varstaMin || this.selectedPeople[i].varsta > this.varstaMax){
        this.selectedPeople.splice(this.selectedPeople.indexOf(this.selectedPeople[i]),1);
        i=0;
        change=true;
      }
      else{
        change=false;
      }
      if(change == false){
        i++;
      }
    }
    if(this.newFilterVarsta==true){
      console.log('click');
      this.filteredlist=[];
      for(let j=0; j<this.selectedPeople.length;j++)
        this.filteredlist.push(this.selectedPeople[j]);
      this.newFilterVarsta=false;
    }
  }

  sortBySelectedOcupatie(): void{
    if(this.controlOcupatie== this.filteredOcupatie && this.doubleClickOcupatie== true){
      console.log('double click ocupatie ->');
      this.doubleClickOcupatie= true;
      this.selectedPeople=[];
      for(let j=0;j<this.filteredlist.length;j++){

        this.selectedPeople.push(this.filteredlist[j]);
      }
    }else
    if(this.stateOcupatie==true || (this.controlOcupatie!=this.filteredOcupatie && this.stateVarsta == true)){
      console.log("new ocupatie-> " + this.stateVarsta);
      this.selectedPeople=[];
      for(let j=0;j<this.originalList.length;j++){
        this.selectedPeople.push(this.originalList[j]);
      }
      this.stateOcupatie= false;
      this.doubleClickVarsta= true;
    }else{
      this.selectedPeople=[];
      for(let j=0;j<this.originalList.length;j++){
        console.log('filtru ocupatie dupa varsta');
        if(this.originalList[j].varsta <=this.varstaMaxOld && this.originalList[j].varsta >= this.varstaMinOld)
          this.selectedPeople.push(this.originalList[j]);
          this.doubleClickVarsta=false;
      }
    }

    let i=0;
    let change=0;
    while(i<this.selectedPeople.length){
      if(this.selectedPeople[i].ocupatie != this.filteredOcupatie){
        this.selectedPeople.splice(this.selectedPeople.indexOf(this.selectedPeople[i]),1);
        i=0;
        change=1;
      }
      else{
        change=0;
      }
      if(change == 0){
        i++;
      }
    }

    if(this.newFilterOcupatie==true){
      this.filteredlist=[];
      for(let j=0; j<this.selectedPeople.length;j++)
        this.filteredlist.push(this.selectedPeople[i]);
      this.newFilterOcupatie=false;
    }
  }

  sortByLimits(): void{
    this.stateVarsta= false;
    this.sortBySelectedVarsta();
  }

  showFilteredList(choice: any): void{
    this.varstaMinOld=this.varstaMin;
    this.varstaMaxOld=this.varstaMax;
    switch(typeof choice){
      case 'number':
        this.varstaMin= choice;
        this.varstaMax=choice;
        this.sortBySelectedVarsta();
        break;
      case 'string':
          this.controlOcupatie=this.filteredOcupatie;
          console.log(this.controlOcupatie);
          this.filteredOcupatie= choice;
          this.sortBySelectedOcupatie();
        break;
    }
  }

  deleteVarstaFilter(): void{
    if(this.stateOcupatie==false){
      this.selectedPeople=[];
      for(let j=0;j<this.originalList.length;j++)
        if(this.originalList[j].ocupatie== this.filteredOcupatie)
          this.selectedPeople.push(this.originalList[j]);
    }else{
      this.deleteFilters();
    }
  }

  deleteOcupatieFilter(): void{
    if(this.stateVarsta==false){
      this.selectedPeople=[];
      for(let j=0;j<this.originalList.length;j++)
        if(this.originalList[j].varsta>= this.varstaMin && this.originalList[j].varsta<=this.varstaMax)
          this.selectedPeople.push(this.originalList[j]);
    }else{
      this.deleteFilters();
    }
  }

  deleteFilters():void{
    this.selectedPeople= [];
    for(let i=0;i<this.originalList.length;i++){
      this.selectedPeople.push(this.originalList[i]);
      this.addOcupatietoFilterList(this.originalList[i]);
    }
    this.varstaMax= null;
    this.varstaMin= null;
    this.controlOcupatie= 'Unsort';
    this.stateVarsta= true;
    this.stateOcupatie= true;
  }

}
