export interface EnvironmentConfiguration {
    env_name: string;
    production: boolean;
    apiUrl: string;    
    apiEndpoints: {
        category: string,
        cuisine: string,
        foodmenu: string
    },
    cacheTimeInMinutes: number;
}