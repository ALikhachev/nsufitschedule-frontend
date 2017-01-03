import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit {
  private static courses = [
    'Имя курса 1', 'Имя курса 2'
  ];
  private currentCourseIndex = 0;
  shownCourse: string;

  ngOnInit(): void {
    this.shownCourse = LegendComponent.courses[0];
  }

  showNextCourse(): void {
    this.shownCourse = LegendComponent.courses[++this.currentCourseIndex % LegendComponent.courses.length];
  }
}
