import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ScheduleComponent} from "./schedule.component";

const routes: Routes = [
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'schedule/:id', component: ScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
