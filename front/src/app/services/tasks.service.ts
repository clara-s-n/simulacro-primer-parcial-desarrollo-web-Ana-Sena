import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  async getAllTasks(){
    const response = await fetch('/back/tareas');
    const data = await response.json();
    return data;
  }

  async getTaskById(id: number | undefined){
    const response = await fetch(`/back/tareas/${id}`);
    const data = await response.json();
    return data;
  }

  async updateTask(task: Task){
    try {
      const response = await fetch(`/back/usuarios/${task.id_usuario}/tareas/${task.id_tarea}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(response.ok){
        const data = await response.json();
        return data;
      }
    }
    catch(error){
      console.error('Error:', error);
    }
  }
  constructor() { }
}
