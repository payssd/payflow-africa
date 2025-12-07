import { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Check, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Employee {
  id: string;
  name: string;
  email: string | null;
  department: string | null;
  position: string | null;
  baseSalary: string;
  allowances: Record<string, number>;
  deductions: Record<string, number>;
  taxRate: string;
  status: string | null;
}

interface PayrollTableProps {
  employees: Employee[];
  onUpdateEmployee: (id: string, data: Partial<Employee>) => void;
}

export default function PayrollTable({ employees, onUpdateEmployee }: PayrollTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Employee>>({});

  const calculateNet = (emp: Employee) => {
    const base = parseFloat(emp.baseSalary || "0");
    const allowancesTotal = Object.values(emp.allowances || {}).reduce((sum, val) => sum + (val || 0), 0);
    const deductionsTotal = Object.values(emp.deductions || {}).reduce((sum, val) => sum + (val || 0), 0);
    const taxRate = parseFloat(emp.taxRate || "0") / 100;
    const gross = base + allowancesTotal;
    const tax = gross * taxRate;
    return gross - tax - deductionsTotal;
  };

  const startEdit = (emp: Employee) => {
    setEditingId(emp.id);
    setEditData({
      baseSalary: emp.baseSalary,
      taxRate: emp.taxRate,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = (id: string) => {
    onUpdateEmployee(id, editData);
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/50">
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Employee</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Department</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Base Salary</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Allowances</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Deductions</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Tax Rate</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Net Salary</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((emp, index) => {
              const isEditing = editingId === emp.id;
              const allowancesTotal = Object.values(emp.allowances || {}).reduce((sum, val) => sum + (val || 0), 0);
              const deductionsTotal = Object.values(emp.deductions || {}).reduce((sum, val) => sum + (val || 0), 0);
              const netSalary = calculateNet(emp);

              return (
                <motion.tr
                  key={emp.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">{emp.email || "-"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">{emp.department || "-"}</td>
                  <td className="px-4 py-3 text-right">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editData.baseSalary || ""}
                        onChange={(e) => setEditData({ ...editData, baseSalary: e.target.value })}
                        className="w-28 text-right"
                      />
                    ) : (
                      <span className="text-foreground">${parseFloat(emp.baseSalary || "0").toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-green-500">
                    +${allowancesTotal.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-red-500">
                    -${deductionsTotal.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editData.taxRate || ""}
                        onChange={(e) => setEditData({ ...editData, taxRate: e.target.value })}
                        className="w-20 text-right"
                      />
                    ) : (
                      <span className="text-foreground">{emp.taxRate || "0"}%</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-semibold text-foreground">${netSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {isEditing ? (
                        <>
                          <Button size="icon" variant="ghost" onClick={() => saveEdit(emp.id)} className="h-8 w-8 text-green-500 hover:text-green-600">
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={cancelEdit} className="h-8 w-8 text-red-500 hover:text-red-600">
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <Button size="icon" variant="ghost" onClick={() => startEdit(emp)} className="h-8 w-8">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
