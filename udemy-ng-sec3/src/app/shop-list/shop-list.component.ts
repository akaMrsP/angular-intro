import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Test Ingredient', 4, 'Tbs'),
    new Ingredient('Another Ingredient', 2, 'cups')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
