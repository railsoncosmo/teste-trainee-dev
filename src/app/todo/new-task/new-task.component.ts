import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import { CensorshipService } from '../../shared/services/censorship.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  newTaskTitle: string = '';

  constructor(
    private todoService: TodoService,
    private censorshipService: CensorshipService,
  ) { }

  addTask() {

    const rawTitle = this.newTaskTitle.trim();
    if(!rawTitle) {
      return;
    } else if (this.censorshipService.hasProfanity(rawTitle)) {
      Swal.fire({
        icon: 'error',
        title: 'Conteúdo impróprio',
        text: 'Por favor, evite usar palavras ofensivas.',
        confirmButtonText: 'Ok',
        timer: 2500
      });
      return;
    }

    const cleanTitle = this.censorshipService.clean(rawTitle);
    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: cleanTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
    this.newTaskTitle = '';
  }
}
