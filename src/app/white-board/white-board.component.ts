import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  constructor(private service: UserServiceClient) { }

  user;

  ngOnInit() {
    this.service.getLoggedInUser()
                .then(user => {
                  console.log("here's the logged in user...");
                  if(user) {
                    this.user = user;
                  }
                })
  }

}
