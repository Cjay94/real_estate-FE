import { usePathname } from 'next/navigation'
import React from 'react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar';
import { AlignJustify, BookHeartIcon, Building2, FileText, Home, Settings2, SquareX } from 'lucide-react';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const AppSidebar = ({ userType }: AppSidebarProps) => {
    const pathname = usePathname();
    const { toggleSidebar, open } = useSidebar();

    const navLinks =
        userType === "tenant"
            ? [
                { icon: BookHeartIcon, label: "Favorites", href: "/tenants/favorites" },
                { icon: FileText, label: "Applications", href: "/tenants/applications", },
                { icon: Home, label: "Residences", href: "/tenants/residences" },
                { icon: Settings2, label: "Settings", href: "/tenants/settings" },
            ] : [
                { icon: Building2, label: "Properties", href: "/manager/properties" },
                { icon: FileText, label: "Applications", href: "/manager/applications" },
                { icon: Settings2, label: "Settings", href: "/managers/settings" },
            ];

    return (
        <Sidebar
            collapsible="icon"
            className="fixed left-0 bg-white shadow-lg"
            style={{
                top: `${NAVBAR_HEIGHT}px`,
                height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            }}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className={cn(
                            "flex min-h-14 w-full items-center pt-3 mb-3",
                            open ? "justify-between px-6" : "justify-center"
                        )}
                        >
                            {open ? (
                                <>
                                    <h1 className="text-xl font-bold text-gray-800">
                                        {userType === "tenant" ? "Tenant View" : "Manager View"}
                                    </h1>
                                    <button
                                        className="hover:bg-gray-100 p-2 rounded-md"
                                        onClick={toggleSidebar}
                                    >
                                        <SquareX className="size-6 text-gray-600" />
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="hover:bg-gray-100 p-2 rounded-md"
                                    onClick={toggleSidebar}
                                >
                                    <AlignJustify className="size-6 text-gray-600" />
                                </button>
                            )}
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {navLinks.map((link, idx) => {
                        const isActive = pathname === link.href;
                        return (
                            <SidebarMenuItem key={idx}>
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        "flex items-center p-7",
                                        isActive
                                            ? "bg-gray-100"
                                            : "text-gray-600 hover:bg-gray-100",
                                        open ? "text-blue-600" : "ml-[5px]"
                                    )}
                                >
                                    <Link href={link.href} className="w-full" scroll={false}>
                                        <div className="flex items-center gap-3">
                                            <link.icon
                                                className={`size-6 ${isActive ? "text-blue-600" : "text-gray-600"}`}
                                            />
                                            <span className={`font-medium ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                                                {link.label}
                                            </span>
                                        </div>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar