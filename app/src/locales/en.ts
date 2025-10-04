export const en = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    settings: 'Settings',
    logout: 'Logout',
    profile: 'Profile',
    help: 'Help',
    notifications: 'Notifications',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },

  // Authentication
  auth: {
    login: 'Login',
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Sign in to your Emarat account',
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
    orContinueWith: 'Or continue with',
    microsoft: 'Microsoft',
    google: 'Google',
    demoUsers: 'Demo Users',
    selectDemo: 'Select a demo user to quickly login',

    twoFactor: 'Two-Factor Authentication',
    twoFactorSubtitle: 'Enter the 6-digit code from your authenticator app',
    verificationCode: 'Verification Code',
    verify: 'Verify',
    resendCode: 'Resend code',

    forgotPasswordTitle: 'Forgot Password',
    forgotPasswordSubtitle: 'Enter your email to receive a password reset link',
    sendResetLink: 'Send Reset Link',
    backToLogin: 'Back to Login',
    resetLinkSent: 'Reset link sent!',
    checkEmail: 'Check your email for password reset instructions',

    resetPassword: 'Reset Password',
    resetPasswordSubtitle: 'Create a new password for your account',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    passwordRequirements: 'Password Requirements',
    minChars: 'At least 8 characters',
    uppercase: 'One uppercase letter',
    lowercase: 'One lowercase letter',
    number: 'One number',
    passwordsMatch: 'Passwords match',
    resetSuccess: 'Password Reset Successful!',
    redirecting: 'Redirecting to login...',

    sessionExpired: 'Session Expired',
    sessionExpiredMessage: 'Your session has expired for security reasons. Please log in again to continue.',
    securityTips: 'Security Tips',
    tipRegular: 'Log out when using shared devices',
    tipPassword: 'Use a strong, unique password',
    tipActivity: 'Review your account activity regularly',

    accountLocked: 'Account Locked',
    accountLockedMessage: 'Your account has been locked due to suspicious activity or too many failed login attempts.',
    whatToDo: 'What to do next',
    contactSupport: 'Contact IT Support',
    tryAgainLater: 'Try again in 30 minutes',
    resetPasswordAction: 'Reset your password',
  },

  // Dashboard
  dashboard: {
    welcomeBack: 'Welcome back',
    accessTools: 'Access all your AI-powered tools in one place',
    yourProfile: 'Your Profile',
    email: 'Email',
    role: 'Role',
    department: 'Department',
    employeeId: 'Employee ID',
    aiFeatures: 'AI Features & Tools',
    requires: 'Requires',

    // Feature titles
    magvisionTitle: 'MagVisionIQ Dashboard',
    magvisionDesc: 'Store analytics, sales, inventory & operations',
    insightsTitle: 'Emarat Insights',
    insightsDesc: 'AI-powered conversational analytics',
    helpdeskTitle: 'Employee Helpdesk',
    helpdeskDesc: 'AI assistant for HR queries & support',
    attendanceTitle: 'Time & Attendance',
    attendanceDesc: 'Facial recognition check-in/out system',
    reconciliationTitle: 'Document Reconciliation',
    reconciliationDesc: 'AI-powered invoice processing',
    hiringTitle: 'AI-Powered Hiring',
    hiringDesc: 'Intelligent recruitment pipeline',
    vendorsTitle: 'Vendor Onboarding',
    vendorsDesc: 'Document AI for vendor management',
    forecastingTitle: 'Demand Forecasting',
    forecastingDesc: 'Predictive analytics for planning',
    complianceTitle: 'Safety & Compliance',
    complianceDesc: 'Computer vision for security monitoring',
  },

  // Navigation
  nav: {
    dashboard: 'Dashboard',
    insights: 'Emarat Insights',
    magvision: 'MagVisionIQ',
    helpdesk: 'Employee Helpdesk',
    attendance: 'Time & Attendance',
    hiring: 'AI-Powered Hiring',
    reconciliation: 'Document Reconciliation',
    vendors: 'Vendor Onboarding',
    forecasting: 'Demand Forecasting',
    compliance: 'Safety & Compliance',

    // Navigation Groups
    main: 'Main',
    operations: 'Operations',
    hr: 'Human Resources',
    finance: 'Finance & Procurement',
    safety: 'Safety & Security',

    // MagVision Sub-features
    askMagVision: 'Ask MagVisionIQ',
    footfall: 'Footfall & Heat Maps',
    sales: 'Sales & Revenue',
    inventory: 'Inventory',
    queue: 'Queue Monitoring',
    staff: 'Staff & Scheduling',
    security: 'Security & Compliance',
    reports: 'Reports',
  },

  // MagVision
  magvision: {
    title: 'MagVisionIQ Dashboard',
    subtitle: 'AI-powered retail operations intelligence',

    // Ask MagVision
    askTitle: 'Ask MagVisionIQ',
    askSubtitle: 'AI insights',
    newChat: 'New Chat',
    chatPlaceholder: 'Ask anything about your store data...',
    suggestedQuestions: 'Suggested Questions',
    thinking: 'Thinking...',

    // Footfall Tracking
    footfallTitle: 'Footfall Tracking & Heat Maps',
    footfallSubtitle: 'Real-time customer movement and zone analytics',
    totalVisitors: 'Total Visitors',
    currentVisitors: 'Current Visitors',
    liveCount: 'Live count',
    peakHour: 'Peak Hour',
    avgDwellTime: 'Avg Dwell Time',
    perVisitor: 'Per visitor',
    storeHeatMap: 'Store Heat Map',
    low: 'Low',
    high: 'High',
    zoneRankings: 'Zone Rankings',
    visits: 'visits',
    hot: 'Hot',
    warm: 'Warm',
    cool: 'Cool',
    hourlyTraffic: 'Hourly Traffic Pattern',
    today: 'Today',
    days7: '7 Days',
    days30: '30 Days',

    // Zones
    entrance: 'Entrance',
    fuelPumps: 'Fuel Pumps',
    storeArea: 'Store Area',
    checkout: 'Checkout',
    atmArea: 'ATM Area',
    restrooms: 'Restrooms',

    // Coming Soon
    comingSoon: 'Coming Soon',
    underDevelopment: 'This feature is under development',
  },

  // User Roles
  roles: {
    storeManager: 'Store Manager',
    hrManager: 'HR Manager',
    fuelAttendant: 'Fuel Station Attendant',
    financeManager: 'Finance Manager',
    retailEmployee: 'Retail Store Employee',
    procurement: 'Procurement Specialist',
  },

  // Departments
  departments: {
    retailOps: 'Retail Operations',
    humanResources: 'Human Resources',
    operations: 'Operations',
    finance: 'Finance',
    retail: 'Retail',
    procurement: 'Procurement',
  },

  // Time
  time: {
    am: 'AM',
    pm: 'PM',
    at: 'at',
    ago: 'ago',
    now: 'Now',
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    minutes: 'minutes',
    hours: 'hours',
    days: 'days',
  },

  // Errors
  errors: {
    general: 'Something went wrong',
    network: 'Network error. Please check your connection.',
    unauthorized: 'You are not authorized to access this resource',
    notFound: 'Resource not found',
    validation: 'Please check your input',
  },
};

export type TranslationKeys = typeof en;
