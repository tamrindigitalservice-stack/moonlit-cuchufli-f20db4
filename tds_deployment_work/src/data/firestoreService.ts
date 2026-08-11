import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth, isFirebaseConfigured } from '../lib/firebase';
import { ServiceRequest, Announcement, BusinessSettings, RequestStatus } from '../types';
import { ServiceItem } from './services';

export interface AdminUser {
  uid: string;
  email: string;
  name?: string;
  role: 'admin';
  createdAt?: string;
}

// ==========================================
// ADMIN AUTH & AUTHORIZATION
// ==========================================

export async function loginAdminFirebase(email: string, pass: string): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  if (!isFirebaseConfigured || !auth || !db) {
    return { 
      success: false, 
      error: 'Firebase API Key সংসংগৃহীত নেই। Firebase setup checklist অনুসরণ করুন।' 
    };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), pass.trim());
    const user = userCredential.user;

    // Check if user is in 'admins' collection
    const adminDocRef = doc(db, 'admins', user.uid);
    const adminDocSnap = await getDoc(adminDocRef);

    if (!adminDocSnap.exists()) {
      // User authenticated in Firebase Auth, but NOT in admins collection
      await signOut(auth);
      return { 
        success: false, 
        error: 'আপনার পর্যাপ্ত অনুমতি নেই। (Unauthorized Admin User)' 
      };
    }

    const adminData = adminDocSnap.data() as AdminUser;
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email || email,
        name: adminData.name || 'Admin',
        role: 'admin'
      }
    };

  } catch (err: any) {
    console.error('Firebase Auth Error:', err);
    if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
      return { success: false, error: 'আপনার লগইন তথ্য সঠিক নয়।' };
    }
    if (err.code === 'auth/network-request-failed' || err.code === 'auth/unavailable') {
      return { success: false, error: 'এই মুহূর্তে পরিষেবাটি সাময়িকভাবে unavailable। কিছুক্ষণ পরে আবার চেষ্টা করুন।' };
    }
    return { success: false, error: err.message || 'লগইন ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।' };
  }
}

export async function logoutAdminFirebase(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Logout error:', e);
    }
  }
}

// ==========================================
// SERVICE REQUESTS (FIRESTORE)
// ==========================================

export async function createServiceRequestFirestore(requestData: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<string | null> {
  if (!isFirebaseConfigured || !db) return null;

  try {
    const colRef = collection(db, 'serviceRequests');
    const newDoc = await addDoc(colRef, {
      customerName: requestData.customerName.trim(),
      mobile: requestData.mobile.trim(),
      serviceId: requestData.serviceId,
      serviceName: requestData.serviceName,
      category: requestData.category,
      preferredContact: requestData.preferredContact,
      message: requestData.message ? requestData.message.trim() : '',
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      adminNote: ''
    });
    return newDoc.id;
  } catch (e) {
    console.error('Error saving request to Firestore:', e);
    return null;
  }
}

export function subscribeToServiceRequestsFirestore(
  onUpdate: (requests: ServiceRequest[]) => void,
  onNewNotification?: (message: string) => void
) {
  if (!isFirebaseConfigured || !db) return () => {};

  const colRef = collection(db, 'serviceRequests');
  const q = query(colRef, orderBy('createdAt', 'desc'));

  let isFirstLoad = true;

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const requests: ServiceRequest[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      requests.push({
        id: docSnap.id,
        customerName: data.customerName || '',
        mobile: data.mobile || '',
        serviceId: data.serviceId || '',
        serviceName: data.serviceName || '',
        category: data.category || 'wb',
        preferredContact: data.preferredContact || 'WhatsApp',
        message: data.message || '',
        status: data.status || 'New',
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
        adminNote: data.adminNote || ''
      });
    });

    if (!isFirstLoad && onNewNotification) {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          onNewNotification('নতুন Service Request এসেছে');
        }
      });
    }

    isFirstLoad = false;
    onUpdate(requests);
  }, (err) => {
    if (err.code === 'permission-denied' || err.message?.includes('permission')) {
      console.warn('ServiceRequests snapshot access is restricted to authenticated admins.');
    } else {
      console.warn('ServiceRequests snapshot listener notice:', err.message || err);
    }
  });

  return unsubscribe;
}

export async function updateRequestStatusFirestore(id: string, status: RequestStatus, adminNote?: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;

  try {
    const docRef = doc(db, 'serviceRequests', id);
    const updatePayload: any = {
      status,
      updatedAt: new Date().toISOString()
    };
    if (adminNote !== undefined) {
      updatePayload.adminNote = adminNote;
    }
    await updateDoc(docRef, updatePayload);
    return true;
  } catch (e) {
    console.error('Error updating request status in Firestore:', e);
    return false;
  }
}

// ==========================================
// SERVICES MANAGEMENT (FIRESTORE)
// ==========================================

export async function fetchServicesFirestore(): Promise<ServiceItem[]> {
  if (!isFirebaseConfigured || !db) return [];

  try {
    const colRef = collection(db, 'services');
    const querySnapshot = await getDocs(colRef);
    const list: ServiceItem[] = [];

    querySnapshot.forEach((docSnap) => {
      const d = docSnap.data();
      list.push({
        id: docSnap.id,
        titleBengali: d.titleBengali || d.name || '',
        titleEnglish: d.titleEnglish || '',
        category: d.category || 'wb',
        iconName: d.iconName || d.icon || 'FileText',
        shortDesc: d.shortDesc || d.description || '',
        fullDesc: d.fullDesc || d.description || '',
        turnaroundTime: d.turnaroundTime || '১-২ কর্মদিবস',
        documents: Array.isArray(d.documents) ? d.documents : [],
        isPopular: d.isPopular ?? d.popular ?? false,
        isActive: d.isActive ?? d.active ?? true,
      });
    });

    return list;
  } catch (e) {
    console.error('Error fetching services from Firestore:', e);
    return [];
  }
}

export function subscribeServicesFirestore(onUpdate: (services: ServiceItem[]) => void) {
  if (!isFirebaseConfigured || !db) return () => {};

  const colRef = collection(db, 'services');
  return onSnapshot(colRef, (snapshot) => {
    const list: ServiceItem[] = [];
    snapshot.forEach((docSnap) => {
      const d = docSnap.data();
      list.push({
        id: docSnap.id,
        titleBengali: d.titleBengali || d.name || '',
        titleEnglish: d.titleEnglish || '',
        category: d.category || 'wb',
        iconName: d.iconName || d.icon || 'FileText',
        shortDesc: d.shortDesc || d.description || '',
        fullDesc: d.fullDesc || d.description || '',
        turnaroundTime: d.turnaroundTime || '১-২ কর্মদিবস',
        documents: Array.isArray(d.documents) ? d.documents : [],
        isPopular: d.isPopular ?? d.popular ?? false,
        isActive: d.isActive ?? d.active ?? true,
      });
    });
    onUpdate(list);
  }, (err) => {
    if (err.code === 'permission-denied' || err.message?.includes('permission')) {
      console.warn('Services read permission notice: Using local service defaults until Firestore security rules are deployed in Firebase Console.');
    } else {
      console.warn('Services Firestore snapshot notice:', err.message || err);
    }
  });
}

export async function saveServiceFirestore(service: ServiceItem): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;

  try {
    const docRef = doc(db, 'services', service.id);
    await setDoc(docRef, {
      titleBengali: service.titleBengali,
      titleEnglish: service.titleEnglish,
      category: service.category,
      iconName: service.iconName,
      shortDesc: service.shortDesc,
      fullDesc: service.fullDesc,
      turnaroundTime: service.turnaroundTime,
      documents: service.documents,
      isPopular: service.isPopular ?? false,
      isActive: service.isActive ?? true,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (e) {
    console.error('Error saving service to Firestore:', e);
    return false;
  }
}

export async function deleteServiceFirestore(serviceId: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;

  try {
    const docRef = doc(db, 'services', serviceId);
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    console.error('Error deleting service from Firestore:', e);
    return false;
  }
}

// ==========================================
// ANNOUNCEMENTS (FIRESTORE)
// ==========================================

export function subscribeAnnouncementsFirestore(onUpdate: (announcements: Announcement[]) => void) {
  if (!isFirebaseConfigured || !db) return () => {};

  const colRef = collection(db, 'announcements');
  return onSnapshot(colRef, (snapshot) => {
    const list: Announcement[] = [];
    snapshot.forEach((docSnap) => {
      const d = docSnap.data();
      list.push({
        id: docSnap.id,
        title: d.title || '',
        descriptionBengali: d.descriptionBengali || d.description || '',
        startDate: d.startDate || new Date().toISOString().split('T')[0],
        endDate: d.endDate || '',
        isActive: d.isActive ?? d.active ?? true,
      });
    });
    onUpdate(list);
  }, (err) => {
    if (err.code === 'permission-denied' || err.message?.includes('permission')) {
      console.warn('Announcements read permission notice: Using local announcement defaults until Firestore security rules are deployed in Firebase Console.');
    } else {
      console.warn('Announcements Firestore snapshot notice:', err.message || err);
    }
  });
}

export async function saveAnnouncementFirestore(announcement: Announcement): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;

  try {
    const docRef = doc(db, 'announcements', announcement.id);
    await setDoc(docRef, {
      title: announcement.title,
      descriptionBengali: announcement.descriptionBengali,
      startDate: announcement.startDate,
      endDate: announcement.endDate,
      isActive: announcement.isActive,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (e) {
    console.error('Error saving announcement in Firestore:', e);
    return false;
  }
}

export async function deleteAnnouncementFirestore(id: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;

  try {
    await deleteDoc(doc(db, 'announcements', id));
    return true;
  } catch (e) {
    console.error('Error deleting announcement in Firestore:', e);
    return false;
  }
}

// ==========================================
// SETTINGS / BUSINESS INFO (FIRESTORE)
// ==========================================

export function subscribeSettingsFirestore(onUpdate: (settings: BusinessSettings) => void) {
  if (!isFirebaseConfigured || !db) return () => {};

  const docRef = doc(db, 'settings', 'business');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const d = docSnap.data() as BusinessSettings;
      onUpdate(d);
    }
  }, (err) => {
    if (err.code === 'permission-denied' || err.message?.includes('permission')) {
      console.warn('Settings read permission notice: Using local settings defaults until Firestore security rules are deployed in Firebase Console.');
    } else {
      console.warn('Settings Firestore snapshot notice:', err.message || err);
    }
  });
}

export async function saveSettingsFirestore(settings: BusinessSettings): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;

  try {
    const docRef = doc(db, 'settings', 'business');
    await setDoc(docRef, {
      ...settings,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (e) {
    console.error('Error saving settings to Firestore:', e);
    return false;
  }
}
