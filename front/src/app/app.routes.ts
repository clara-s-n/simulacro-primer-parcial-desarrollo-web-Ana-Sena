import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TasksPage} from './pages/tasks/tasks.page';
import {TaskIdPage} from './pages/tasks/components/task-id/task-id.page';
import {LoginPage} from './pages/auth/login/login.page';
import {logueadoGuard} from './guards/logueado.guard';

let TasksIdPage;
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'tasks',
    component: TasksPage,
    canActivate: [logueadoGuard]
  },
  {
    path: 'tasks/:id_tarea',
    component: TaskIdPage
  },
  {
    path: 'auth/login',
    component: LoginPage
  }
];
