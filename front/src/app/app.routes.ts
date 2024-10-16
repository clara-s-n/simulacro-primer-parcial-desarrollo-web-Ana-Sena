import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TasksPage} from './pages/tasks/tasks.page';
import {TaskIdPage} from './pages/tasks/components/task-id/task-id.page';

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
    component: TasksPage
  },
  {
    path: 'tasks/:id_tarea',
    component: TaskIdPage
  }
];
