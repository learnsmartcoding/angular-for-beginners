import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cuisine } from 'src/app/models/food-menu.model';
import { CuisineService } from 'src/app/services/cuisine.service';
import { modelStateFormMapper } from 'src/app/services/modelStateFormMapper';
import { validateAllFormFields } from 'src/app/services/validateAllFormFields';

@Component({
  selector: 'app-create-cuisine',
  templateUrl: './create-cuisine.component.html',
  styleUrls: ['./create-cuisine.component.css'],
})
export class CreateCuisineComponent implements OnInit {
  errors: string[] = [];
  public form!: FormGroup;
  public cuisine!: Cuisine;

  constructor(
    private cuisineService: CuisineService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      isActive: new FormControl('true'),
    });
  }

  onSubmit() {
    this.saveCuisine();
  }

  saveCuisine() {
    this.errors = [];
    validateAllFormFields(this.form);
    if (this.form.valid) {
      this.spinner.show();
      //will be tru only if all form property satisfies the validations
      const model = this.getModel();
      this.cuisineService.CreateCuisines(model).subscribe(
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

  getModel(): Cuisine {
    const formValue = this.form.getRawValue();
    return <Cuisine>{
      name: formValue.name,
      description: formValue.description,
      isActive: formValue.isActive === 'true' ? true : false,
    };
  }

  public control(name: string): AbstractControl | null {
    if (this.form.get(name)?.touched === true) {
      return this.form.get(name);
    }
    return null;
  }
}
