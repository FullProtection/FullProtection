export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  role?: 'admin' | 'user';
  avatarUrl?: string;
}

export type ScreenView = 'login' | 'pm-spec' | 'app-preview' | 'hosting-guide';

export type GlassBackgroundTheme = 'aurora' | 'emerald' | 'midnight' | 'sunset';

export interface LoginFormValues {
  email: string;
  password: string;
  confirmPassword?: string;
  rememberMe: boolean;
}

export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  date: string;
  account?: string;
}

export interface CategoryBudget {
  category: string;
  allocated: number;
  spent: number;
  color: string;
  iconName: string;
}

export interface MVPFeature {
  id: number;
  title: string;
  badge: string;
  objective: string;
  userStory: string;
  acceptanceCriteria: string[];
  kpi: string;
}

export interface UserFlowStep {
  step: string;
  title: string;
  description: string;
  screen: string;
  actions: string[];
}

export interface TechStackItem {
  category: string;
  technology: string;
  role: string;
  rationale: string;
  freeTierStatus: string;
}
