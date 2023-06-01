import { Component, OnInit } from '@angular/core';
import { ScheduleService, ScheduleType } from '../services/schedule.service';
import { AuthService } from '../services/auth.service';

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


  constructor(private scheduleService: ScheduleService,private authService: AuthService) {}

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
      this.scheduleData = res;
    });
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
