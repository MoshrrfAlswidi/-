export type ScreenType =
  | 'home'
  | 'notifications'
  | 'violations'
  | 'violation_detail'
  | 'report_wizard'
  | 'my_reports'
  | 'profile'
  | 'personal_info'
  | 'vehicles'
  | 'payment_methods'
  | 'notification_settings'
  | 'traffic_map'
  | 'about';

export interface Violation {
  id: string;
  code: string;
  type: string;
  date: string;
  time: string;
  location: string;
  plateNumber: string;
  amount: number;
  points: number;
  status: 'paid' | 'unpaid';
  details: string;
  imageUrl?: string;
  paidAt?: string;
  paymentMethod?: string;
}

export type ReportCategory = 'حادث مروري' | 'ازدحام مروري' | 'طريق مغلق' | 'أخرى';

export type ReportStatus = 'قيد المعالجة' | 'تم الحل' | 'مرفوض';

export interface IncidentReport {
  id: string;
  code: string;
  type: ReportCategory;
  customType?: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  description: string;
  dateTime: string;
  images: string[];
  status: ReportStatus;
  statusTimeline: {
    title: string;
    description: string;
    time: string;
    completed: boolean;
    current?: boolean;
  }[];
}

export type NotificationType = 'تحذير' | 'تحديث' | 'عام' | 'ازدحام';

export interface TrafficNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timeAgo: string;
  timestamp: number;
  read: boolean;
  actionUrl?: ScreenType;
}

export interface UserProfile {
  name: string;
  nationalId: string;
  phone: string;
  email: string;
  governorate: string;
  address: string;
  isVerified: boolean;
  licenseNumber: string;
  licenseIssueDate: string;
  licenseExpiryDate: string;
  licenseCategory: string;
  avatarUrl: string;
}

export interface RegisteredVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  color: string;
  fuelType: 'بنزين' | 'ديزل' | 'كهربائي' | 'هجين';
  status: 'سارية' | 'منتهية';
  registrationExpiry: string;
  insuranceExpiry: string;
  imageUrl?: string;
}

export type PaymentCategory = 'card' | 'wallet' | 'bank';

export interface PaymentMethodItem {
  id: string;
  category: PaymentCategory;
  name: string; // e.g. "VISA", "MasterCard", "محفظة فلوس", "بنك الكريمي", "بنك اليمن والكويت"
  accountOrNumber: string;
  expiryOrStatus: string;
  isDefault: boolean;
  isActive: boolean;
  iconType: 'visa' | 'mastercard' | 'wallet' | 'kuraimi' | 'bank';
}

export interface NotificationSettingsData {
  generalNotifications: boolean;
  newViolations: boolean;
  licenseReminder: boolean;
  vehicleRegistrationExpiry: boolean;
  offersAndServices: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  ringtone: string;
  dndEnabled: boolean;
  dndTimeRange: string;
}

export interface TrafficRoadPoint {
  id: string;
  name: string;
  city: string;
  status: 'smooth' | 'heavy' | 'closed';
  statusText: string;
  coordinates: { x: number; y: number };
  details: string;
}
