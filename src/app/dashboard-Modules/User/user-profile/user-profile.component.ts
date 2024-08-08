import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/User/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent {

userId:number;  
user:User|null;

constructor(private userService:UserService,private activatedRoutes: ActivatedRoute, private router:Router){

  this.userId=0;
  this.user=null;
}

ngOnInit():void{

//Get UserId From the query params from the URL 
this.userId =this.activatedRoutes.snapshot.params["id"];

 // Subscribe to searchForUser to handle search operations
 this.userService.getUserSearch().subscribe(id => {
 //If the Search box is not Empty
  if (id) {
    this.userService.searchForUser(id).subscribe(user=>{
      // If a user is found
      if(user){
        this.user= user;
      }
      else
          this.user = null;
    }) 
  } else {
    // If no user is found, you might want to handle this case
    this.getUser();
  }
});

}

getUser(){
//Get User with the UserID
this.userService.getUser(this.userId).subscribe(user=> {

  this.user = user;
})
}

goBack(){

  //Reset search
  this.userService.setUserSearch(0);
  //Navigate back
  this.router.navigateByUrl(`User`)
}

}