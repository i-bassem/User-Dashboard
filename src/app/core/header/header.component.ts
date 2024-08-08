import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { UserService } from 'src/app/_services/User/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   

  public searchInput!:number; 

  constructor(private userService:UserService){ }

  
  ngOnInit(){
   
  }

  search(){

      this.userService.setUserSearch(this.searchInput);
  }

}
