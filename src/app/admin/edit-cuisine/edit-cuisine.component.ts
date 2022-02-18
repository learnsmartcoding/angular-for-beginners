import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cuisine } from 'src/app/models/food-menu.model';
import { CuisineService } from 'src/app/services/cuisine.service';
import { modelStateFormMapper } from 'src/app/services/modelStateFormMapper';
import { validateAllFormFields } from 'src/app/services/validateAllFormFields';

@Component({
  selector: 'app-edit-cuisine',
  templateUrl: './edit-cuisine.component.html',
  styleUrls: ['./edit-cuisine.component.css'],
})
export class EditCuisineComponent implements OnInit {
  cuisineId!: number;
  cuisine!: Cuisine;
  public form!: FormGroup;
  public errors: string[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private cuisineService: CuisineService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.buildForm();
    const routedParams = this.route.snapshot.paramMap;
    this.cuisineId = Number(routedParams.get('cuisineId'));
    this.getCuisine();
  }

  getCuisine() {
    this.spinner.show();
    this.cuisineService
      .GetCuisine(this.cuisineId)
      .subscribe(s=>{
        this.cuisine = s;
        this.patchCuisine(this.cuisine);
        this.spinner.hide();
      });
  }
  public onSubmit(): void {
    this.updateCuisine();
  }

  private patchCuisine(cuisine:Cuisine){
    this.control('name')?.patchValue(cuisine.name);
    this.control('description')?.patchValue(cuisine.description);
    this.control('isActive')?.patchValue(cuisine.isActive);
  }

  updateCuisine() {
    this.errors = [];
    validateAllFormFields(this.form);
    if (this.form.valid) {
      const model = this.getModel();
      this.spinner.show();
      this.cuisineService.UpdateCuines(model).subscribe(
        () => this.onSaveComplete(),
        (errorRes: HttpErrorResponse) => {
          this.errors = modelStateFormMapper(this.form, errorRes, {});
          if (errorRes.status === 400) {
            this.toastr.warning(
              'Validation error',
              'There are some errors in your input'
            );
            this.spinner.hide();
          }
        },
        () => {
          this.spinner.hide();
        }
      );
    }
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      isActive: new FormControl('true'),
    });
  }

  private getModel(): Cuisine {
    const formValue = this.form.getRawValue();
    return <Cuisine>{
      name: formValue.name,
      description: formValue.description,
      isActive: formValue.isActive === 'true' ? true : false,
      id: this.cuisine.id,
    };
  }

  public control(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  onSaveComplete(): void {
    this.toastr.success('Success', 'Successfully saved');
  }
}
