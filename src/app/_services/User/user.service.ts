import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/_models/ApiResponse';
import { User } from 'src/app/_models/User';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOption;
  userSearch : BehaviorSubject<number> ;
  private usersListcache: Map<string, any> = new Map();
  private UsersArr :User[]= []; 

  constructor(private httpClient : HttpClient) {

    this.httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //  Authorization :'my-auth-token'
      }),
    };  

    this.userSearch = new BehaviorSubject<number>(0);
    if(localStorage.getItem("UsersArr")){
      this.UsersArr = JSON.parse(localStorage.getItem("UsersArr")!) 
    }
 }
   //#region Function for handling errors
  //Function for handling errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } 
    else if(error.status === 400){

    return throwError( () => new Error('Username or Password is incorrect '))
    } 
    else  {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  //#endregion
  setUserSearch(serchId:number){

    this.userSearch.next(serchId);
  }
   // Method to get search text observable
   getUserSearch():Observable<number> {

    return this.userSearch.asObservable();
  }
 
  searchForUser(searchId: number): Observable<User | undefined> {

    // Find the user in UsersArr
    const user = this.UsersArr.find(user => user.id == searchId);
    // Return the user as an observable
    return of(user); 
  }

  // Caching 
  put(url: string, response: any) {

    this.usersListcache.set(url, response);
  }

  get(url: string): any {

    return this.usersListcache.get(url);
  }

  clear() {
    this.usersListcache.clear();
  }

// https://reqres.in/api/users?page={page}
getUsers(page: number): Observable<ApiResponse<User>> {
  // Try to get users from local storage
  const users = JSON.parse(localStorage.getItem(`users${page}`)!);

  // Check if users exist in local storage
  if (!users) {
    // If not, make an HTTP request to fetch users and cache them
    return this.httpClient.get<ApiResponse<User>>(`${environment.APIURL}/api/users?page=${page}`, this.httpOption)
      .pipe(
        tap((apiRespons: ApiResponse<User>) => {
          // Cache the fetched data in local storage
          localStorage.setItem(`users${page}`, JSON.stringify(apiRespons));
          // Update UsersArr with the data from the API response
          this.UsersArr = [...this.UsersArr, ...apiRespons.data];
          localStorage.setItem(`UsersArr`, JSON.stringify(this.UsersArr));
        }),
        catchError(this.handleError) // Handle any errors
      );
  }
  // If users are found in cache,return the cached data
  return of(users); // Return the cached data as an observable
}

  // https://reqres.in/api/users/{id}
  getUser(userId: number): Observable<User> {
    

    this.UsersArr = JSON.parse(localStorage.getItem("UsersArr")!) 
    // Check if the user is in UsersArr
    const cachedUser = this.UsersArr.find(user => user.id == userId);
  
    if (cachedUser) {
      // If user is found in UsersArr, return it as an observable
      return of(cachedUser);
    } 
    else {
      // If user is not found in UsersArr, make an HTTP request to fetch the user
      return this.httpClient.get<any>(`${environment.APIURL}/api/users/${userId}`, this.httpOption)
        .pipe(
          map((response) => {
            const user = response.data; 
            // Update UsersArr with the fetched user data
            this.UsersArr.push(user);
  
            return user;
          }),
          catchError(this.handleError)
        );
    }
  }
}


