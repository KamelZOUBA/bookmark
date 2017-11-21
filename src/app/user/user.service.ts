import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "./user.model";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable <Array<User>>  {
    return this.http.get(environment.API_URL + 'users');
  }

  addUser(user: User) {
     return this.http.post(
      environment.API_URL + 'user',
      JSON.stringify(user)
    );
  }

  private addHeader() {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }
}
