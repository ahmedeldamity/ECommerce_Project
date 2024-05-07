import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() totalCount?:number;
  @Input() pageSize?:number;
  @Output() childPageChanged = new EventEmitter<number>();

  onPageChanged(event: any){
    this.childPageChanged.emit(event.page);
  }

}
