import { Component } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import { CensorshipService } from '../../shared/services/censorship.service';

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
      alert('O título contém palavras impróprias e foi ajustado automaticamente.');
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
