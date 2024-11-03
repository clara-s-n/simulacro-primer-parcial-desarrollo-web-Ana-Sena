import {Component, input, Input} from '@angular/core';
import {Task} from '../../interfaces/task';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {of} from 'rxjs';
import {RouterLink} from '@angular/router';
import {IonCard, IonCardHeader} from '@ionic/angular/standalone';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [JsonPipe, NgIf, NgForOf, RouterLink, IonicModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  task = input<Task | undefined>()
}
