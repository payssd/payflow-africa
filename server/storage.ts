import { 
  type Company, type InsertCompany,
  type UserProfile, type InsertUserProfile,
  type Invitation, type InsertInvitation,
  type Employee, type InsertEmployee,
  type Department, type InsertDepartment,
  type PayrollRun, type InsertPayrollRun,
  type Payslip, type InsertPayslip
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createCompany(company: InsertCompany): Promise<Company>;
  getCompany(id: string): Promise<Company | undefined>;
  
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  getUserProfilesByCompany(companyId: string): Promise<UserProfile[]>;
  
  createInvitation(invitation: InsertInvitation): Promise<Invitation>;
  getInvitationByToken(token: string): Promise<Invitation | undefined>;
  getInvitationsByCompany(companyId: string): Promise<Invitation[]>;
  acceptInvitation(token: string): Promise<Invitation | undefined>;
  
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  getEmployee(id: string): Promise<Employee | undefined>;
  getEmployeesByCompany(companyId: string): Promise<Employee[]>;
  updateEmployee(id: string, data: Partial<InsertEmployee>): Promise<Employee | undefined>;
  deleteEmployee(id: string): Promise<boolean>;
  
  createDepartment(department: InsertDepartment): Promise<Department>;
  getDepartment(id: string): Promise<Department | undefined>;
  getDepartmentsByCompany(companyId: string): Promise<Department[]>;
  updateDepartment(id: string, data: Partial<InsertDepartment>): Promise<Department | undefined>;
  deleteDepartment(id: string): Promise<boolean>;
  
  createPayrollRun(payrollRun: InsertPayrollRun): Promise<PayrollRun>;
  getPayrollRun(id: string): Promise<PayrollRun | undefined>;
  getPayrollRunsByCompany(companyId: string): Promise<PayrollRun[]>;
  updatePayrollRun(id: string, data: Partial<InsertPayrollRun>): Promise<PayrollRun | undefined>;
  
  createPayslip(payslip: InsertPayslip): Promise<Payslip>;
  getPayslipsByPayrollRun(payrollRunId: string): Promise<Payslip[]>;
  getPayslipsByEmployee(employeeId: string): Promise<Payslip[]>;
}

export class MemStorage implements IStorage {
  private companies: Map<string, Company> = new Map();
  private userProfiles: Map<string, UserProfile> = new Map();
  private invitations: Map<string, Invitation> = new Map();
  private employees: Map<string, Employee> = new Map();
  private departments: Map<string, Department> = new Map();
  private payrollRuns: Map<string, PayrollRun> = new Map();
  private payslips: Map<string, Payslip> = new Map();

  async createCompany(data: InsertCompany): Promise<Company> {
    const id = randomUUID();
    const company: Company = { id, name: data.name, createdAt: new Date() };
    this.companies.set(id, company);
    return company;
  }

  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async createUserProfile(data: InsertUserProfile): Promise<UserProfile> {
    const profile: UserProfile = {
      id: data.id,
      companyId: data.companyId ?? null,
      role: data.role,
      firstName: data.firstName ?? null,
      lastName: data.lastName ?? null,
      createdAt: new Date(),
    };
    this.userProfiles.set(data.id, profile);
    return profile;
  }

  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    return this.userProfiles.get(userId);
  }

  async getUserProfilesByCompany(companyId: string): Promise<UserProfile[]> {
    return Array.from(this.userProfiles.values()).filter(p => p.companyId === companyId);
  }

  async createInvitation(data: InsertInvitation): Promise<Invitation> {
    const id = randomUUID();
    const invitation: Invitation = {
      id,
      companyId: data.companyId ?? null,
      email: data.email,
      role: data.role,
      token: data.token,
      expiresAt: data.expiresAt,
      acceptedAt: null,
      createdAt: new Date(),
    };
    this.invitations.set(id, invitation);
    return invitation;
  }

  async getInvitationByToken(token: string): Promise<Invitation | undefined> {
    return Array.from(this.invitations.values()).find(i => i.token === token);
  }

  async getInvitationsByCompany(companyId: string): Promise<Invitation[]> {
    return Array.from(this.invitations.values()).filter(i => i.companyId === companyId);
  }

  async acceptInvitation(token: string): Promise<Invitation | undefined> {
    const invitation = await this.getInvitationByToken(token);
    if (invitation) {
      invitation.acceptedAt = new Date();
      this.invitations.set(invitation.id, invitation);
    }
    return invitation;
  }

  async createEmployee(data: InsertEmployee): Promise<Employee> {
    const id = randomUUID();
    const employee: Employee = {
      id,
      userId: data.userId ?? null,
      companyId: data.companyId ?? null,
      name: data.name,
      email: data.email ?? null,
      department: data.department ?? null,
      position: data.position ?? null,
      baseSalary: data.baseSalary ?? "0",
      allowances: data.allowances ?? {},
      deductions: data.deductions ?? {},
      taxRate: data.taxRate ?? "0",
      status: data.status ?? "active",
      createdAt: new Date(),
    };
    this.employees.set(id, employee);
    return employee;
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async getEmployeesByCompany(companyId: string): Promise<Employee[]> {
    return Array.from(this.employees.values()).filter(e => e.companyId === companyId);
  }

  async updateEmployee(id: string, data: Partial<InsertEmployee>): Promise<Employee | undefined> {
    const employee = this.employees.get(id);
    if (employee) {
      const updated = { ...employee, ...data };
      this.employees.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteEmployee(id: string): Promise<boolean> {
    return this.employees.delete(id);
  }

  async createDepartment(data: InsertDepartment): Promise<Department> {
    const id = randomUUID();
    const department: Department = {
      id,
      companyId: data.companyId ?? null,
      name: data.name,
      headName: data.headName ?? null,
      budget: data.budget ?? null,
      createdAt: new Date(),
    };
    this.departments.set(id, department);
    return department;
  }

  async getDepartment(id: string): Promise<Department | undefined> {
    return this.departments.get(id);
  }

  async getDepartmentsByCompany(companyId: string): Promise<Department[]> {
    return Array.from(this.departments.values()).filter(d => d.companyId === companyId);
  }

  async updateDepartment(id: string, data: Partial<InsertDepartment>): Promise<Department | undefined> {
    const department = this.departments.get(id);
    if (department) {
      const updated = { ...department, ...data };
      this.departments.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteDepartment(id: string): Promise<boolean> {
    return this.departments.delete(id);
  }

  async createPayrollRun(data: InsertPayrollRun): Promise<PayrollRun> {
    const id = randomUUID();
    const payrollRun: PayrollRun = {
      id,
      companyId: data.companyId ?? null,
      period: data.period,
      totalEmployees: data.totalEmployees ?? null,
      totalGross: data.totalGross ?? null,
      totalTax: data.totalTax ?? null,
      totalDeductions: data.totalDeductions ?? null,
      totalNet: data.totalNet ?? null,
      status: data.status ?? "pending",
      createdAt: new Date(),
    };
    this.payrollRuns.set(id, payrollRun);
    return payrollRun;
  }

  async getPayrollRun(id: string): Promise<PayrollRun | undefined> {
    return this.payrollRuns.get(id);
  }

  async getPayrollRunsByCompany(companyId: string): Promise<PayrollRun[]> {
    return Array.from(this.payrollRuns.values()).filter(p => p.companyId === companyId);
  }

  async updatePayrollRun(id: string, data: Partial<InsertPayrollRun>): Promise<PayrollRun | undefined> {
    const payrollRun = this.payrollRuns.get(id);
    if (payrollRun) {
      const updated = { ...payrollRun, ...data };
      this.payrollRuns.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async createPayslip(data: InsertPayslip): Promise<Payslip> {
    const id = randomUUID();
    const payslip: Payslip = {
      id,
      payrollRunId: data.payrollRunId ?? null,
      employeeId: data.employeeId ?? null,
      baseSalary: data.baseSalary ?? null,
      allowances: data.allowances ?? null,
      deductions: data.deductions ?? null,
      taxAmount: data.taxAmount ?? null,
      netSalary: data.netSalary ?? null,
      pdfUrl: data.pdfUrl ?? null,
      createdAt: new Date(),
    };
    this.payslips.set(id, payslip);
    return payslip;
  }

  async getPayslipsByPayrollRun(payrollRunId: string): Promise<Payslip[]> {
    return Array.from(this.payslips.values()).filter(p => p.payrollRunId === payrollRunId);
  }

  async getPayslipsByEmployee(employeeId: string): Promise<Payslip[]> {
    return Array.from(this.payslips.values()).filter(p => p.employeeId === employeeId);
  }
}

export const storage = new MemStorage();
