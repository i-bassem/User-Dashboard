import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { UserService } from 'src/app/_services/User/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   
  isActive = false;
  public searchInput!:number; 

  constructor(private userService:UserService){ }

  activateSearch() {
    this.isActive = true;
  }

  deactivateSearch() {
    this.isActive = false;
  }

  
  ngOnInit(){
   
  }

  search(){

      this.userService.setUserSearch(this.searchInput);
  }

}
