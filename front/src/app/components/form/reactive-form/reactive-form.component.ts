import {Component, inject, input, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, JsonPipe, NgForOf} from '@angular/common';
import {TakenDirective} from '../../../directive/taken.directive';
import {Task, TaskPost} from '../../../interfaces/task';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TasksService} from '../../../services/tasks.service';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    TakenDirective,
    NgForOf,
  ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent {
  async ngOnInit() {
    await this.loadTask();
    console.log('Task:', this.task);
  }

  // Sacamos el id de la tarea de la URL
  private id_tarea(): number {
    // Obtener la URL
    const url = this.router.url;
    // La URL tiene el formato /tasks/:id/edit
    // Dividir la URL por /
    const url_parts = url.split('/');
    // Obtener el id de la tarea
    return parseInt(url_parts[2]);
  }

  protected task? : Task;
  private tasksService = inject(TasksService);
  private router = inject(Router);
  private http = inject(HttpClient);

  async saveTask(task: Task){
    const data = await this.tasksService.updateTask(task);
    // Si se ha actualizado la tarea, redirigir a la página de tareas
    if(data){
      this.router.navigate(['/tasks']);
    } else {
      window.alert('Error al actualizar la tarea');
    }
  }

  updateTask: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    duracion: new FormControl(''),
  })

  async onSubmitTask(){
    // Si el formulario es válido, guardar la tarea
    if(this.updateTask.valid){
      console.log(this.updateTask.value);
      // Agregar el id de la tarea y el id del usuario
      this.updateTask.value.id_tarea = this.task?.id_tarea;
      this.updateTask.value.id_usuario = this.task?.id_usuario;
      await this.saveTask(this.updateTask.value);
    } else {
      window.alert('Error al actualizar la tarea');
    }
  }

  private async loadTask(){
    const task = await this.tasksService.getTaskById(this.id_tarea());
    this.task = task;
    this.updateTask.patchValue(task);
  }

}
