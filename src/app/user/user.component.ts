import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "./user.model";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  users: User[];
  user: User = new User();


  constructor(private userService: UserService) {}



  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  signUp() {
    console.log(this.user);
    this.userService.addUser(this.user).subscribe();
  }
  checkPassword(confirmPassword: String) {
    if (this.user.password !== confirmPassword) {
      console.log('mots de passes différents');
    } else {
      console.log('mots de passes OK');
    }
  }


}
