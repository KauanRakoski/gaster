import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Essencial para Pipes e *ngFor

@Component({
  selector: 'spend-table',
  standalone: true,
  imports: [CommonModule], // Adicionar aqui
  templateUrl: './spend-table.html',
  styleUrls: ['./spend-table.css']
})
export class SpendTableComponent {

  // Dados Mockados (Simulando o que viria do Backend)
  @Input() transactions: any = []
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<any>();

  deleteItem(id: number) {
    if(confirm('Tem certeza que deseja excluir?')) {
      this.onDelete.emit(id);
    }
  }

  handleDoubleClick(item: any) {
    this.onEdit.emit(item);
  }
}