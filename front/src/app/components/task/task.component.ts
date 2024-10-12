import {Component, input, Input} from '@angular/core';
import {Task} from '../../interfaces/task';
import {JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [JsonPipe, NgIf],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  task = input<Task | undefined>()
}
