import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {GroupService} from "./group.service";
import {Group} from "./group";
import {Student} from "./student";
import {Router} from "@angular/router";

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  private groups: Group[];
  @Input() selectedStudentId: number;

  constructor(private heroService: GroupService, private router: Router) {}

  ngOnInit(): void {
    this.getGroups();
  }

  selectStudent(selectedStudent: Student): void {
    this.selectedStudentId = selectedStudent.id;
    this.router.navigate(['/schedule', this.selectedStudentId]);
  }

  private getGroups() {
    this.heroService.getGroups().then(groups => this.groups = groups);
  }
}
