import {Component, trigger, transition, style, animate} from "@angular/core";

@Component({
  selector: 'intervals',
  templateUrl: './intervals.component.html',
  styleUrls: ['./intervals.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0, 'height': 0}),
          animate('500ms', style({opacity: 1, 'height': '192px'}))
        ]),
        transition(':leave', [
          style({ opacity: 1, 'height': '192px'}),
          animate('500ms', style({opacity: 0, 'height': 0}))
        ])
      ]
    )
  ],
})
export class IntervalsComponent {
  private showIntervals = false;
}
