import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import { PdfService } from '../shared/services/generate.pdf.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = false;
  sortAsc: boolean = true;

  constructor(
    private todoService: TodoService,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: newTodoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
    this.loadTodos();
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

  clearAll() {
    if (this.todos.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }

  clearCompletedTasks() {
    const completedTasks = this.todos.filter(todo => todo.completed);
    if (completedTasks.length === 0) return;
    if (confirm('Are you sure you want to clear all tasks completed?')){
      this.todoService.clearCompletedTasks();
      this.loadTodos();
    }
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  filteredTodos() {
    return this.showCompletedTasks ? this.todos.filter(todo => !todo.completed) : this.todos;
  }

  get labelClearAll(){
    return 'Limpar Tudo'
  }

  sortByTitle(): void {
  this.sortAsc = !this.sortAsc;
  this.todoService.sortByTitle(this.sortAsc);
  this.loadTodos();
  }

  get filterIsCompletedTasks(): Todo[] {
  let filter = this.showCompletedTasks 
    ? this.todos.filter(todo => !todo.completed)
    : this.todos;

  filter = filter.slice().sort((a, b) => {
    const result = a.title.localeCompare(b.title);
    return this.sortAsc ? result : -result;
  });
    return filter;
  }

  gerarPdf() {
    this.pdfService.generatePdf(this.filterIsCompletedTasks);
  }
}
