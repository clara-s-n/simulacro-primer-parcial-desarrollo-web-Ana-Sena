import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Task} from '../../interfaces/task';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {SearchComponent} from '../../components/search/search.component';
import {TaskComponent} from '../../components/task/task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent,
    TaskComponent
  ],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.css'
})
export class TasksPage implements OnInit {
  async ngOnInit() {
    console.log('TasksPage initialized');
    this.tasksList = await firstValueFrom(this.httpClient.get<Task[]>('back/tareas'));
    console.log('tasksList:', this.tasksList);
  }
  tasksList: Task[] = []
  private httpClient = inject(HttpClient)
}
