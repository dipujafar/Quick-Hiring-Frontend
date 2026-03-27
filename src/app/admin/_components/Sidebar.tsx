"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from "@/assets/images/logo.png"
import Link from "next/link";
import Image from "next/image";
import { Briefcase, FileText } from "lucide-react";
import { usePathname } from "next/navigation";


function AdminSidebar() {

    const routs = [
        {
            id: 1,
            route: "/admin/jobs",
            name: "Jobs",
            icon: <Briefcase className="h-5 w-5" />
        },
        {
            id: 2,
            route: "/admin/applications",
            name: "Applicatons",
            icon: <FileText className="h-5 w-5" />
        },
    ]

    const currentPath = usePathname();

    return (
        <Sidebar className="shadow">
            <SidebarHeader className="py-5 relative bg-white">
                <Link href={"/"}>
                    <Image src={logo} alt='logo' className='h-6 md:h-7 xl:h-9 w-auto object-cover mx-auto' />
                </Link>
            </SidebarHeader>

            <SidebarContent className="bg-white">
                <SidebarGroup className="space-y-3">

                    {
                        routs.map(rout => {
                            return <SidebarMenu key={rout?.id}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip={"item.title"} asChild className={`px-5 py-5 rounded-none  ${currentPath == rout?.route ? "bg-primary-color  text-white hover:bg-primary-color  hover:text-white" : ""}`}>
                                        <Link href={rout?.route} className="font-medium">
                                            {rout?.icon}
                                            <span>{rout?.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        })
                    }

                </SidebarGroup>

            </SidebarContent>

        </Sidebar>
    )
}

export default AdminSidebar