import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { MenuActiveItem } from 'src/app/models/common.model';
import { Cuisine, FoodMenu } from 'src/app/models/food-menu.model';
import { CategoryService } from 'src/app/services/category.service';
import { CuisineService } from 'src/app/services/cuisine.service';

@Component({
  selector: 'app-cuisine',
  templateUrl: './cuisine.component.html',
  styleUrls: ['./cuisine.component.css'],
})
export class CuisineComponent implements OnInit {
  foodMenuHovered!: FoodMenu;
  cuisines: Cuisine[] = [];
  selectedCuisine!: Cuisine;
  menuActiveList: MenuActiveItem[] = [];

  constructor(private cuisineService: CuisineService) {}

  ngOnInit(): void {
    this.getCuisines();
  }

  getCuisines() {
    this.cuisineService.GetCuisines().subscribe((s) => {
      this.cuisines = s;
      this.cuisines.forEach((element) => {
        const menuItemToAdd: MenuActiveItem = {
          id: `menu-${element.id}`,
          isActive: false,
        };
        this.menuActiveList.push(menuItemToAdd);
      });
      this.menuActiveList[1].isActive = true;
      this.setActiveMenu(this.cuisines[1]);
    });
  }

  setActiveMenu(cuisine: Cuisine): void {
    const menuId = `menu-${cuisine.id}`;
    this.menuActiveList.forEach((element) => {
      element.isActive = element.id === menuId ? true : false;
      if (element.id === menuId) {
        this.selectedCuisine = cuisine;
      }
    });
  }

  getMenuClass(cuisine: Cuisine): boolean {
    const menuId = `menu-${cuisine.id}`;
    const cssClass = this.menuActiveList.find((f) => f.id === menuId)?.isActive;
    return cssClass || false;
  }

  onHoverFoodItem(foodMenu: FoodMenu) {
    this.foodMenuHovered = foodMenu;
  }
}
