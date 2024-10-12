import {Component} from '@angular/core';
import {SearchComponent} from '../search/search.component';
import {Task} from '../../interfaces/task';
import {TaskComponent} from '../task/task.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  taskList: Task[] = [
    {
      id_tarea: 1,
      nombre: 'Tarea 1',
      duracion: 30,
      id_usuario: 1,
      creador: 'Ana',
      usuarios: ['Ana', 'Martina', 'Nicolás', 'Francisco']
    },
    {
      id_tarea: 2,
      nombre: 'Tarea 2',
      duracion: 60,
      id_usuario: 2,
      creador: 'Martina',
      usuarios: ['Ana', 'Martina', 'Nicolás', 'Francisco']
    },
    {
      id_tarea: 3,
      nombre: 'Tarea 3',
      duracion: 90,
      id_usuario: 3,
      creador: 'Nicolás',
      usuarios: ['Ana', 'Martina', 'Nicolás', 'Francisco']
    },
    {
      id_tarea: 4,
      nombre: 'Tarea 4',
      duracion: 120,
      id_usuario: 4,
      creador: 'Francisco',
      usuarios: ['Ana', 'Martina', 'Nicolás', 'Francisco']
    }
  ]
  selectedTask: Task = {
    id_tarea: 1,
    nombre: 'Tarea 1',
    duracion: 30,
    id_usuario: 1,
    creador: 'Ana',
    usuarios: ['Ana', 'Martina', 'Nicolás', 'Francisco']
  }

  onSearchValue(searchValue: string): void {
    console.log('Value:' + searchValue);
  }
}
