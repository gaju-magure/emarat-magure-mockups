// Navigation configuration for the B2E platform
import type { NavigationItem, NavigationGroup } from '../types/navigation';

// Main navigation items based on the 8 AI features
export const mainNavigation: NavigationGroup[] = [
  {
    id: 'main',
    label: 'Main',
    labelAr: 'الرئيسية',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        labelAr: 'لوحة المعلومات',
        icon: 'HomeIcon',
        path: '/dashboard',
      },
      {
        id: 'insights',
        label: 'Emarat Insights',
        labelAr: 'رؤى إمارات',
        icon: 'SparklesIcon',
        path: '/insights',
      },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    labelAr: 'العمليات',
    items: [
      {
        id: 'magvision',
        label: 'MagVisionIQ',
        labelAr: 'ماج فيجن IQ',
        icon: 'ChartBarIcon',
        path: '/magvision',
        roles: ['Store Manager', 'Operations'],
        children: [
          { id: 'ask', label: 'Ask MagVisionIQ', labelAr: 'اسأل ماج فيجن IQ', icon: 'SparklesIcon', path: '/magvision/ask' },
          { id: 'footfall', label: 'Footfall & Heat Maps', labelAr: 'حركة الزوار والخرائط الحرارية', icon: 'MapIcon', path: '/magvision/footfall' },
          { id: 'sales', label: 'Sales & Revenue', labelAr: 'المبيعات والإيرادات', icon: 'CurrencyDollarIcon', path: '/magvision/sales' },
          { id: 'inventory', label: 'Inventory', labelAr: 'المخزون', icon: 'CubeIcon', path: '/magvision/inventory' },
          { id: 'queue', label: 'Queue Monitoring', labelAr: 'مراقبة الطوابير', icon: 'UsersIcon', path: '/magvision/queue' },
          { id: 'staff', label: 'Staff & Scheduling', labelAr: 'الموظفون والجدولة', icon: 'CalendarIcon', path: '/magvision/staff' },
          { id: 'security', label: 'Security & Compliance', labelAr: 'الأمن والامتثال', icon: 'ShieldCheckIcon', path: '/magvision/security' },
          { id: 'reports', label: 'Reports', labelAr: 'التقارير', icon: 'DocumentTextIcon', path: '/magvision/reports' },
        ],
      },
      {
        id: 'forecasting',
        label: 'Demand Forecasting',
        labelAr: 'التنبؤ بالطلب',
        icon: 'ArrowTrendingUpIcon',
        path: '/forecasting',
        roles: ['Store Manager', 'Operations', 'Finance Manager'],
      },
    ],
  },
  {
    id: 'hr',
    label: 'Human Resources',
    labelAr: 'الموارد البشرية',
    items: [
      {
        id: 'helpdesk',
        label: 'Employee Helpdesk',
        labelAr: 'مكتب مساعدة الموظفين',
        icon: 'ChatBubbleLeftRightIcon',
        path: '/helpdesk',
        badge: 3,
      },
      {
        id: 'attendance',
        label: 'Time & Attendance',
        labelAr: 'الوقت والحضور',
        icon: 'ClockIcon',
        path: '/attendance',
      },
      {
        id: 'hiring',
        label: 'AI-Powered Hiring',
        labelAr: 'التوظيف بالذكاء الاصطناعي',
        icon: 'UserPlusIcon',
        path: '/hiring',
        roles: ['HR Manager', 'Admin'],
      },
    ],
  },
  {
    id: 'finance',
    label: 'Finance & Procurement',
    labelAr: 'المالية والمشتريات',
    items: [
      {
        id: 'reconciliation',
        label: 'Document Reconciliation',
        labelAr: 'تسوية المستندات',
        icon: 'DocumentCheckIcon',
        path: '/reconciliation',
        roles: ['Finance Manager', 'Admin'],
      },
      {
        id: 'vendors',
        label: 'Vendor Onboarding',
        labelAr: 'تأهيل الموردين',
        icon: 'BuildingOfficeIcon',
        path: '/vendors',
        roles: ['Procurement Specialist', 'Finance Manager', 'Admin'],
      },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Security',
    labelAr: 'السلامة والأمن',
    items: [
      {
        id: 'compliance',
        label: 'Safety & Compliance',
        labelAr: 'السلامة والامتثال',
        icon: 'ShieldExclamationIcon',
        path: '/compliance',
        roles: ['Store Manager', 'Safety Officer', 'Admin'],
      },
    ],
  },
  {
    id: 'tools',
    label: 'AI Tools',
    labelAr: 'أدوات الذكاء الاصطناعي',
    items: [
      {
        id: 'chat-with-doc',
        label: 'Chat with Doc',
        labelAr: 'الدردشة مع المستند',
        icon: 'DocumentTextIcon',
        path: '/chat-with-doc',
        // No roles specified - available to all users
      },
    ],
  },
];

// Mobile bottom navigation (most important 5 items)
export const mobileBottomNav: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    labelAr: 'الرئيسية',
    icon: 'HomeIcon',
    path: '/dashboard',
  },
  {
    id: 'insights',
    label: 'Insights',
    labelAr: 'رؤى',
    icon: 'SparklesIcon',
    path: '/insights',
  },
  {
    id: 'helpdesk',
    label: 'Helpdesk',
    labelAr: 'المساعدة',
    icon: 'ChatBubbleLeftRightIcon',
    path: '/helpdesk',
    badge: 3,
  },
  {
    id: 'attendance',
    label: 'Attendance',
    labelAr: 'الحضور',
    icon: 'ClockIcon',
    path: '/attendance',
  },
  {
    id: 'menu',
    label: 'Menu',
    labelAr: 'القائمة',
    icon: 'Bars3Icon',
    path: '/menu',
  },
];

// Quick actions for the quick actions panel
export const quickActions: NavigationItem[] = [
  {
    id: 'check-in',
    label: 'Check In',
    labelAr: 'تسجيل الدخول',
    icon: 'ClockIcon',
    path: '/attendance/check-in',
  },
  {
    id: 'leave-request',
    label: 'Request Leave',
    labelAr: 'طلب إجازة',
    icon: 'CalendarDaysIcon',
    path: '/helpdesk/leave',
  },
  {
    id: 'report-issue',
    label: 'Report Issue',
    labelAr: 'الإبلاغ عن مشكلة',
    icon: 'ExclamationTriangleIcon',
    path: '/helpdesk/report',
  },
  {
    id: 'view-payslip',
    label: 'View Payslip',
    labelAr: 'عرض قسيمة الراتب',
    icon: 'DocumentTextIcon',
    path: '/helpdesk/payslip',
  },
];
