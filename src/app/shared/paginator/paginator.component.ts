import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/User/user.service';




@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})

export class PaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() pageArr: number[] = [];

  @Output() userList: EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(private userService: UserService) {}

  changePage(pageNum: number): void {
    if (pageNum < 1 || pageNum > this.totalPages || pageNum === this.currentPage) return;
    
    this.userService.getUsers(pageNum).subscribe(users => {
      this.currentPage = users.page;
      this.userList.emit(users.data);
    });
  }

  getVisiblePages(): number[] {
    const pages = [];
    const range = 2; // Number of pages to show around the current page

    for (let i = Math.max(1, this.currentPage - range); i <= Math.min(this.totalPages, this.currentPage + range); i++) {
      pages.push(i);
    }
    
    return pages;
  }

  shouldShowEllipsis(): boolean {
    return this.currentPage > 3 && this.currentPage < this.totalPages - 2;
  }
}
