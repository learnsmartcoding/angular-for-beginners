import { Category } from './category.model';
import { FoodMenuImage } from './food-menu-image.model';

export interface DisplayMenuItem {
    name: string;
    description: string;
    category: Category;
    foodMenuImages: FoodMenuImage;
}

