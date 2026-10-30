import React, { useState, useEffect } from 'react';
import {
  ScreenType,
  UserProfile,
  Violation,
  IncidentReport,
  TrafficNotification,
  RegisteredVehicle,
  PaymentMethodItem,
  NotificationSettingsData,
} from './types/traffic';
import {
  INITIAL_USER,
  INITIAL_VIOLATIONS,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_VEHICLES,
  INITIAL_PAYMENT_METHODS,
  INITIAL_SETTINGS,
} from './data/mockData';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ViolationsScreen } from './components/ViolationsScreen';
import { ViolationDetailModal } from './components/ViolationDetailModal';
import { ReportIncidentWizard } from './components/ReportIncidentWizard';
import { MyReportsScreen } from './components/MyReportsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { PersonalInfoScreen } from './components/PersonalInfoScreen';
import { RegisteredVehiclesScreen } from './components/RegisteredVehiclesScreen';
import { PaymentMethodsScreen } from './components/PaymentMethodsScreen';
import { NotificationSettingsScreen } from './components/NotificationSettingsScreen';
import { RoadsMapScreen } from './components/RoadsMapScreen';
import { PaymentModal } from './components/PaymentModal';
import { AboutModal } from './components/AboutModal';
import { Smartphone, Monitor, Info } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [payingViolation, setPayingViolation] = useState<Violation | null>(null);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState<'mobile' | 'responsive'>('mobile');

  // Persistent State (Local Storage)
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('smart_traffic_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [violations, setViolations] = useState<Violation[]>(() => {
    const saved = localStorage.getItem('smart_traffic_violations');
    return saved ? JSON.parse(saved) : INITIAL_VIOLATIONS;
  });

  const [reports, setReports] = useState<IncidentReport[]>(() => {
    const saved = localStorage.getItem('smart_traffic_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [notifications, setNotifications] = useState<TrafficNotification[]>(() => {
    const saved = localStorage.getItem('smart_traffic_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [vehicles, setVehicles] = useState<RegisteredVehicle[]>(() => {
    const saved = localStorage.getItem('smart_traffic_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodItem[]>(() => {
    const saved = localStorage.getItem('smart_traffic_payment_methods');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENT_METHODS;
  });

  const [settings, setSettings] = useState<NotificationSettingsData>(() => {
    const saved = localStorage.getItem('smart_traffic_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('smart_traffic_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('smart_traffic_violations', JSON.stringify(violations));
  }, [violations]);

  useEffect(() => {
    localStorage.setItem('smart_traffic_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('smart_traffic_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('smart_traffic_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('smart_traffic_payment_methods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  useEffect(() => {
    localStorage.setItem('smart_traffic_settings', JSON.stringify(settings));
  }, [settings]);

  // Handlers
  const handleMarkNotifAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
  };

  const handleAddReport = (newReport: IncidentReport) => {
    setReports((prev) => [newReport, ...prev]);
    // Also push notification for report creation
    const newNotif: TrafficNotification = {
      id: `notif-${Date.now()}`,
      type: 'تحديث',
      title: 'تحديث البلاغ',
      message: `تم تسجيل بلاغك الجديد #${newReport.code} بنجاح لدى العمليات`,
      timeAgo: 'الآن',
      timestamp: Date.now(),
      read: false,
      actionUrl: 'my_reports',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleConfirmViolationPayment = (violationId: string, methodUsed: string) => {
    setViolations((prev) =>
      prev.map((v) =>
        v.id === violationId
          ? {
              ...v,
              status: 'paid',
              paidAt: new Date().toISOString(),
              paymentMethod: methodUsed,
            }
          : v
      )
    );
    // Update selected violation if open
    if (selectedViolation && selectedViolation.id === violationId) {
      setSelectedViolation((prev) =>
        prev ? { ...prev, status: 'paid', paymentMethod: methodUsed } : null
      );
    }
    // Add success notification
    const paidViolation = violations.find((v) => v.id === violationId);
    if (paidViolation) {
      const payNotif: TrafficNotification = {
        id: `notif-${Date.now()}`,
        type: 'عام',
        title: 'سداد مخالفة',
        message: `تم سداد المخالفة ${paidViolation.code} بنجاح بمبلغ ${paidViolation.amount} ريال`,
        timeAgo: 'الآن',
        timestamp: Date.now(),
        read: false,
        actionUrl: 'violations',
      };
      setNotifications((prev) => [payNotif, ...prev]);
    }
  };

  const handleAddVehicle = (newVeh: RegisteredVehicle) => {
    setVehicles((prev) => [...prev, newVeh]);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === id,
      }))
    );
  };

  const handleAddPaymentMethod = (item: PaymentMethodItem) => {
    setPaymentMethods((prev) => [...prev, item]);
  };

  const handleResetApp = () => {
    if (window.confirm('هل تريد إعادة تعيين التطبيق واستعادة البيانات الأولية؟')) {
      localStorage.clear();
      setUser(INITIAL_USER);
      setViolations(INITIAL_VIOLATIONS);
      setReports(INITIAL_REPORTS);
      setNotifications(INITIAL_NOTIFICATIONS);
      setVehicles(INITIAL_VEHICLES);
      setPaymentMethods(INITIAL_PAYMENT_METHODS);
      setSettings(INITIAL_SETTINGS);
      setCurrentScreen('home');
    }
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start text-slate-800 antialiased font-['Cairo',sans-serif]">
      {/* Top Demo Bar / Frame Controller for Desktop */}
      <header className="w-full max-w-4xl mx-auto py-2.5 px-4 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-200">
            المرور جوال (Smart Traffic System)
          </span>
          <span className="hidden sm:inline text-slate-500">
            • تطبيق المرور الذكي للسائقين
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Engineers Credits Button */}
          <button
            onClick={() => setShowAboutModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 font-bold transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>عن المشروع والمهندسين</span>
          </button>

          {/* Device switch buttons */}
          <div className="hidden sm:flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setDeviceFrameMode('mobile')}
              className={`p-1 rounded flex items-center gap-1 text-[11px] font-bold ${
                deviceFrameMode === 'mobile'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="عرض كإطار هاتف ذكي"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>موبايل</span>
            </button>
            <button
              onClick={() => setDeviceFrameMode('responsive')}
              className={`p-1 rounded flex items-center gap-1 text-[11px] font-bold ${
                deviceFrameMode === 'responsive'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="عرض كامل الشاشة"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>شاشة واسعة</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container / Mobile Frame Wrapper */}
      <main
        className={`w-full flex-1 flex flex-col justify-start items-center ${
          deviceFrameMode === 'mobile' ? 'py-2 sm:py-6' : 'py-0'
        }`}
      >
        <div
          className={`w-full bg-[#f8fafc] text-slate-800 min-h-screen relative flex flex-col transition-all duration-300 ${
            deviceFrameMode === 'mobile'
              ? 'max-w-md sm:rounded-[2.8rem] sm:border-[8px] sm:border-slate-800 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] sm:min-h-[860px] overflow-hidden'
              : 'max-w-2xl'
          }`}
        >
          {/* Mobile Speaker / Camera Notch on desktop frame */}
          {deviceFrameMode === 'mobile' && (
            <div className="hidden sm:flex justify-center pt-2 pb-1 bg-white relative z-30">
              <div className="w-28 h-4 bg-slate-900 rounded-full flex items-center justify-end px-3 gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
              </div>
            </div>
          )}

          {/* Active Screen View */}
          <div className="flex-1 w-full overflow-y-auto">
            {currentScreen === 'home' && (
              <HomeScreen
                user={user}
                violations={violations}
                reports={reports}
                unreadNotifsCount={unreadNotifsCount}
                onNavigate={setCurrentScreen}
                onOpenViolation={(v) => setSelectedViolation(v)}
              />
            )}

            {currentScreen === 'notifications' && (
              <NotificationsScreen
                notifications={notifications}
                onNavigate={setCurrentScreen}
                onMarkAsRead={handleMarkNotifAsRead}
                onMarkAllAsRead={handleMarkAllNotifsAsRead}
                onClearAll={handleClearAllNotifs}
              />
            )}

            {currentScreen === 'violations' && (
              <ViolationsScreen
                violations={violations}
                onNavigate={setCurrentScreen}
                onSelectViolation={(v) => setSelectedViolation(v)}
                onPayViolation={(v) => setPayingViolation(v)}
              />
            )}

            {currentScreen === 'report_wizard' && (
              <ReportIncidentWizard
                onNavigate={setCurrentScreen}
                onSubmitReport={handleAddReport}
              />
            )}

            {currentScreen === 'my_reports' && (
              <MyReportsScreen
                reports={reports}
                onNavigate={setCurrentScreen}
              />
            )}

            {currentScreen === 'profile' && (
              <ProfileScreen
                user={user}
                onNavigate={setCurrentScreen}
                onOpenAbout={() => setShowAboutModal(true)}
                onSignOut={handleResetApp}
              />
            )}

            {currentScreen === 'personal_info' && (
              <PersonalInfoScreen
                user={user}
                onNavigate={setCurrentScreen}
                onUpdateUser={setUser}
              />
            )}

            {currentScreen === 'vehicles' && (
              <RegisteredVehiclesScreen
                vehicles={vehicles}
                onNavigate={setCurrentScreen}
                onAddVehicle={handleAddVehicle}
                onDeleteVehicle={handleDeleteVehicle}
              />
            )}

            {currentScreen === 'payment_methods' && (
              <PaymentMethodsScreen
                methods={paymentMethods}
                onNavigate={setCurrentScreen}
                onSetDefault={handleSetDefaultPayment}
                onAddMethod={handleAddPaymentMethod}
              />
            )}

            {currentScreen === 'notification_settings' && (
              <NotificationSettingsScreen
                settings={settings}
                onNavigate={setCurrentScreen}
                onSaveSettings={setSettings}
              />
            )}

            {currentScreen === 'traffic_map' && (
              <RoadsMapScreen
                onNavigate={setCurrentScreen}
                onOpenReport={() => setCurrentScreen('report_wizard')}
              />
            )}
          </div>

          {/* Bottom Navigation Bar */}
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            unreadCount={unreadNotifsCount}
          />
        </div>
      </main>

      {/* Violation Detail Modal (Page 5) */}
      {selectedViolation && (
        <ViolationDetailModal
          violation={selectedViolation}
          onClose={() => setSelectedViolation(null)}
          onPay={(v) => {
            setSelectedViolation(null);
            setPayingViolation(v);
          }}
        />
      )}

      {/* Payment Processing Modal (Electronic Payments) */}
      {payingViolation && (
        <PaymentModal
          violation={payingViolation}
          paymentMethods={paymentMethods}
          onClose={() => setPayingViolation(null)}
          onConfirmPayment={handleConfirmViolationPayment}
        />
      )}

      {/* About Project & Engineers Credit Modal (Pages 1 & 2) */}
      {showAboutModal && (
        <AboutModal onClose={() => setShowAboutModal(false)} />
      )}
    </div>
  );
}
