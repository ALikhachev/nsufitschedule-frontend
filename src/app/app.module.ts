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

@NgModule({
  declarations: [
    AppComponent,
    FirstWordPipe,
    ScheduleComponent,
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
