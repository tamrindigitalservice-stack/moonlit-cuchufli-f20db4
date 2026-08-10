import { ServiceItem } from './data/services';

export type RequestStatus = 'New' | 'Contacted' | 'Processing' | 'Completed' | 'Cancelled';

export interface ServiceRequest {
  id: string;
  customerName: string;
  mobile: string;
  serviceId: string;
  serviceName: string;
  category: 'central' | 'wb' | 'other';
  preferredContact: 'WhatsApp' | 'Phone Call';
  message: string;
  status: RequestStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  adminNote?: string;
}

export interface Announcement {
  id: string;
  title: string;
  descriptionBengali: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface DaySchedule {
  day: string;
  dayBengali: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface BusinessSettings {
  businessName: string;
  phone: string;
  whatsapp: string;
  address: string;
  email: string;
  hours: string;
  mapUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  weeklySchedule: DaySchedule[];
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin';
}
