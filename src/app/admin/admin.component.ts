import { Component, OnInit } from '@angular/core';
import {CourseNavigatorServiceClient} from "../services/course-navigator.service.client";
import {SectionServiceClient} from "../services/section.service.client";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: CourseNavigatorServiceClient,
              private sectionService: SectionServiceClient,
              private userService: UserServiceClient) { }

  courseId;
  sectionName;
  sectionSeats;
  courses = [];
  sections = [];
  user;

  selectCourse(courseId) {
    this.courseId = courseId;
    this.sectionService.findSectionsForCourse(courseId)
      .then(sections => {
        console.log(sections);
        this.sections = sections.map(section => section.section);
      });
  }

  updateSection(id, name, seats) {
    console.log("updating section " + id + " for course  " + this.courseId);
    console.log(name + ", " + seats);
    this
      .sectionService
      .updateSection(id, name, seats)
      .then(() => {
        this.selectCourse(this.courseId);
      });
  }

  createSection() {
    console.log(this.courseId, this.sectionName, this.sectionSeats);
    this
      .sectionService
      .createSection(this.courseId, this.sectionName, this.sectionSeats)
      .then(() => {
        this.sectionName = "";
        this.sectionSeats = null;
        this.selectCourse(this.courseId);
      });
  }

  ngOnInit() {
    this.userService.getLoggedInUser()
                .then(user => {
                  console.log("here's the logged in user...");
                  if(user) {
                    this.user = user;
                    this.service.findAllCourses()
                      .then(courses => this.courses = courses);
                  }
                })
  }
}
