import {Component, OnInit} from '@angular/core';
import {SearchComponent} from '../search/search.component';
import {Task} from '../../interfaces/task';
import {TaskComponent} from '../task/task.component';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  async ngOnInit() {
    this.selectedTask = this.taskList[0];
    this.taskList = await this.taskService.getAllTasks();
    console.log(this.taskList);
  }
  taskList: Task[] = [];
  selectedTask: Task | undefined;

  onSearchValue(searchValue: string): void {
    console.log('Value:' + searchValue);
    // Devolvemos la tarea que coincida con el nombre
    this.selectedTask = this.taskList?.find(task => task.nombre == searchValue);
  }

  private taskService: TasksService = new TasksService();
}
