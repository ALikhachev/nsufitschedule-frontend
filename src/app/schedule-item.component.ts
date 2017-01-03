import {Component, Input, OnInit} from "@angular/core";
import {ScheduleItem} from "./schedule";

@Component({
  selector: 'schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {
  @Input()
  private item: ScheduleItem;
  private shownItem;

  ngOnInit(): void {
    this.shownItem = this.item;
  }

  showNextItem() {
    if (this.item && this.item.overlap) {
      this.shownItem = this.shownItem.overlap ? this.shownItem.overlap : this.item;
    }
  }
}
