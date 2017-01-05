import {Component, OnInit} from "@angular/core";
import {ScheduleService} from "./schedule.service";
import {ScheduleItem} from "./schedule";
import {ActivatedRoute, Params} from "@angular/router";

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
  loading: boolean;

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .switchMap((params: Params) => {
        if ('id' in params) {
          this.selectedStudentId = +params['id'];
          return this.scheduleService.getSchedule(+params['id'])
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
}
