import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {ScheduleItem} from "./schedule-item";

@Injectable()
export class ScheduleService {
  private oddSchedule: Promise<ScheduleItem[][]>;
  private evenSchedule: Promise<ScheduleItem[][]>;

  constructor(private http: Http) {}

  private parseSchedule(url): Promise<ScheduleItem[][]> {
    return this.http.get(url)
      .toPromise()
      .then(resp => {
        let data = resp.json().data;
        let items: ScheduleItem[][] = [];
        for (let i = 0; i < 6; ++i) {
          items.push(new Array(7) as ScheduleItem[]);
        }
        for (let rawItem of data) {
          const overlap: ScheduleItem = items[rawItem.weekday][rawItem.time];
          items[rawItem.weekday][rawItem.time] = {
            name: rawItem.name,
            room: rawItem.room,
            lecture: rawItem.lecture,
            teacher: rawItem.teacher,
            overlap: overlap
          } as ScheduleItem;
        }
        return items;
      })
  }

  getSchedule(userId: number, evenWeek: boolean): Promise<ScheduleItem[][]> {
    if (!this.oddSchedule || !this.evenSchedule) {
      const oddScheduleUrl = `https://nsufit.herokuapp.com/api/schedule/${userId}?week=false`;
      const evenScheduleUrl = `https://nsufit.herokuapp.com/api/schedule/${userId}?week=true`;
      this.oddSchedule = this.parseSchedule(oddScheduleUrl);
      this.evenSchedule = this.parseSchedule(evenScheduleUrl);
    }
    return evenWeek ? this.evenSchedule : this.oddSchedule;
  }
}
