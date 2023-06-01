import { Component, OnInit } from '@angular/core';
import { ScheduleService, ScheduleType } from '../services/schedule.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
  providers: [ScheduleService],
})
export class DashbordComponent implements OnInit {
  scheduleData: ScheduleType[] = [];
  isStudent: boolean = false;
  days : string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  heures : string[] = ['09:00', '10:00','11:00'];


  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    if (localStorage.getItem('role') === 'professeur') {
      this.isStudent = false;
    } else {
      this.isStudent = true;
    }
    this.onGetSchedule();
    
  }
  
  onGetSchedule() {
    this.scheduleService.getSchedule().subscribe((res: ScheduleType[]) => {
      console.log("response:", res)
      this.scheduleData = res;
    });
  }
}
