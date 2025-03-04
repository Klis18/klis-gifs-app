import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'dashboard',
        loadComponent:() => import('./gifs/pages/dashboard/dashboard.component'),
        children:[
            {
                path:'tendencias',
                loadComponent: () => import('./gifs/pages/trending/trending.component')
            },
            {
                path:'buscador',
                loadComponent: () => import('./gifs/pages/search/search.component')
            },
            {
                path:'historial/:query',
                loadComponent:() => import('./gifs/pages/gifs-history/gifs-history.component')
            },
            {
                path:'**',
                redirectTo: 'tendencias'
            }
        ]
    },
    {
        path:'**',
        redirectTo:'dashboard'
    }
];
