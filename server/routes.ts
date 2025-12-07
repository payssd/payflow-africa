import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { randomBytes } from "crypto";
import PDFDocument from "pdfkit";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/employees", async (req, res) => {
    try {
      const companyId = req.query.companyId as string;
      if (!companyId) {
        return res.status(400).json({ error: "Company ID required" });
      }
      const employees = await storage.getEmployeesByCompany(companyId);
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employees" });
    }
  });

  app.post("/api/employees", async (req, res) => {
    try {
      const employee = await storage.createEmployee(req.body);
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json({ error: "Failed to create employee" });
    }
  });

  app.put("/api/employees/:id", async (req, res) => {
    try {
      const employee = await storage.updateEmployee(req.params.id, req.body);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: "Failed to update employee" });
    }
  });

  app.delete("/api/employees/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteEmployee(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete employee" });
    }
  });

  app.get("/api/departments", async (req, res) => {
    try {
      const companyId = req.query.companyId as string;
      if (!companyId) {
        return res.status(400).json({ error: "Company ID required" });
      }
      const departments = await storage.getDepartmentsByCompany(companyId);
      res.json(departments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  });

  app.post("/api/departments", async (req, res) => {
    try {
      const department = await storage.createDepartment(req.body);
      res.status(201).json(department);
    } catch (error) {
      res.status(500).json({ error: "Failed to create department" });
    }
  });

  app.put("/api/departments/:id", async (req, res) => {
    try {
      const department = await storage.updateDepartment(req.params.id, req.body);
      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }
      res.json(department);
    } catch (error) {
      res.status(500).json({ error: "Failed to update department" });
    }
  });

  app.delete("/api/departments/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteDepartment(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Department not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete department" });
    }
  });

  app.post("/api/invitations", async (req, res) => {
    try {
      const { companyId, email, role } = req.body;
      const token = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      
      const invitation = await storage.createInvitation({
        companyId,
        email,
        role,
        token,
        expiresAt,
      });
      
      res.status(201).json(invitation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create invitation" });
    }
  });

  app.get("/api/invitations", async (req, res) => {
    try {
      const companyId = req.query.companyId as string;
      if (!companyId) {
        return res.status(400).json({ error: "Company ID required" });
      }
      const invitations = await storage.getInvitationsByCompany(companyId);
      res.json(invitations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invitations" });
    }
  });

  app.get("/api/invitations/verify/:token", async (req, res) => {
    try {
      const invitation = await storage.getInvitationByToken(req.params.token);
      if (!invitation) {
        return res.status(404).json({ error: "Invalid invitation" });
      }
      if (invitation.acceptedAt) {
        return res.status(400).json({ error: "Invitation already used" });
      }
      if (new Date() > new Date(invitation.expiresAt)) {
        return res.status(400).json({ error: "Invitation expired" });
      }
      res.json(invitation);
    } catch (error) {
      res.status(500).json({ error: "Failed to verify invitation" });
    }
  });

  app.post("/api/invitations/accept/:token", async (req, res) => {
    try {
      const invitation = await storage.acceptInvitation(req.params.token);
      if (!invitation) {
        return res.status(404).json({ error: "Invalid invitation" });
      }
      res.json(invitation);
    } catch (error) {
      res.status(500).json({ error: "Failed to accept invitation" });
    }
  });

  app.post("/api/payroll/run", async (req, res) => {
    try {
      const { companyId, period } = req.body;
      
      const employees = await storage.getEmployeesByCompany(companyId);
      const activeEmployees = employees.filter(e => e.status === "active");
      
      let totalGross = 0;
      let totalTax = 0;
      let totalDeductions = 0;
      let totalNet = 0;
      
      const payslipPromises = activeEmployees.map(async (emp) => {
        const baseSalary = parseFloat(emp.baseSalary || "0");
        const allowancesObj = emp.allowances as Record<string, number> || {};
        const deductionsObj = emp.deductions as Record<string, number> || {};
        const taxRate = parseFloat(emp.taxRate || "0") / 100;
        
        const allowancesTotal = Object.values(allowancesObj).reduce((sum, val) => sum + (val || 0), 0);
        const deductionsTotal = Object.values(deductionsObj).reduce((sum, val) => sum + (val || 0), 0);
        const gross = baseSalary + allowancesTotal;
        const taxAmount = gross * taxRate;
        const net = gross - taxAmount - deductionsTotal;
        
        totalGross += gross;
        totalTax += taxAmount;
        totalDeductions += deductionsTotal;
        totalNet += net;
        
        return {
          employeeId: emp.id,
          baseSalary: baseSalary.toFixed(2),
          allowances: allowancesTotal.toFixed(2),
          deductions: deductionsTotal.toFixed(2),
          taxAmount: taxAmount.toFixed(2),
          netSalary: net.toFixed(2),
        };
      });
      
      const payslipData = await Promise.all(payslipPromises);
      
      const payrollRun = await storage.createPayrollRun({
        companyId,
        period,
        totalEmployees: activeEmployees.length,
        totalGross: totalGross.toFixed(2),
        totalTax: totalTax.toFixed(2),
        totalDeductions: totalDeductions.toFixed(2),
        totalNet: totalNet.toFixed(2),
        status: "completed",
      });
      
      const payslips = await Promise.all(
        payslipData.map(data => storage.createPayslip({ ...data, payrollRunId: payrollRun.id }))
      );
      
      res.status(201).json({ payrollRun, payslips });
    } catch (error) {
      console.error("Payroll error:", error);
      res.status(500).json({ error: "Failed to run payroll" });
    }
  });

  app.get("/api/payroll", async (req, res) => {
    try {
      const companyId = req.query.companyId as string;
      if (!companyId) {
        return res.status(400).json({ error: "Company ID required" });
      }
      const payrollRuns = await storage.getPayrollRunsByCompany(companyId);
      res.json(payrollRuns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch payroll runs" });
    }
  });

  app.get("/api/payroll/:id/payslips", async (req, res) => {
    try {
      const payslips = await storage.getPayslipsByPayrollRun(req.params.id);
      res.json(payslips);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch payslips" });
    }
  });

  app.get("/api/payroll/export", async (req, res) => {
    try {
      const companyId = req.query.companyId as string;
      if (!companyId) {
        return res.status(400).json({ error: "Company ID required" });
      }
      
      const employees = await storage.getEmployeesByCompany(companyId);
      const activeEmployees = employees.filter(e => e.status === "active");
      
      const csvRows = [
        ["Name", "Email", "Department", "Position", "Base Salary", "Allowances", "Deductions", "Tax Rate", "Net Salary"]
      ];
      
      activeEmployees.forEach(emp => {
        const baseSalary = parseFloat(emp.baseSalary || "0");
        const allowancesObj = emp.allowances as Record<string, number> || {};
        const deductionsObj = emp.deductions as Record<string, number> || {};
        const taxRate = parseFloat(emp.taxRate || "0") / 100;
        
        const allowancesTotal = Object.values(allowancesObj).reduce((sum, val) => sum + (val || 0), 0);
        const deductionsTotal = Object.values(deductionsObj).reduce((sum, val) => sum + (val || 0), 0);
        const gross = baseSalary + allowancesTotal;
        const taxAmount = gross * taxRate;
        const net = gross - taxAmount - deductionsTotal;
        
        csvRows.push([
          emp.name,
          emp.email || "",
          emp.department || "",
          emp.position || "",
          baseSalary.toFixed(2),
          allowancesTotal.toFixed(2),
          deductionsTotal.toFixed(2),
          (taxRate * 100).toFixed(2) + "%",
          net.toFixed(2)
        ]);
      });
      
      const csv = csvRows.map(row => row.join(",")).join("\n");
      
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=payroll-export.csv");
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: "Failed to export payroll" });
    }
  });

  app.get("/api/payslip/:employeeId/pdf", async (req, res) => {
    try {
      const { employeeId } = req.params;
      const { period } = req.query;
      
      const employee = await storage.getEmployee(employeeId);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      
      const baseSalary = parseFloat(employee.baseSalary || "0");
      const allowancesObj = employee.allowances as Record<string, number> || {};
      const deductionsObj = employee.deductions as Record<string, number> || {};
      const taxRate = parseFloat(employee.taxRate || "0") / 100;
      
      const allowancesTotal = Object.values(allowancesObj).reduce((sum, val) => sum + (val || 0), 0);
      const deductionsTotal = Object.values(deductionsObj).reduce((sum, val) => sum + (val || 0), 0);
      const gross = baseSalary + allowancesTotal;
      const taxAmount = gross * taxRate;
      const netSalary = gross - taxAmount - deductionsTotal;
      
      const doc = new PDFDocument({ margin: 50 });
      
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=payslip-${employee.name.replace(/\s+/g, "-")}.pdf`);
      
      doc.pipe(res);
      
      doc.fontSize(24).fillColor("#7c3aed").text("PayFlow Africa", { align: "center" });
      doc.moveDown(0.5);
      doc.fontSize(16).fillColor("#333").text("PAYSLIP", { align: "center" });
      doc.moveDown(0.3);
      doc.fontSize(12).fillColor("#666").text(period as string || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }), { align: "center" });
      
      doc.moveDown(1.5);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke("#e5e7eb");
      doc.moveDown(1);
      
      doc.fontSize(14).fillColor("#333").text("Employee Details", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor("#666");
      doc.text(`Name: ${employee.name}`);
      doc.text(`Email: ${employee.email || "N/A"}`);
      doc.text(`Department: ${employee.department || "N/A"}`);
      doc.text(`Position: ${employee.position || "N/A"}`);
      
      doc.moveDown(1.5);
      doc.fontSize(14).fillColor("#333").text("Earnings", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor("#666");
      doc.text(`Base Salary: $${baseSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      
      if (Object.keys(allowancesObj).length > 0) {
        doc.moveDown(0.3);
        doc.text("Allowances:");
        Object.entries(allowancesObj).forEach(([key, value]) => {
          doc.text(`  - ${key}: $${(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
        });
      }
      doc.text(`Total Allowances: $${allowancesTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      doc.moveDown(0.3);
      doc.fontSize(12).fillColor("#16a34a").text(`Gross Salary: $${gross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      
      doc.moveDown(1.5);
      doc.fontSize(14).fillColor("#333").text("Deductions", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor("#666");
      doc.text(`Tax (${(taxRate * 100).toFixed(2)}%): $${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      
      if (Object.keys(deductionsObj).length > 0) {
        doc.text("Other Deductions:");
        Object.entries(deductionsObj).forEach(([key, value]) => {
          doc.text(`  - ${key}: $${(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
        });
      }
      doc.text(`Total Deductions: $${(taxAmount + deductionsTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      
      doc.moveDown(1.5);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke("#e5e7eb");
      doc.moveDown(1);
      
      doc.fontSize(16).fillColor("#7c3aed").text(`Net Salary: $${netSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, { align: "right" });
      
      doc.moveDown(3);
      doc.fontSize(10).fillColor("#999").text("This is a computer-generated document. No signature required.", { align: "center" });
      doc.text(`Generated on ${new Date().toLocaleString()}`, { align: "center" });
      
      doc.end();
    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).json({ error: "Failed to generate payslip PDF" });
    }
  });

  return httpServer;
}
