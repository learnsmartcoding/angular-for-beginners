import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { Cuisine, FoodMenu } from 'src/app/models/food-menu.model';
import { CategoryService } from 'src/app/services/category.service';
import { CuisineService } from 'src/app/services/cuisine.service';
import { FoodMenuService } from 'src/app/services/foodmenu.service';
import { modelStateFormMapper } from 'src/app/services/modelStateFormMapper';
import { validateAllFormFields } from 'src/app/services/validateAllFormFields';
import { Validators } from 'src/app/services/validators';

@Component({
  selector: 'app-food-create',
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.css'],
})
export class FoodCreateComponent implements OnInit {
  errors: string[] = [];
  public form!: FormGroup;
  public cuisines: Cuisine[] = [];
  public categories: Category[] = [];

  model!: FoodMenu;

  constructor(
    private cuisineService: CuisineService,
    private categoryService: CategoryService,
    private foodService: FoodMenuService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getCuisines();
    this.form = this.buildForm();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.categories = s;
    });
  }

  getCuisines() {
    this.cuisineService.GetCuisines().subscribe((s) => {
      this.cuisines = s;
    });
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [
        Validators.required(),
        Validators.minLength(5, 'Food name should be of minimum length 5'),
        Validators.maxLength(100, 'Food name should be of maximum length 100'),
      ]),
      description: new FormControl('', [
        Validators.required(),
        Validators.minLength(
          100,
          'Food description should be of minimum length 100'
        ),
        Validators.maxLength(
          5000,
          'Food description should be of maximum length 5000'
        ),
      ]),
      price: new FormControl(null, [
        Validators.greaterThan(4, 'Price should be minimum of $5'),
      ]),
      categoryId: new FormControl(-1, [Validators.required()]),
      cuisineId: new FormControl(-1, [Validators.required()]),
      isActive: new FormControl(true),
    });
  }

  onSubmit() {
    this.saveFoodItem();
  }

  saveFoodItem() {
    this.errors = [];
    validateAllFormFields(this.form);
    if (this.form.valid) {
      this.spinner.show();
      //will be tru only if all form property satisfies the validations
      const model = this.getModel();
      this.model = model;
      this.foodService.createFoodItem(model).subscribe(
        () => this.onSaveComplete(),
        (errorRes: HttpErrorResponse) => {
          //we need to bind the error from API to UI.
          this.errors = modelStateFormMapper(this.form, errorRes, {});
          if (errorRes.status === 400) {
            this.toastr.warning('Something went wrong', 'Data Validation');
          } else {
            this.toastr.error('Something went wrong', 'Error');
          }
          this.spinner.hide();
        },
        () => {
          this.toastr.info('Completed', 'On Completion');
          this.spinner.hide();
        }
      );
    }
  }
  onSaveComplete() {
    this.toastr.success('Saved successfully', 'Success');
    this.form.reset();
  }

  getModel(): FoodMenu {
    const formValue = this.form.getRawValue();
    return <FoodMenu>{
      name: formValue.name,
      description: formValue.description,
      isActive: true,
      price: +formValue.price,
      categoryId: +formValue.categoryId,
      cuisineId: +formValue.cuisineId,
    };
  }

  public control(name: string): AbstractControl | null {
    if (this.form.get(name)?.touched === true) {
      return this.form.get(name);
    }
    return null;
  }
}
