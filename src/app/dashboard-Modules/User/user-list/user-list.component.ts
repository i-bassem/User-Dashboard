import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/User/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  userList: User[];
  currentPage:number;
  totalPages:number;
  pageArr:number[];


 constructor(private userService: UserService, private router:Router){

  this.currentPage=1;
  this.totalPages=1;
  this.pageArr=[];
  this.userList=[];
 }

  ngOnInit(): void {

      // Subscribe to searchForUser to handle search operations
      this.userService.getUserSearch().subscribe(id => {

        if (id) {
          this.userService.searchForUser(id).subscribe(user=>{
            // If a user is found
            if(user){
              this.userList = [user];
            }
            else
            this.userList = [];
          }) 
        } else {
          // If no user is found, you might want to handle this case
          this.getIntialUserList();
        }
      });

               
}

getIntialUserList(){

  this.userService.getUsers(1).subscribe((users) =>{

    this.currentPage = users.page;
    this.totalPages= users.total_pages;

    this.pageArr = Array.from(
                             { length: this.totalPages},
                             (value, index) => 1 + index * 1
                             );
    this.userList = users.data;
  } )
        
}
  ngOnChanges(userList:any): void {

      this.userList = userList;
  }

  selectUser(userId:number):void{

    this.router.navigateByUrl(`User/${userId}`)
  }


}
