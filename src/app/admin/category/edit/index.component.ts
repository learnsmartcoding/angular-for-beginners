import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { validateAllFormFields } from 'src/app/services/validateAllFormFields';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { modelStateFormMapper } from 'src/app/services/modelStateFormMapper';

@Component({
  selector: 'app-update-category',
  templateUrl: './index.component.html',
})
export class UpdateCategoryComponent implements OnInit {
  @Input()
  categoryModel!: Category;

  @Output()
  public buttonClick = new EventEmitter<boolean>();
  public form!: FormGroup;
  public categories: Category[] = [];
  public errors: string[] = [];

  constructor(
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.buildForm();
    this.loadCategory(this.categoryModel);
  }

  public onSubmit(): void {
    this.updateCategory();
  }

  updateCategory() {
    this.errors = [];
    validateAllFormFields(this.form);
    if (this.form.valid) {
      const model = this.getModel();
      this.spinner.show();
      this.categoryService.updateCategory(model).subscribe(
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
      isActive: new FormControl('true'),
    });
  }

  private getModel(): Category {
    const formValue = this.form.getRawValue();
    return <Category>{
      name: formValue.name,
      isActive: formValue.isActive === 'true' ? true : false,
      id: this.categoryModel.id
    };
  }

  public control(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  private loadCategory(category: Category) {
    this.control('name')?.patchValue(category.name);
    this.control('isActive')?.patchValue(category.isActive);
  }

  onSaveComplete(): void {
    this.form.reset();
    this.toastr.success('Success', 'Successfully updated');
    this.buttonClick.emit(true);
  }

}
