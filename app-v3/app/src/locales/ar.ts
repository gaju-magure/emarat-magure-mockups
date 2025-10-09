/**
 * Arabic Translations
 */

import type { TranslationKeys } from './en';

export const ar: TranslationKeys = {
  // Common
  common: {
    welcome: 'مرحباً',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    close: 'إغلاق',
    back: 'رجوع',
    next: 'التالي',
    search: 'بحث',
    filter: 'تصفية',
    sort: 'ترتيب',
    viewAll: 'عرض الكل',
    showMore: 'عرض المزيد',
    showLess: 'عرض أقل',
  },

  // Navigation
  nav: {
    home: 'الرئيسية',
    apps: 'التطبيقات',
    tasks: 'المهام',
    governance: 'الحوكمة',
    settings: 'الإعدادات',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
  },

  // Jarvis (AI Assistant)
  jarvis: {
    greeting: {
      morning: 'صباح الخير',
      afternoon: 'مساء الخير',
      evening: 'مساء الخير',
    },
    placeholder: 'اسأل جارفيس أي شيء...',
    thinking: 'جارفيس يفكر...',
    error: 'عذراً، حدث خطأ.',
  },

  // Priority Alerts
  alerts: {
    title: 'التنبيهات ذات الأولوية',
    viewAll: 'عرض كل التنبيهات',
    markAsRead: 'وضع علامة كمقروء',
    noAlerts: 'لا توجد تنبيهات في الوقت الحالي',
  },

  // Quick Actions
  quickActions: {
    title: 'الإجراءات السريعة',
    rfpReview: 'مراجعة طلب العرض',
    newTask: 'مهمة جديدة',
    viewReports: 'عرض التقارير',
    scheduleDemo: 'جدولة عرض توضيحي',
  },

  // RFP Module
  rfp: {
    title: 'تقييم طلب العرض',
    evaluate: 'تقييم طلب العرض',
    upload: 'رفع طلب العرض',
    analyzing: 'جاري تحليل طلب العرض...',
    summary: 'ملخص',
    recommendations: 'التوصيات',
    riskAssessment: 'تقييم المخاطر',
    complianceCheck: 'فحص الامتثال',
  },

  // Tasks
  tasks: {
    title: 'مهامي',
    new: 'مهمة جديدة',
    pending: 'قيد الانتظار',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    overdue: 'متأخر',
    dueToday: 'مستحق اليوم',
    noDueDate: 'بدون تاريخ استحقاق',
  },

  // Governance
  governance: {
    title: 'لوحة الحوكمة',
    compliance: 'الامتثال',
    policies: 'السياسات',
    audits: 'المراجعات',
    reports: 'التقارير',
  },

  // Settings
  settings: {
    title: 'الإعدادات',
    appearance: 'المظهر',
    language: 'اللغة',
    notifications: 'الإشعارات',
    privacy: 'الخصوصية',
    account: 'الحساب',
    theme: {
      light: 'فاتح',
      dark: 'داكن',
      system: 'النظام',
    },
  },

  // Auth
  auth: {
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    forgotPassword: 'هل نسيت كلمة المرور؟',
    rememberMe: 'تذكرني',
  },

  // Error Messages
  errors: {
    generic: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    network: 'خطأ في الشبكة. يرجى التحقق من اتصالك.',
    notFound: 'الصفحة غير موجودة.',
    unauthorized: 'غير مصرح لك بعرض هذه الصفحة.',
    validation: 'يرجى التحقق من المدخلات والمحاولة مرة أخرى.',
  },

  // Time
  time: {
    justNow: 'الآن',
    minutesAgo: 'منذ {{count}} دقيقة',
    hoursAgo: 'منذ {{count}} ساعة',
    daysAgo: 'منذ {{count}} يوم',
    weeksAgo: 'منذ {{count}} أسبوع',
  },
} as const;
