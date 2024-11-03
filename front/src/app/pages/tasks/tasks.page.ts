import {Component, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Task} from '../../interfaces/task';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {SearchComponent} from '../../components/search/search.component';
import {TaskComponent} from '../../components/task/task.component';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent,
    TaskComponent,
    IonicModule
  ],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.css'
})
export class TasksPage implements OnInit {
  async ngOnInit() {
    console.log('TasksPage initialized');
    const list = await firstValueFrom(this.httpClient.get<Task[]>('back/tareas'));
    this.tasksList.set(list);
  }
  public tasksList = signal<Task[]>([]);

  private httpClient = inject(HttpClient)
}
