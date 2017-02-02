import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {ScheduleItem} from "./schedule";

@Injectable()
export class ScheduleService {
  constructor(private http: Http) {}

  getSchedule(userId: number, evenWeek: boolean): Promise<[boolean, (ScheduleItem[][])]> {
    const scheduleUrl = `https://nsufit.herokuapp.com/api/schedule/${userId}?week=${evenWeek}`;
    return this.http.get(scheduleUrl)
      .toPromise()
      .then(resp => {
        let data = resp.json().data;
        let items: ScheduleItem[][] = [];
        for (let i = 0; i < 6; ++i) {
          items.push(new Array(7) as ScheduleItem[]);
        }
        let parityMeaningful = false;
        for (let rawItem of data) {
          const overlap: ScheduleItem = items[rawItem.weekday][rawItem.time];
          items[rawItem.weekday][rawItem.time] = {
            name: rawItem.name,
            room: rawItem.room,
            lecture: rawItem.lecture,
            overlap: overlap
          } as ScheduleItem;
          if (rawItem.week != null) {
            parityMeaningful = true;
          }
        }
        return [parityMeaningful, items];
      })
  }
}
