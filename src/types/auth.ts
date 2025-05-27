
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'company' | 'employee';
  companyId?: string;
  employeeId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
