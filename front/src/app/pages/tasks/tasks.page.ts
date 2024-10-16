import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Task} from '../../interfaces/task';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {SearchComponent} from '../../components/search/search.component';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent
  ],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.css'
})
export class TasksPage implements OnInit {
  async ngOnInit() {
    console.log('TasksPage initialized');
    const data = await firstValueFrom(this.httpClient.get<Task[]>('back/tareas'));
    console.log('data:', data);
    this.tasksList = data;
  }
  tasksList: Task[] = []
  private httpClient = inject(HttpClient)

  // De acá para abajo es lo que estaba haciendo yo jaja
  private taskService: TasksService = new TasksService();

  onSearchValue(searchValue: string): void {
    console.log('Value:' + searchValue);

  }
}
