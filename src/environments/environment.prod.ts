
import { EnvironmentConfiguration } from 'src/app/core/models/environment-configuration';

export const environment: EnvironmentConfiguration = {
  env_name: 'prod',
  production: true,
  apiUrl: 'https://learnsmartcoding-restaurant.azurewebsites.net/api',
  apiEndpoints: {
    category: 'category',
    cuisine: 'cuisine',
    foodmenu: 'foodmenu',
    //jhkl
  },
  cacheTimeInMinutes: 30,
};
