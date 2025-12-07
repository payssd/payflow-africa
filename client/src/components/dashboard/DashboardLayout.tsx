import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  role: "company" | "hr" | "employee";
}

export default function DashboardLayout({ children, title, role }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNavbar title={title} role={role} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
