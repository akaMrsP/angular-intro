// import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShopListService } from '../shop-list.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css']
})
export class ShopEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('shopForm', {static: false}) shoppingForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shopListService: ShopListService) { }

  ngOnInit(): void {
    this.subscription = this.shopListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shopListService.getIngredient(index);
          this.shoppingForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            units: this.editedItem.units
          })
        }
      );
  }

  onAddUpdateItem (form: NgForm) {
    // const ingredientName = this.nameInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount, value.units);
    if (this.editMode) {
      this.shopListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shopListService.addIngredient(newIngredient);
    }
    // could just use a call to onClearForm() as well
    form.reset();
    this.editMode = false;
  }

  onClearForm () {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shopListService.deleteIngredient(this.editedItemIndex);
    this.onClearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
