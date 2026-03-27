import { SidebarProvider } from "@/components/ui/sidebar";
import AdminNavbar from "../_components/AdminNavbar";
import AdminSidebar from "../_components/Sidebar";

function AdminDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider >
            <AdminSidebar />
            <main className="w-full">
                <AdminNavbar />
                <div className="p-5">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}

export default AdminDashboardLayout;