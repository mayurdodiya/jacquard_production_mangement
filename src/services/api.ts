
// API service layer for backend communication
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001/api' 
  : '/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth APIs
  async login(email: string, password: string, role: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Company APIs
  async getCompanies() {
    return this.request('/companies');
  }

  async createCompany(company: any) {
    return this.request('/companies', {
      method: 'POST',
      body: JSON.stringify(company),
    });
  }

  async updateCompany(id: string, company: any) {
    return this.request(`/companies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(company),
    });
  }

  async deleteCompany(id: string) {
    return this.request(`/companies/${id}`, { method: 'DELETE' });
  }

  // Employee APIs
  async getEmployees() {
    return this.request('/employees');
  }

  async createEmployee(employee: any) {
    return this.request('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  }

  async updateEmployee(id: string, employee: any) {
    return this.request(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    });
  }

  async deleteEmployee(id: string) {
    return this.request(`/employees/${id}`, { method: 'DELETE' });
  }

  // Purchase Order APIs
  async getPurchaseOrders() {
    return this.request('/purchase-orders');
  }

  async createPurchaseOrder(order: any) {
    return this.request('/purchase-orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updatePurchaseOrder(id: string, order: any) {
    return this.request(`/purchase-orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(order),
    });
  }

  async deletePurchaseOrder(id: string) {
    return this.request(`/purchase-orders/${id}`, { method: 'DELETE' });
  }

  // Stock APIs
  async getStock() {
    return this.request('/stock');
  }

  async updateStock(id: string, stock: any) {
    return this.request(`/stock/${id}`, {
      method: 'PUT',
      body: JSON.stringify(stock),
    });
  }

  // Customer APIs
  async getCustomers() {
    return this.request('/customers');
  }

  async createCustomer(customer: any) {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  }

  async updateCustomer(id: string, customer: any) {
    return this.request(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    });
  }

  async deleteCustomer(id: string) {
    return this.request(`/customers/${id}`, { method: 'DELETE' });
  }

  // Machine APIs
  async getMachines() {
    return this.request('/machines');
  }

  async createMachine(machine: any) {
    return this.request('/machines', {
      method: 'POST',
      body: JSON.stringify(machine),
    });
  }

  async updateMachine(id: string, machine: any) {
    return this.request(`/machines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(machine),
    });
  }

  async deleteMachine(id: string) {
    return this.request(`/machines/${id}`, { method: 'DELETE' });
  }

  // Programme APIs
  async getProgrammes() {
    return this.request('/programmes');
  }

  async createProgramme(programme: any) {
    return this.request('/programmes', {
      method: 'POST',
      body: JSON.stringify(programme),
    });
  }

  async updateProgramme(id: string, programme: any) {
    return this.request(`/programmes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programme),
    });
  }

  async deleteProgramme(id: string) {
    return this.request(`/programmes/${id}`, { method: 'DELETE' });
  }

  // Production APIs
  async getProduction() {
    return this.request('/production');
  }

  async createProduction(production: any) {
    return this.request('/production', {
      method: 'POST',
      body: JSON.stringify(production),
    });
  }

  // Attendance APIs
  async getAttendance() {
    return this.request('/attendance');
  }

  async punchIn(employeeId: string) {
    return this.request('/attendance/punch-in', {
      method: 'POST',
      body: JSON.stringify({ employeeId }),
    });
  }

  async punchOut(employeeId: string) {
    return this.request('/attendance/punch-out', {
      method: 'POST',
      body: JSON.stringify({ employeeId }),
    });
  }

  // Activity History APIs
  async getActivityHistory() {
    return this.request('/activity-history');
  }
}

export const apiService = new ApiService();
