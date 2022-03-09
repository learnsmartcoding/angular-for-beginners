import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { FoodMenuImage } from 'src/app/models/food-menu-image.model';
import { FoodMenu, FoodMenuResolved } from 'src/app/models/food-menu.model';
import { CategoryService } from 'src/app/services/category.service';
import { FoodMenuResolver } from 'src/app/services/foodmenu-resolver.service';
import { FoodMenuService } from 'src/app/services/foodmenu.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css'],
})
export class FoodDetailsComponent implements OnInit {
  foodMenuResolved!: FoodMenuResolved;
  foodMenu!: FoodMenu;
  category: Category[] = [];
  foodId!: number;
  foodMenuImages!: FoodMenuImage[];
  foodImage!: FoodMenuImage;
  errorMessage: string = '';

  constructor(
    private categoryService: CategoryService,
    private foodmenuService: FoodMenuService,
    private route: ActivatedRoute
  ) {
    //uncomment these below two lines for integrating Resolver
    
    // this.foodMenuResolved = this.route.snapshot.data['foodMenuItem'];
    // this.foodMenu = <FoodMenu>this.foodMenuResolved.foodMenu;
    this.foodId = Number(route.snapshot.paramMap.get('foodId'));
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
    });

    const routeParams = this.route.snapshot.paramMap;
    this.foodId = Number(routeParams.get('foodId'));
    this.getCategories();
  }

  getFoodDetails() {
    this.foodmenuService
      .GetFoodDetails(this.foodId)
      .subscribe((data) => (this.foodMenu = data),
      (err)=>{
        this.errorMessage = err;
      }
      );
  }

  getFoodImages() {
    this.foodmenuService.GetFoodItemImages(this.foodId).subscribe((data) => {
      this.foodMenuImages = data;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.category = s;
      this.getFoodDetails(); //comment this line when resolver is used.
      this.getFoodImages();
    });
  }

  getCategory(categoryId: number | undefined): string | undefined {
    return this.category.find((f) => f.id === categoryId)?.name;
  }
}
