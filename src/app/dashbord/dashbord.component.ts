import { Component, OnInit } from '@angular/core';
import { ScheduleService, ScheduleType } from '../services/schedule.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

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
  isProf: boolean = localStorage.getItem('role') === 'professeur' ? true : false
  heures : string[] = ['09:00', '10:00','11:00'];

  constructor(private scheduleService: ScheduleService,private authService: AuthService, public dialog: MatDialog) {}

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

  createCourseDialog() {
    const dialog =  this.dialog.open(CourseDialogComponent);
    dialog.afterClosed().subscribe((result) => {
    });
  }
}
