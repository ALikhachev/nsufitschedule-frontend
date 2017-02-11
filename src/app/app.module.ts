import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from "@angular/material";

import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule.component';
import { GroupService } from "./group.service";
import { GroupListComponent } from "./group-list.component";
import {ScheduleService} from "./schedule.service";
import {AppRoutingModule} from "./app-routing.module";
import {FirstWordPipe} from "./first_word.pipe";
import {ScheduleItemComponent} from "./schedule-item.component";
import {LegendComponent} from "./legend.component";
import {IntervalsComponent} from "./intervals.component";

@NgModule({
  declarations: [
    AppComponent,
    FirstWordPipe,
    LegendComponent,
    IntervalsComponent,
    ScheduleComponent,
    ScheduleItemComponent,
    GroupListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [GroupService, ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
