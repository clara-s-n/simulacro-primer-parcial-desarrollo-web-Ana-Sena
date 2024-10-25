import {Component, inject, input} from '@angular/core';
import {ReactiveFormComponent} from '../../../../../components/form/reactive-form/reactive-form.component';
import { Task } from '../../../../../interfaces/task';
import {TasksService} from '../../../../../services/tasks.service';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    ReactiveFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-task.page.html',
  styleUrl: './edit-task.page.css'
})
export class EditTaskPage {

}
