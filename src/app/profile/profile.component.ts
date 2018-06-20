import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) {

  }

  user = {};
  username;
  password;
  firstName;
  lastName;
  email;
  userId;
  sections = [];

  update() {
    console.log("made it to update in profile.component.ts");
    var updatedUser = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    }
    this.service
        .update(this.userId, updatedUser);
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }

  ngOnInit() {
    this.service
      .profile()
      .then((user) => {
        console.log("LE USER");
        console.log(user);
        this.user = user;
        this.password = user.password;
        this.username = user.username;
        this.lastName = user.lastName;
        this.firstName = user.firstName;
        this.email = user.email;
        this.userId = user._id;
        console.log(this.user);
      });

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections);
  }

}
