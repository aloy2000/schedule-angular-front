import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent {
  constructor(
    private scheduleService: ScheduleService,
    private fb: FormBuilder
  ) {}

  scheduleForm: FormGroup = this.fb.group({
    theme: ['', [Validators.required]],
    Periode: ['', [Validators.required]],
    Date: ['', [Validators.required]],
    Level: ['', [Validators.required]],
    Absence: ['', [Validators.required]],
    heure: ['', [Validators.required]],
  });

  createSchedule() {
    console.log("this.scheduleForm.value", this.scheduleForm.value)
    if (this.scheduleForm.invalid) {
      return;
    }
    const data = {
      ...this.scheduleForm.value,
      id_professeur: [localStorage.getItem('id')]
    }
    this.scheduleService
      .createSchedule(data)
      .subscribe((res) => {
        window.location.reload();
      });
  }
}
