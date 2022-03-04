import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {
  title: string =  'Structural Diectives';
  fruits:string[] = [];
  searchFruit = '';
  newFruit = '';
    constructor() { }
  
    ngOnInit(): void {
      this.populateFruits()
    }
  
    populateFruits(){
      this.fruits = [];
      this.fruits.push('Orange');
      this.fruits.push('Banana');
      this.fruits.push('Grapes');
      this.fruits.push('Cherry');
    }
  
    dataChanged(data:string){
      this. populateFruits();
      this.fruits = this.fruits.filter(f=>
        f.toLocaleLowerCase().startsWith(data)||f.toLocaleLowerCase().indexOf(data)>0);
    }
   
    addFruit() {
     this.fruits.push(this.newFruit) ;
    }
  }
  