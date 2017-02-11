import {Component, OnInit} from "@angular/core";
import {ScheduleService} from "./schedule.service";
import {ScheduleItem} from "./schedule-item";
import {ActivatedRoute, Params, Router} from "@angular/router";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedule: ScheduleItem[][];
  idToWeekday: Map<number, string> = new Map([
    [0, 'Понедельник'],
    [1, 'Вторник'],
    [2, 'Среда'],
    [3, 'Четверг'],
    [4, 'Пятница'],
    [5, 'Суббота']]);
  private selectedStudentId: number;
  private evenWeek: boolean;
  private loading: boolean;
  private parityMeaningful: boolean;

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        this.loading = true;
        if ('id' in params) {
          this.selectedStudentId = +params['id'];
          if ('evenWeek' in params) {
            this.evenWeek = params['evenWeek'] == 'true';
          } else {
            // detect current week number
            let date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
            let week1 = new Date(date.getFullYear(), 0, 4);
            this.evenWeek = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                - 3 + (week1.getDay() + 6) % 7) / 7) % 2 == 1;
          }
          return this.scheduleService.getSchedule(this.selectedStudentId, this.evenWeek)
        }
        return Promise.resolve(null);
      })
      .subscribe(schedule => {
        this.schedule = schedule;
        this.loading = false;
      });
  }

  convertWeekdayToWord(id: number): string {
    return this.idToWeekday.get(id)
  }

  selectWeekParity(evenWeek: boolean) {
    this.evenWeek = evenWeek;
    this.router.navigate(['/schedule', this.selectedStudentId, {'evenWeek': this.evenWeek}]);
  }
}
