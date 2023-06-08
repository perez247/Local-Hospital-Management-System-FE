import { Base, Company, Patient, Staff } from "./app-user";

export class AppAppointmentCount {
  total?: number
  appointmentDate?: string
}

export class AppointmentFilter {
  exactDate?: string;
  startDate?: string;
  appointmentId?: string;
  patientName?: string;
  patientId?: string;
  doctorName?: string;
  doctorId?: string;
}

export class AppAppointment {
  base?: Base
  appointmentDate?: Date
  company?: Company
  patient?: Patient
  doctor?: Staff
  overallDescription?: string;

  constructor(data: Partial<AppAppointment>) {
    Object.assign(this, data);
  }

  isToday(): boolean {
    return new Date().toDateString() === new Date(this.appointmentDate ?? '').toDateString()
  }
}
