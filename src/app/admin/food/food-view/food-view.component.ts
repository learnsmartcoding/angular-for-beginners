import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { FoodMenu, Cuisine } from 'src/app/models/food-menu.model';
import { CategoryService } from 'src/app/services/category.service';
import { CuisineService } from 'src/app/services/cuisine.service';
import { FoodMenuService } from 'src/app/services/foodmenu.service';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.css'],
})
export class FoodViewComponent implements OnInit {
  foodMenus: FoodMenu[] = [];
  category: Category[] = [];
  cuisines: Cuisine[] = [];

  constructor(
    private categoryService: CategoryService,
    private cuisineService: CuisineService,
    private foodmenuService: FoodMenuService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
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
    this.foodmenuService.GetAllFoodItems().subscribe((s) => {
      this.foodMenus = s;
      this.spinner.hide();
    });
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

  deleteFood(id:number){
    this.spinner.show();
    this.foodmenuService.deleteFoodItem(id).subscribe(
      (model) => {
        this.getAllFoodMenus();
        this.toastr.success('Success', 'Successfully deleted');
      },
      (errorRes: HttpErrorResponse) => {
        this.toastr.error('Error', 'Something went wrong');
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }
}
