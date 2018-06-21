import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {Course} from "../models/coruse.model.client";
import {SectionServiceClient} from "../services/section.service.client";

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private sectionService: SectionServiceClient) { }

  courses: Course[] = [];
  enrolledIn = new Set();

  ngOnInit() {
    /*this.service.findAllCourses()
      .then(courses => this.courses = courses);*/
    this.service.findAllCourses()
      .then(courses => {
        return this.sectionService.findSectionsForStudent()
                                  .then(sections => {
                                    console.log(sections);
                                    sections.map(section => {
                                      console.log(section.enrollment.section.courseId);
                                      this.enrolledIn.add(section.enrollment.section.courseId);
                                    });
                                    this.courses = courses.sort((a, b) => {
                                      return !this.enrolledIn.has(a.id);
                                    });
                                  })
      });
  }

}
