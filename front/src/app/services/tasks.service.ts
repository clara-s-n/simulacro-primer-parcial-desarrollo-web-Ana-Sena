import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  async getAllTasks(){
    const response = await fetch('/back/tareas');
    const data = await response.json();
    return data;
  }

  async getTaskById(id: number){
    const response = await fetch(`/back/tareas/${id}`);
    const data = await response.json();
    return data;
  }
  constructor() { }
}
