import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "./user.model";

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

  addUser(user) {
    this.userService.addUser(user).subscribe();
  }
}
