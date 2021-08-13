import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

oldOperation !: string;
currentNumber: string = '0';
result: any = null;


 createNumber(digit: string): void {
  if (Number(this.currentNumber) === this.result) {
    this.currentNumber = '';
  }
  if (this.currentNumber === '0') {
    this.currentNumber = '';
  }
  if (this.currentNumber === '' && digit === '0' || digit === 'CE') {
    this.currentNumber = '0';
    return;
  }
  if (this.currentNumber.indexOf(digit) != -1 && digit === '.') {
    return;
  }
  if (this.currentNumber === '' && digit === '.') {
    this.currentNumber = '0';
    this.currentNumber += digit;
    return;
  }
  if (digit === 'X'){
    this.currentNumber = this.currentNumber.slice(0, -1);
    return;
  }
  this.currentNumber += digit;
 }


 startOperations( operation: string): void {
  if (this.result === null) {
    this.result = Number(this.currentNumber);
    this.currentNumber = '0';
    this.oldOperation = operation;
    return;
  }
  if (this.result !== null) {
    this.oldOperation
  }
  if (this.oldOperation === 'equal'){
    this.oldOperation = operation;
    return;
  }
  if (this.oldOperation === 'add') {
    this.result= this.result + Number(this.currentNumber);
    this.currentNumber = '0';
    this.oldOperation = operation;
  }
  if (this.oldOperation === 'sub') {
    this.result= this.result - Number(this.currentNumber);
    this.currentNumber = '0';
    this.oldOperation = operation;
  }
  if (this.oldOperation === 'mul') {
    this.result= this.result * Number(this.currentNumber);
    this.currentNumber = '0';
    this.oldOperation = operation;
  }
  if (this.oldOperation === 'div') {
    this.result = this.result / Number(this.currentNumber);
    this.currentNumber = '0';
    this.oldOperation = operation;

  }
  if (operation === 'equal') {
    this.currentNumber = this.result.toString() ;
    this.result = this.result;
    this.oldOperation = operation;
    return;
  }
  if (operation === 'del') {
    this.oldOperation = '';
    this.currentNumber = '0';
    this.result =  null;
  }
 }


}
