import {Component, inject, input, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, JsonPipe} from '@angular/common';
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
  ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent {
  async ngOnInit() {
    await this.loadTask();
  }

  id_tarea = input<number>()
  protected task? : Task;
  private tasksService = inject(TasksService);
  private router = inject(Router);

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
    descripcion: new FormControl(''),
    usuarios: new FormControl(''),
  })

  onSubmitTask(){
    // Si el formulario es válido, guardar la tarea
    if(this.updateTask.valid){
      this.saveTask(this.updateTask.value);
    } else {
      window.alert('Error al actualizar la tarea');
    }
  }

  private async loadTask(){
    const task = await this.tasksService.getTaskById(this.id_tarea());
    this.updateTask.patchValue(task);
  }

}
