import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal, jsonb, integer, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  role: text("role").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  email: text("email").notNull(),
  role: text("role").notNull(),
  token: text("token").unique().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  acceptedAt: timestamp("accepted_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const employees = pgTable("employees", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id"),
  companyId: uuid("company_id").references(() => companies.id),
  name: text("name").notNull(),
  email: text("email"),
  department: text("department"),
  position: text("position"),
  baseSalary: decimal("base_salary", { precision: 12, scale: 2 }).default("0"),
  allowances: jsonb("allowances").default({}),
  deductions: jsonb("deductions").default({}),
  taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).default("0"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const departments = pgTable("departments", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  name: text("name").notNull(),
  headName: text("head_name"),
  budget: decimal("budget", { precision: 12, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payrollRuns = pgTable("payroll_runs", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: uuid("company_id").references(() => companies.id),
  period: text("period").notNull(),
  totalEmployees: integer("total_employees"),
  totalGross: decimal("total_gross", { precision: 12, scale: 2 }),
  totalTax: decimal("total_tax", { precision: 12, scale: 2 }),
  totalDeductions: decimal("total_deductions", { precision: 12, scale: 2 }),
  totalNet: decimal("total_net", { precision: 12, scale: 2 }),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payslips = pgTable("payslips", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  payrollRunId: uuid("payroll_run_id").references(() => payrollRuns.id),
  employeeId: uuid("employee_id").references(() => employees.id),
  baseSalary: decimal("base_salary", { precision: 12, scale: 2 }),
  allowances: decimal("allowances", { precision: 12, scale: 2 }),
  deductions: decimal("deductions", { precision: 12, scale: 2 }),
  taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }),
  netSalary: decimal("net_salary", { precision: 12, scale: 2 }),
  pdfUrl: text("pdf_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCompanySchema = createInsertSchema(companies).pick({
  name: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).pick({
  id: true,
  companyId: true,
  role: true,
  firstName: true,
  lastName: true,
});

export const insertInvitationSchema = createInsertSchema(invitations).pick({
  companyId: true,
  email: true,
  role: true,
  token: true,
  expiresAt: true,
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
});

export const insertDepartmentSchema = createInsertSchema(departments).omit({
  id: true,
  createdAt: true,
});

export const insertPayrollRunSchema = createInsertSchema(payrollRuns).omit({
  id: true,
  createdAt: true,
});

export const insertPayslipSchema = createInsertSchema(payslips).omit({
  id: true,
  createdAt: true,
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;

export type Invitation = typeof invitations.$inferSelect;
export type InsertInvitation = z.infer<typeof insertInvitationSchema>;

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;

export type Department = typeof departments.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;

export type PayrollRun = typeof payrollRuns.$inferSelect;
export type InsertPayrollRun = z.infer<typeof insertPayrollRunSchema>;

export type Payslip = typeof payslips.$inferSelect;
export type InsertPayslip = z.infer<typeof insertPayslipSchema>;

export type UserRole = 'company_admin' | 'hr' | 'employee';
