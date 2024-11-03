import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TasksPage } from './pages/tasks/tasks.page';
import { TaskIdPage } from './pages/tasks/components/task-id/task-id.page';
import { LoginPage } from './pages/auth/login/login.page';
import { logueadoGuard } from './guards/logueado.guard';
import { NewTaskPage } from './pages/tasks/components/new-task/new-task.page';
import { EditTaskPage } from './pages/tasks/components/task-id/edit-task/edit-task.page';
import { ImageComponent } from './components/image/image.component';
import { UsersPage } from './pages/users/users.page';

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
    //canActivate: [logueadoGuard],
  },
  {
    path: 'tasks/new',
    component: NewTaskPage
  },
  {
    path: 'tasks/:id_tarea',
    component: TaskIdPage,
  },
  {
    path: 'tasks/:id_tarea/edit',
    component: EditTaskPage
  },
  {
    path: 'auth/login',
    component: LoginPage
  },
  {
    path: 'image/:id_usuario',
    component: ImageComponent
  },
  {
    path: 'users',
    component: UsersPage
  }
];
