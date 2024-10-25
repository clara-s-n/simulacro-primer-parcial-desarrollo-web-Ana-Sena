import { Component } from '@angular/core';
import {FormComponent} from '../../../../components/form/form.component';
import {ReactiveFormComponent} from '../../../../components/form/reactive-form/reactive-form.component';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    FormComponent,
    ReactiveFormComponent
  ],
  templateUrl: './new-task.page.html',
  styleUrl: './new-task.page.css'
})
export class NewTaskPage {

}
