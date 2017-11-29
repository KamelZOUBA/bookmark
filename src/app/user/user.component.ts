import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  users: User[];
  user: User;
  userForm: FormGroup;
  passwordForm: FormGroup;
  emailCtrl: FormControl;
  password: FormControl;
  confirmpassword: FormControl;
  nameCtrl: FormControl;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmpassword').value;
    return password === confirmPassword ? null : { matchingError: true };
  }

  constructor(private userService: UserService, fb: FormBuilder) {
    this.user = new User();
    this.password = fb.control('', Validators.required);
    this.confirmpassword = fb.control('', Validators.required);
    this.passwordForm = fb.group(
      {password: this.password, confirmpassword: this.confirmpassword},
      {validator: UserComponent.passwordMatch }
    );
    this.userForm = fb.group({
      email: fb.control(this.emailCtrl, [Validators.required, Validators.email]),
      passwordForm: this.passwordForm,
      name: this.nameCtrl
    });

  }



  ngOnInit() {
    /*    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });*/
  }

  signUp() {
    console.log(this.userForm.value);
    this.userService.addUser(this.user).subscribe();
  }

}
