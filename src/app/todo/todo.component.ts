import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import { PdfService } from '../shared/services/generate.pdf.service';
import Swal from 'sweetalert2';


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
      title: 'Tem certeza?',
      text: 'Você realmente quer limpar todas as tarefas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, limpar tudo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed){
        this.todoService.clearAll();
        this.loadTodos();
        
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Todas as tarefas foram deletadas',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
        });
      }
    })
  }

  clearCompletedTasks() {
    const completedTasks = this.todos.filter(todo => todo.completed);
    if (completedTasks.length === 0) return;
    Swal.fire({
      title: 'Limpar tarefas concluídas?',
      text: 'Você tem certeza que quer remover todas as tarefas concluídas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, limpar',
      cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.todoService.clearCompletedTasks();
      this.loadTodos();

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Tarefas concluídas removidas',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true
        });
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
