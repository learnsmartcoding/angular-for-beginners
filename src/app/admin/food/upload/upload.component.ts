import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FoodMenuImage } from 'src/app/models/food-menu-image.model';
import { FoodMenuService } from 'src/app/services/foodmenu.service';
import { modelStateFormMapper } from 'src/app/services/modelStateFormMapper';
import { validateAllFormFields } from 'src/app/services/validateAllFormFields';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  foodMenuImages!: FoodMenuImage[];
  
  @Input()
  foodId!: number;
  @ViewChild('myInput')
  myInputVariable!: ElementRef;

  @Output()
  public buttonClick = new EventEmitter<boolean>();
  public form!: FormGroup;
  public errors: string[] = [];
  private destroy: Subject<void> = new Subject<void>();

  constructor(
    private foodMenuService: FoodMenuService,
    private toastr: ToastrService
  ) {}

  public control(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  public ngOnInit() {
    this.form = this.buildForm();
    this.getFoodImages();
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      fileContact: new FormControl('', [Validators.required]),
    });
  }

  public Submit(files: File[]): void {    
    this.handleFileInput(files);
  }

  validateFileExtension(file: string | undefined) {
    if (file === 'jpg' || file === 'png') return true;
    else return false;
  }

  public handleFileInput(data:any): void {

    const files = data.files as File[];
    this.errors = [];

    this.errors = [];
    validateAllFormFields(this.form);

    if (
      this.form.valid &&
      this.validateFileExtension(files[0].name.split('.').pop())
    ) {
      this.toastr.info('Image being uploaded', 'In Progress');
      const formData = new FormData();

      Array.from(files).forEach((f) => formData.append('file', f));

      this.foodMenuService.uploadImage(formData, this.foodId).subscribe(
        () => {
          this.toastr.success('Image uploaded', 'Save Success');
          this.getFoodImages();

        },
        (errorRes: HttpErrorResponse) => {
          this.form.reset();
          this.myInputVariable.nativeElement.value = '';
          this.errors = modelStateFormMapper(this.form, errorRes, {});
        }
      );
    } else {
      this.errors.push('Only file type .png, .jpg are allowed');
    }
  }

  getFoodImages() {
    this.foodMenuService.GetFoodItemImages(this.foodId).subscribe((data) => {
      this.foodMenuImages = data;
    });
  }
}
