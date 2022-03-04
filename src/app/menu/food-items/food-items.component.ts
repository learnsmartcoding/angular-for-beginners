import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { EventLog } from 'src/app/models/common.model';
import { FoodMenu } from 'src/app/models/food-menu.model';
import { CategoryService } from 'src/app/services/category.service';
import { FoodMenuService } from 'src/app/services/foodmenu.service';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css'],
})
export class FoodItemsComponent implements OnInit, OnChanges, 
DoCheck, AfterContentInit, AfterContentChecked,
AfterViewInit, AfterViewChecked, OnDestroy {
  changeLog: string[] = [];
  @Input() cusineId!: number;
 
  @Output()
  public onHoverFoodItem = new EventEmitter<FoodMenu>();
  foodMenus: FoodMenu[] = [];
  category: Category[] = [];

  eventLogs: EventLog[] = [];
  
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private foodmenuService: FoodMenuService,
    private route: ActivatedRoute
  ) {
    this.eventLogs.push(this.getTimeStamp("constructor",""));
  }

  filteredFoodMenus : FoodMenu[]=[];
  showImage = true;
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredFoodMenus = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.foodMenus;
  }

  performFilter(filterBy: string): FoodMenu[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.foodMenus.filter(
      (foodmenu: FoodMenu) =>
        foodmenu.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }


  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(
        `${propName}: currentValue = ${cur}, previousValue = ${prev}`
      );
    }
    this.getFoodMenus(this.cusineId);
    this.eventLogs.push(this.getTimeStamp("ngOnChanges","violet"));
  }

  ngOnInit(): void {    
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';
    this.getCategories();
    this.eventLogs.push(this.getTimeStamp("ngOnInit","darkcyan"));    
  }

  getFoodMenus(cuisineId: number) {
    this.foodmenuService
    .GetFoodItemsByCuisineId(cuisineId)
    .subscribe((data) => {
      this.foodMenus = data;
      this.filteredFoodMenus = data;
      this.filteredFoodMenus = this.performFilter(this.listFilter);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.category = s;
    });
  }

  getCategory(categoryId: number): string | undefined {
    return this.category.find((f) => f.id === categoryId)?.name;
  }

  navigateToFoodItem(id: number) {
    this.router.navigate([`cuisine/food/${id}`]);
  }

  onItemHover(foodMenu: FoodMenu) {
    this.onHoverFoodItem.emit(foodMenu);
  }


  ngDoCheck(): void {
    this.eventLogs.push(this.getTimeStamp("ngDoCheck","red"));
  }
  ngAfterContentInit(): void {
    this.eventLogs.push(this.getTimeStamp("ngAfterContentInit","blue"));
  }
  ngAfterContentChecked(): void {
    this.eventLogs.push(this.getTimeStamp("ngAfterContentChecked","green"));
  }
  ngAfterViewInit(): void {
    this.eventLogs.push(this.getTimeStamp("ngAfterViewInit","teal"));
  }
  ngAfterViewChecked(): void {
    this.eventLogs.push(this.getTimeStamp("ngAfterViewChecked","orange"));
  }
  ngOnDestroy(): void {
    this.eventLogs.push(this.getTimeStamp("ngOnDestroy","brown"));
  }

  private getTimeStamp(eventName: string, color:string): EventLog{
    
    const date=new Date();
    const msg= `Event ${eventName} triggerd - MM:SS:MM => ${date.getMinutes}:${date.getSeconds()}:${date.getMilliseconds()}`;
    const log: EventLog = {color: color, message:msg};
    return log;
  }
  

}
