import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {ScheduleItem} from "./schedule";

@Injectable()
export class ScheduleService {
  constructor(private http: Http) {}

  getSchedule(userId: number): Promise<ScheduleItem[][]> {
    const scheduleUrl = `https://nsufit.herokuapp.com/api/schedule/${userId}`;
    return this.http.get(scheduleUrl)
      .toPromise()
      .then(resp => {
        let data = resp.json().data;
        let items: ScheduleItem[][] = [];
        for (let i = 0; i < 6; ++i) {
          items.push(new Array(7) as ScheduleItem[]);
        }
        for (let rawItem of data) {
          items[rawItem.weekday][rawItem.time] = {
            name: rawItem.name,
            room: rawItem.room,
            lecture: rawItem.lecture
          } as ScheduleItem
        }
        return items;
      })
  }
}
