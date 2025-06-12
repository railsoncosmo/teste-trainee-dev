import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import Swal from 'sweetalert2';
import { TodoService } from '../shared/services/todo.service';
import { PdfService } from '../shared/services/generate.pdf.service';
import { CensorshipService } from '../shared/services/censorship.service';

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
    private pdfService: PdfService,
    private censorship: CensorshipService
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
    if (this.todos.length === 0) {
      return;
    }
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to clear all tasks?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear all!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if(result.isConfirmed){
        this.todoService.clearAll();
        this.loadTodos();
        
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Completed tasks cleared',
      showConfirmButton: false,
      timer: 2500
        });
      }
    })
  }

  clearCompletedTasks() {
    const completedTasks = this.todos.filter(todo => todo.completed);
    if (completedTasks.length === 0) return;
    Swal.fire({
      title: 'Clear completed tasks?',
      text: 'Are you sure you want to remove all completed tasks?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear them',
      cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      this.todoService.clearCompletedTasks();
      this.loadTodos();
      
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Completed tasks cleared',
      showConfirmButton: false,
      timer: 2500
        })
    }
  });
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
