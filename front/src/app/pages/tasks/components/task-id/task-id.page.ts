import {Component, input, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-id',
  standalone: true,
  imports: [],
  templateUrl: './task-id.page.html',
  styleUrl: './task-id.page.css'
})
export class TaskIdPage implements OnInit {
  ngOnInit() {
    console.log('TaskIdPage initialized');
    console.log('id_tarea:', this.id_tarea());
  }
  id_tarea = input<string>()


}
