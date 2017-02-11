export class ScheduleItem {
  name: string;
  room: string;
  lecture: boolean;
  teacher: string;
  overlap: ScheduleItem;
}
