/**
 * English Translations
 */

export const en = {
  // Common
  common: {
    welcome: 'Welcome',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    viewAll: 'View All',
    showMore: 'Show More',
    showLess: 'Show Less',
  },

  // Navigation
  nav: {
    home: 'Home',
    apps: 'Apps',
    tasks: 'Tasks',
    governance: 'Governance',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
  },

  // Jarvis (AI Assistant)
  jarvis: {
    greeting: {
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
    },
    placeholder: 'Ask Jarvis anything...',
    thinking: 'Jarvis is thinking...',
    error: 'Sorry, I encountered an error.',
  },

  // Priority Alerts
  alerts: {
    title: 'Priority Alerts',
    viewAll: 'View All Alerts',
    markAsRead: 'Mark as Read',
    noAlerts: 'No alerts at this time',
  },

  // Quick Actions
  quickActions: {
    title: 'Quick Actions',
    rfpReview: 'RFP Review',
    newTask: 'New Task',
    viewReports: 'View Reports',
    scheduleDemo: 'Schedule Demo',
  },

  // RFP Module
  rfp: {
    title: 'RFP Evaluation',
    evaluate: 'Evaluate RFP',
    upload: 'Upload RFP',
    analyzing: 'Analyzing RFP...',
    summary: 'Summary',
    recommendations: 'Recommendations',
    riskAssessment: 'Risk Assessment',
    complianceCheck: 'Compliance Check',
  },

  // Tasks
  tasks: {
    title: 'My Tasks',
    new: 'New Task',
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    overdue: 'Overdue',
    dueToday: 'Due Today',
    noDueDate: 'No Due Date',
  },

  // Governance
  governance: {
    title: 'Governance Dashboard',
    compliance: 'Compliance',
    policies: 'Policies',
    audits: 'Audits',
    reports: 'Reports',
  },

  // Settings
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    language: 'Language',
    notifications: 'Notifications',
    privacy: 'Privacy',
    account: 'Account',
    theme: {
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
  },

  // Auth
  auth: {
    login: 'Login',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
  },

  // Error Messages
  errors: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    notFound: 'Page not found.',
    unauthorized: 'You are not authorized to view this page.',
    validation: 'Please check your input and try again.',
  },

  // Time
  time: {
    justNow: 'Just now',
    minutesAgo: '{{count}} minutes ago',
    hoursAgo: '{{count}} hours ago',
    daysAgo: '{{count}} days ago',
    weeksAgo: '{{count}} weeks ago',
  },
} as const;

export type TranslationKeys = typeof en;
