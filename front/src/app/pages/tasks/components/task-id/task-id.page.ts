import {Component, input, OnInit} from '@angular/core';
import {Task} from '../../../../interfaces/task';
import {TaskComponent} from '../../../../components/task/task.component';
import {TasksService} from '../../../../services/tasks.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-task-id',
  standalone: true,
  imports: [
    TaskComponent,
    RouterLink
  ],
  templateUrl: './task-id.page.html',
  styleUrl: './task-id.page.css'
})
export class TaskIdPage implements OnInit {
  async ngOnInit() {
    console.log('TaskIdPage initialized');
    console.log('id_tarea:', this.id_tarea());
    const task = await this.taskService.getTaskById(this.id_tarea());
    this.selectedTask = task;
    console.log('selectedTask:', this.selectedTask);
  }
  // Desde el componente padre se le pasa el id de la tarea
  id_tarea = input<number>()
  // Buscar la tarea por id
  taskService : TasksService = new TasksService();
  private router: Router = new Router();

  selectedTask: Task | undefined;


  editTask() {
    console.log('Edit task');
    this.router.navigate(['tasks', this.selectedTask?.id_tarea, 'edit']);
  }
}
