import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WidgetServiceClient} from "../services/widget.service.client";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  constructor(private service: WidgetServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setContext(params));
  }

  context;
  widgets = [];
  setContext(params) {
    this.context = params;
    this.loadWidgets(params.lessonId);
  }

  loadWidgets(lessonId) {
    console.log("THE LESSON ID IS " + lessonId);
    if(lessonId !== undefined) {
      console.log("let's search....");
      this.service.findWidgetsForLesson(lessonId)
        .then(widgets => {
          console.log(widgets);
          this.widgets = widgets.sort(function(a, b) {
            return a.position > b.position;
          });
        });
    }
    else {
      console.log("okie dokie");
      this.widgets = [];
    }
  }

  ngOnInit() {
  }
}
