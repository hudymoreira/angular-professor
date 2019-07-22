import { Routes } from '@angular/router';
import { ChamadaComponent }   from './chamada/chamada.component';
import { CadastroComponent }   from './cadastro/cadastro.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'cadastro',
        pathMatch: 'full',
    },
    {
        path: 'cadastro',
        component: CadastroComponent
    },
    {
        path: 'chamada',
        component: ChamadaComponent
    }
]
