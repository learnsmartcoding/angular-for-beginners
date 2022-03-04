import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cuisine } from 'src/app/models/food-menu.model';
import { CuisineService } from 'src/app/services/cuisine.service';

@Component({
  selector: 'app-cuisine-view',
  templateUrl: './cuisine-view.component.html',
  styleUrls: ['./cuisine-view.component.css'],
})
export class CuisineViewComponent implements OnInit {
  cuisines: Cuisine[] = [];
  constructor(
    private cuisineService: CuisineService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getCuisines();
  }

  getCuisines() { 
    this.spinner.show();   
    this.cuisineService.GetCuisines().subscribe(s=>{
      this.cuisines = s;
      this.spinner.hide();
    });
  }

  deleteCuisine(id: number) {
    this.spinner.show();   
    this.cuisineService.DeleteCuisines(id).subscribe(
      () => {
        this.toastr.success('Success', 'Successfully deleted');
        this.getCuisines();
      },
      (errorRes: HttpErrorResponse) => {
        this.toastr.error('Something went wrong', 'Error');
        this.spinner.hide();   
      },
      () => {
        this.spinner.hide();   
      }
    );
  }

  getRouteLink(id:number){
    return `/admin/cuisine/edit/${id}`;
  }
}
