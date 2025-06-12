import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})

export class PdfService {

  generatePdf(todo: Todo[]): void{
    const doc = new jsPDF();
    let y = 35;

    doc.setFontSize(18);
    doc.text('Lista de Tarefas', 10, 10);

    todo.forEach((todo, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const status = todo.completed ? 'Concluída' : 'Pendente';
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${todo.title} - ${status}`, 10, y);
      y += 10;
    });

    doc.save('todas-as-tarefas.pdf');
  }
}
