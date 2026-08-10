import { ServiceItem, CENTRAL_SERVICES, WEST_BENGAL_SERVICES, BUSINESS_INFO } from './services';
import { ServiceRequest, Announcement, BusinessSettings, DaySchedule, RequestStatus } from '../types';
import { isFirebaseConfigured, auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  createServiceRequestFirestore, 
  updateRequestStatusFirestore,
  subscribeToServiceRequestsFirestore,
  subscribeServicesFirestore,
  saveServiceFirestore,
  subscribeAnnouncementsFirestore,
  saveAnnouncementFirestore,
  deleteAnnouncementFirestore,
  subscribeSettingsFirestore,
  saveSettingsFirestore
} from './firestoreService';

const REQUESTS_STORAGE_KEY = 'tds_service_requests_v1';
const SERVICES_STORAGE_KEY = 'tds_services_v1';
const ANNOUNCEMENTS_STORAGE_KEY = 'tds_announcements_v1';
const SETTINGS_STORAGE_KEY = 'tds_settings_v1';
const AUTH_STORAGE_KEY = 'tds_admin_session_v1';

// Initial Business Settings Default
const INITIAL_SCHEDULE: DaySchedule[] = [
  { day: 'Monday', dayBengali: 'সোম', isOpen: true, openTime: '08:00', closeTime: '20:00' },
  { day: 'Tuesday', dayBengali: 'মঙ্গল', isOpen: true, openTime: '08:00', closeTime: '20:00' },
  { day: 'Wednesday', dayBengali: 'বুধ', isOpen: true, openTime: '08:00', closeTime: '20:00' },
  { day: 'Thursday', dayBengali: 'বৃহস্পতি', isOpen: true, openTime: '08:00', closeTime: '20:00' },
  { day: 'Friday', dayBengali: 'শুক্র', isOpen: true, openTime: '08:00', closeTime: '20:00' },
  { day: 'Saturday', dayBengali: 'শনি', isOpen: true, openTime: '08:00', closeTime: '20:00' },
  { day: 'Sunday', dayBengali: 'রবি', isOpen: true, openTime: '09:00', closeTime: '18:00' },
];

const INITIAL_SETTINGS: BusinessSettings = {
  businessName: BUSINESS_INFO.name,
  phone: BUSINESS_INFO.phone,
  whatsapp: BUSINESS_INFO.whatsapp,
  address: BUSINESS_INFO.address,
  email: BUSINESS_INFO.email,
  hours: BUSINESS_INFO.hours,
  mapUrl: BUSINESS_INFO.mapQuery,
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  weeklySchedule: INITIAL_SCHEDULE,
};

// Initial Sample Announcements
const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'গুরুত্বপূর্ণ ঘোষণা',
    descriptionBengali: 'রেশন কার্ড এবং আধার কার্ড ডিজিটাল আপডেটের জন্য আমাদের সেন্টারে যোগাযোগ করুন। সপ্তাহের ৭ দিন সকাল ৮টা থেকে রাত ৮টা পর্যন্ত খোলা।',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-12-31',
    isActive: true,
  }
];

// Setup Auto Firestore Subscriptions if Firebase is configured
if (isFirebaseConfigured) {
  try {
    // Only subscribe to Service Requests if an authenticated user is present
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          subscribeToServiceRequestsFirestore((requests) => {
            localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
            window.dispatchEvent(new Event('tds_requests_updated'));
          }, (notifyMsg) => {
            window.dispatchEvent(new CustomEvent('tds_new_request_toast', { detail: { message: notifyMsg } }));
          });
        }
      });
    }

    // Sync Services from Firestore
    subscribeServicesFirestore((services) => {
      if (services.length > 0) {
        localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
        window.dispatchEvent(new Event('tds_services_updated'));
      }
    });

    // Sync Announcements from Firestore
    subscribeAnnouncementsFirestore((announcements) => {
      localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(announcements));
      window.dispatchEvent(new Event('tds_announcements_updated'));
    });

    // Sync Settings from Firestore
    subscribeSettingsFirestore((settings) => {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      window.dispatchEvent(new Event('tds_settings_updated'));
    });

  } catch (err) {
    console.warn('Firestore subscription setup notice:', err);
  }
}

// SERVICES
export function getStoredServices(): ServiceItem[] {
  try {
    const stored = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading services', e);
  }
  const defaultServices = [...CENTRAL_SERVICES, ...WEST_BENGAL_SERVICES];
  localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(defaultServices));
  return defaultServices;
}

export function saveStoredServices(services: ServiceItem[]): void {
  localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
  window.dispatchEvent(new Event('tds_services_updated'));

  if (isFirebaseConfigured) {
    services.forEach((s) => saveServiceFirestore(s));
  }
}

// REQUESTS
export function getStoredRequests(): ServiceRequest[] {
  try {
    const stored = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading requests', e);
  }
  return [];
}

export async function addServiceRequest(requestData: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<ServiceRequest> {
  const current = getStoredRequests();
  const fallbackId = 'TDS-' + Math.floor(100000 + Math.random() * 900000);
  
  const newReq: ServiceRequest = {
    ...requestData,
    id: fallbackId,
    status: 'New',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 1. Save to local storage for immediate responsiveness
  const updated = [newReq, ...current];
  localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('tds_requests_updated'));

  // 2. Save to Firestore if available
  if (isFirebaseConfigured) {
    const docId = await createServiceRequestFirestore(requestData);
    if (docId) {
      newReq.id = docId;
    }
  }

  return newReq;
}

export function updateServiceRequestStatus(id: string, status: RequestStatus, adminNote?: string): void {
  const current = getStoredRequests();
  const updated = current.map((req) => {
    if (req.id === id) {
      return {
        ...req,
        status,
        adminNote: adminNote !== undefined ? adminNote : req.adminNote,
        updatedAt: new Date().toISOString(),
      };
    }
    return req;
  });
  localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('tds_requests_updated'));

  if (isFirebaseConfigured) {
    updateRequestStatusFirestore(id, status, adminNote);
  }
}

// ANNOUNCEMENTS
export function getStoredAnnouncements(): Announcement[] {
  try {
    const stored = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading announcements', e);
  }
  localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(INITIAL_ANNOUNCEMENTS));
  return INITIAL_ANNOUNCEMENTS;
}

export function saveStoredAnnouncements(announcements: Announcement[]): void {
  localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(announcements));
  window.dispatchEvent(new Event('tds_announcements_updated'));

  if (isFirebaseConfigured) {
    announcements.forEach((ann) => saveAnnouncementFirestore(ann));
  }
}

// SETTINGS
export function getStoredSettings(): BusinessSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading settings', e);
  }
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(INITIAL_SETTINGS));
  return INITIAL_SETTINGS;
}

export function saveStoredSettings(settings: BusinessSettings): void {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event('tds_settings_updated'));

  if (isFirebaseConfigured) {
    saveSettingsFirestore(settings);
  }
}

// ADMIN SESSION
export function checkIsAdminAuthenticated(): boolean {
  try {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);
    if (session) {
      const parsed = JSON.parse(session);
      return parsed.isAuthenticated === true;
    }
  } catch (e) {
    console.error('Error checking admin auth', e);
  }
  return false;
}

export function setAdminAuthenticated(status: boolean, userEmail?: string): void {
  if (status) {
    localStorage.setItem(
      AUTH_STORAGE_KEY, 
      JSON.stringify({ 
        isAuthenticated: true, 
        email: userEmail || 'admin@tamrindigital.com', 
        timestamp: new Date().toISOString() 
      })
    );
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  window.dispatchEvent(new Event('tds_auth_updated'));
}
