import { FoodMenuImage } from './food-menu-image.model';

export interface Cuisine {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

export interface FoodMenu {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    cuisineId: number;
    isActive: boolean;
    foodImage: FoodMenuImage;
}


export interface FoodMenuResolved {
    foodMenu: FoodMenu | null;
    error?:any;
}
