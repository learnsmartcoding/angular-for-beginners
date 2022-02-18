import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { modelStateFormMapper } from 'src/app/services/modelStateFormMapper';
import { validateAllFormFields } from 'src/app/services/validateAllFormFields';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  bsModalRef!: BsModalRef;
  public form!: FormGroup;
  public categories: Category[] = [];
  public createCategoryModel!: Category;
  categoryModel!: Category;
  public errors: string[] = [];

  constructor(
    private categoryService: CategoryService,
    private bsModalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.form = this.buildForm();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.categories = s;
    });
  }
  public onSubmit(): void {
    this.saveCategory();
  }

  saveCategory() {
    this.errors = [];
    validateAllFormFields(this.form);
    if (this.form.valid) {
      const model = this.getModel();
      this.spinner.show();
      this.categoryService.createCategory(model).subscribe(
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
    };
  }

  public control(name: string): AbstractControl | null {
    if (this.form.get(name)?.touched === true) {
      return this.form.get(name);
    }
    return null;
  }

  onSaveComplete(): void {
    this.form.reset();
    this.toastr.success('Success', 'Successfully saved');
    this.getCategories();
    // Reset the form to clear the flags
    this.form.reset();
  }

  deleteCategory(id: number) {
    this.spinner.show();
    this.categoryService.deleteCategory(id).subscribe(
      (model) => {
        this.getCategories();
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

  processUpdateCategory(
    template: TemplateRef<any>,
    selectedCategory: Category
  ) {
    this.categoryModel = selectedCategory;
    this.bsModalRef = this.bsModalService.show(template, {
      animated: true,
      class: 'modal-md',
      keyboard: false,
    });
  }

  categoryProcessingStatus(response: boolean) {
    if (response) {
      this.getCategories();
    }
    this.bsModalRef.hide();
  }
}
