import {Injectable}    from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Group} from "./group";
import {Student} from "./student";

@Injectable()
export class GroupService {
  private groupsUrl = 'https://nsufit.herokuapp.com/api/groups';
  private groups: Group[];

  constructor(private http: Http) {
  }

  getGroups(): Promise<Group[]> {
    if (this.groups) {
      return Promise.resolve(this.groups)
    }
    return this.http.get(this.groupsUrl)
      .toPromise()
      .then(response => {
          let groups = [];
          let data = response.json().data;
          for (let group_name in data) {
            groups.push({
              name: group_name,
              students: data[group_name] as Student[]
            })
          }
          this.groups = groups;
          return groups as Group[];
        }
      )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error)
  }
}
