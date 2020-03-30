import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl } from '@angular/forms';
import { pizzaList } from './shared/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pizzaObj: FormGroup;
  pizzaList: any;
  newObjList: any
  value: number = 100;
  options: Options = {
    floor: 100,
    ceil: 600
  };
  title = 'My Pizza';
  buttonLabel = 'Add';
  currencyLabel = "Rs";
  pizzaBase = ['Thin Crust', 'Regular Base', 'Flat Bread', 'Multigrain'];
  pizzaType = ['Cheese burst', 'Cheese topping', 'No cheese'];

constructor(){
this.pizzaList = pizzaList; //json for pizza data
}

  ngOnInit() {

    this.pizzaObj = new FormGroup({
      type: new FormControl('Veg'),
      price: new FormControl('600'),
      base: new FormControl(''),
      pizzaType: new FormControl('')
    });

    //new object to store original data before modifying
    this.newObjList = Object.assign([], this.pizzaList);

    //form changes
    this.pizzaObj.valueChanges.subscribe((val) => {
      this.pizzaList = this.filerData(val);
    });
    
  }

  //filter data according changes in type, price, pizza base and pizza type.
  //When the base and pizza type will be on default label then all the pizza with different base and type will be displayed.
  filerData(arr) {
    let newObj = [];
 
    this.newObjList.filter((x) => {
      if(arr.base == '' && arr.pizzaType == ''){
        if(x.type == arr.type && Number(x.price) <= Number(arr.price)){        
          newObj.push(x);
        }
      }else if(arr.pizzaType != '' && arr.base == ''){
        if(x.type == arr.type && Number(x.price) <= Number(arr.price) && x.pizzaType == arr.pizzaType){
          newObj.push(x);
        }
      }else if(arr.base != '' && arr.pizzaType == ''){
        if(x.type == arr.type && Number(x.price) <= Number(arr.price) && x.base == arr.base){
          newObj.push(x);
        }
      }else{
        if(x.type == arr.type && x.base == arr.base && x.pizzaType == arr.pizzaType && Number(x.price) <= Number(arr.price)){        
          newObj.push(x);
        } 
      }
     
    });
    return newObj;
  }
}
