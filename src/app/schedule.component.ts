import {Component, OnInit} from "@angular/core";
import {ScheduleService} from "./schedule.service";
import {ScheduleItem} from "./schedule";
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
            this.evenWeek = true;
          }
          return this.scheduleService.getSchedule(this.selectedStudentId, this.evenWeek)
        }
        return Promise.resolve(null);
      })
      .subscribe(schedule => {
        this.parityMeaningful = schedule[0];
        this.schedule = schedule[1];
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
