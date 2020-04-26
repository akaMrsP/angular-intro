import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShopListService } from '../shop-list.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css']
})
export class ShopEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  @ViewChild('unitsInput', {static: false}) unitsInputRef: ElementRef;

  constructor(private shopListService: ShopListService) { }

  ngOnInit(): void {
  }

  onAddItem () {
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = this.amountInputRef.nativeElement.value;
    const ingredientUnits = this.unitsInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount, ingredientUnits);
    this.shopListService.addIngredient(newIngredient);
  }
}
