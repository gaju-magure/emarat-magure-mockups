import type { TranslationKeys } from './en';

export const ar: TranslationKeys = {
  // Common
  common: {
    loading: 'جار التحميل...',
    error: 'خطأ',
    success: 'نجح',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    close: 'إغلاق',
    back: 'رجوع',
    next: 'التالي',
    submit: 'إرسال',
    search: 'بحث',
    filter: 'تصفية',
    export: 'تصدير',
    import: 'استيراد',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',
    help: 'مساعدة',
    notifications: 'الإشعارات',
    language: 'اللغة',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    system: 'النظام',
  },

  // Authentication
  auth: {
    login: 'تسجيل الدخول',
    loginTitle: 'مرحباً بعودتك',
    loginSubtitle: 'سجل الدخول إلى حسابك في إمارات',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    orContinueWith: 'أو المتابعة باستخدام',
    microsoft: 'مايكروسوفت',
    google: 'جوجل',
    demoUsers: 'مستخدمو العرض التوضيحي',
    selectDemo: 'اختر مستخدم تجريبي لتسجيل دخول سريع',

    twoFactor: 'المصادقة الثنائية',
    twoFactorSubtitle: 'أدخل الرمز المكون من 6 أرقام من تطبيق المصادقة',
    verificationCode: 'رمز التحقق',
    verify: 'تحقق',
    resendCode: 'إعادة إرسال الرمز',

    forgotPasswordTitle: 'نسيت كلمة المرور',
    forgotPasswordSubtitle: 'أدخل بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور',
    sendResetLink: 'إرسال رابط إعادة التعيين',
    backToLogin: 'العودة لتسجيل الدخول',
    resetLinkSent: 'تم إرسال رابط إعادة التعيين!',
    checkEmail: 'تحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور',

    resetPassword: 'إعادة تعيين كلمة المرور',
    resetPasswordSubtitle: 'أنشئ كلمة مرور جديدة لحسابك',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    passwordRequirements: 'متطلبات كلمة المرور',
    minChars: 'على الأقل 8 أحرف',
    uppercase: 'حرف كبير واحد',
    lowercase: 'حرف صغير واحد',
    number: 'رقم واحد',
    passwordsMatch: 'كلمات المرور متطابقة',
    resetSuccess: 'تمت إعادة تعيين كلمة المرور بنجاح!',
    redirecting: 'إعادة التوجيه إلى تسجيل الدخول...',

    sessionExpired: 'انتهت الجلسة',
    sessionExpiredMessage: 'انتهت صلاحية جلستك لأسباب أمنية. يرجى تسجيل الدخول مرة أخرى للمتابعة.',
    securityTips: 'نصائح أمنية',
    tipRegular: 'قم بتسجيل الخروج عند استخدام الأجهزة المشتركة',
    tipPassword: 'استخدم كلمة مرور قوية وفريدة',
    tipActivity: 'راجع نشاط حسابك بانتظام',

    accountLocked: 'الحساب مقفل',
    accountLockedMessage: 'تم قفل حسابك بسبب نشاط مشبوه أو محاولات تسجيل دخول فاشلة متعددة.',
    whatToDo: 'ماذا تفعل بعد ذلك',
    contactSupport: 'اتصل بالدعم الفني',
    tryAgainLater: 'حاول مرة أخرى خلال 30 دقيقة',
    resetPasswordAction: 'إعادة تعيين كلمة المرور',
  },

  // Navigation
  nav: {
    dashboard: 'لوحة المعلومات',
    insights: 'رؤى إمارات',
    magvision: 'ماج فيجن IQ',
    helpdesk: 'مكتب مساعدة الموظفين',
    attendance: 'الوقت والحضور',
    hiring: 'التوظيف بالذكاء الاصطناعي',
    reconciliation: 'تسوية المستندات',
    vendors: 'تأهيل الموردين',
    forecasting: 'التنبؤ بالطلب',
    compliance: 'السلامة والامتثال',

    // Navigation Groups
    main: 'الرئيسية',
    operations: 'العمليات',
    hr: 'الموارد البشرية',
    finance: 'المالية والمشتريات',
    safety: 'السلامة والأمن',

    // MagVision Sub-features
    askMagVision: 'اسأل ماج فيجن IQ',
    footfall: 'تتبع الإقبال والخرائط الحرارية',
    sales: 'المبيعات والإيرادات',
    inventory: 'المخزون',
    queue: 'مراقبة الطوابير',
    staff: 'الموظفون والجدولة',
    security: 'الأمن والامتثال',
    reports: 'التقارير',
  },

  // Dashboard
  dashboard: {
    welcome: 'مرحباً بعودتك',
    quickActions: 'إجراءات سريعة',
    recentActivity: 'النشاط الأخير',
    overview: 'نظرة عامة',
    viewAll: 'عرض الكل',
  },

  // MagVision
  magvision: {
    title: 'لوحة معلومات ماج فيجن IQ',
    subtitle: 'ذكاء عمليات البيع بالتجزئة بالذكاء الاصطناعي',

    // Ask MagVision
    askTitle: 'اسأل ماج فيجن IQ',
    askSubtitle: 'رؤى الذكاء الاصطناعي',
    newChat: 'محادثة جديدة',
    chatPlaceholder: 'اسأل أي شيء عن بيانات متجرك...',
    suggestedQuestions: 'أسئلة مقترحة',
    thinking: 'جاري التفكير...',

    // Footfall Tracking
    footfallTitle: 'تتبع الإقبال والخرائط الحرارية',
    footfallSubtitle: 'تحليلات حركة العملاء والمناطق في الوقت الفعلي',
    totalVisitors: 'إجمالي الزوار',
    currentVisitors: 'الزوار الحاليون',
    liveCount: 'عدد مباشر',
    peakHour: 'ساعة الذروة',
    avgDwellTime: 'متوسط وقت المكوث',
    perVisitor: 'لكل زائر',
    storeHeatMap: 'خريطة حرارة المتجر',
    low: 'منخفض',
    high: 'مرتفع',
    zoneRankings: 'تصنيفات المناطق',
    visits: 'زيارات',
    hot: 'ساخن',
    warm: 'دافئ',
    cool: 'بارد',
    hourlyTraffic: 'نمط حركة المرور بالساعة',
    today: 'اليوم',
    days7: '7 أيام',
    days30: '30 يوم',

    // Zones
    entrance: 'المدخل',
    fuelPumps: 'مضخات الوقود',
    storeArea: 'منطقة المتجر',
    checkout: 'الدفع',
    atmArea: 'منطقة الصراف الآلي',
    restrooms: 'دورات المياه',

    // Coming Soon
    comingSoon: 'قريباً',
    underDevelopment: 'هذه الميزة قيد التطوير',
  },

  // User Roles
  roles: {
    storeManager: 'مدير المتجر',
    hrManager: 'مدير الموارد البشرية',
    fuelAttendant: 'موظف محطة الوقود',
    financeManager: 'مدير المالية',
    retailEmployee: 'موظف متجر التجزئة',
    procurement: 'أخصائي المشتريات',
  },

  // Departments
  departments: {
    retailOps: 'عمليات البيع بالتجزئة',
    humanResources: 'الموارد البشرية',
    operations: 'العمليات',
    finance: 'المالية',
    retail: 'البيع بالتجزئة',
    procurement: 'المشتريات',
  },

  // Time
  time: {
    am: 'ص',
    pm: 'م',
    at: 'في',
    ago: 'منذ',
    now: 'الآن',
    today: 'اليوم',
    yesterday: 'أمس',
    thisWeek: 'هذا الأسبوع',
    thisMonth: 'هذا الشهر',
    minutes: 'دقائق',
    hours: 'ساعات',
    days: 'أيام',
  },

  // Errors
  errors: {
    general: 'حدث خطأ ما',
    network: 'خطأ في الشبكة. يرجى التحقق من اتصالك.',
    unauthorized: 'غير مصرح لك بالوصول إلى هذا المورد',
    notFound: 'المورد غير موجود',
    validation: 'يرجى التحقق من إدخالك',
  },
};
