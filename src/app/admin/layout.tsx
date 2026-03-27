import { SidebarProvider } from "@/components/ui/sidebar";

function AdminDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider >
            {children}
        </SidebarProvider>
    )
}

export default AdminDashboardLayout;