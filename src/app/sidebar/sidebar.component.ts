import { Component, Input, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate = new Date();
  @Input() events: CalendarEvent[] = [];
   constructor() { }

  ngOnInit(): void {
  }

}
