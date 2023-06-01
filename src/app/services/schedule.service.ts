import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getSchedule() {
    return this.http.get<ScheduleType[]>('http://localhost:3000/cours');
  }

  createSchedule(schedule: ScheduleType) {
    return this.http.post<ScheduleType>(
      'http://localhost:3000/cours',
      schedule
    );
  }
  updateSchedule(schedule: ScheduleType) {
    const dataToUpdate = {
      theme: schedule.theme,
      Periode: schedule.Periode,
      Date: schedule.Date,
      Level: schedule.Level,
      Absence: schedule.Absence,
      heure: schedule.heure,
      //id_professeur: [schedule.professeurs[0]._id]
    };
    return this.http.patch<ScheduleType>(
      `http://localhost:3000/cours/${schedule._id}`,
      dataToUpdate
    );
  }

  deleteSchedule(schedule: ScheduleType) {
    return this.http.delete<any>(`http://localhost:3000/cours/${schedule._id}`);
  }
}

export type ScheduleType = {
  _id?: string;
  theme: string;
  Periode: number;
  Date: string;
  Level: string;
  Absence?: string;
  heure?: number;
  professeurs: Array<professeur>;
};

type professeur = {
  _id: string;
  nom?: string;
};
