import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Cuisine, FoodMenu } from 'src/app/models/food-menu.model';
import { CategoryService } from 'src/app/services/category.service';
import { CuisineService } from 'src/app/services/cuisine.service';
import { FoodMenuService } from 'src/app/services/foodmenu.service';

@Component({
  selector: 'app-pipe-examples',
  templateUrl: './pipe-examples.component.html',
  styleUrls: ['./pipe-examples.component.css'],
})
export class PipeExamplesComponent implements OnInit {
  foodMenus: FoodMenu[] = [];
  category: Category[] = [];
  cuisines: Cuisine[] = [];

  constructor(
    private categoryService: CategoryService,
    private cuisineService: CuisineService,
    private foodmenuService: FoodMenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getAllFoodMenus();
    this.getCuisines();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.category = s;
    });
  }

  getAllFoodMenus() {
    this.foodmenuService
      .GetAllFoodItems()
      .subscribe((s) => (this.foodMenus = s));
  }

  getCuisines() {
    this.cuisineService.GetCuisines().subscribe((s) => {
      this.cuisines = s;
    });
  }

  getCuisine(cuisineId: number): string | undefined {
    return this.cuisines.find((f) => f.id === cuisineId)?.name;
  }

  getCategory(categoryId: number): string | undefined {
    return this.category.find((f) => f.id === categoryId)?.name;
  }

  getDate(){
    return new Date(2022,2,20);
  }
}
