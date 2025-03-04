"use client";

import Sidebar from '@/components/AppSidebar';
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authUser) {
            const userRole = authUser.userRole?.toLowerCase();
            if (
                (userRole === "tenant" && pathname.startsWith("/managers"))
                ||
                (userRole === "manager" && pathname.startsWith("/tenants"))
            ) {
                router.push(
                    userRole === "tenant"
                        ? "/tenants/favorites"
                        : "/managers/properties",
                    { scroll: false }
                );
            } else {
                setIsLoading(false);
            }
        }

    }, [authUser, router, pathname]);
    if (authLoading || isLoading) return <>Loading...</>;
    if (!authUser?.userRole) return null;

    return (
        <SidebarProvider>
            <section className="min-h-screen w-full bg-primary-100">
                <Navbar />
                <div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>
                    <main className="flex">
                        <Sidebar userType={authUser.userRole.toLowerCase()} />
                        <div className="flex-grow transition-all duration-300">
                            {children}
                        </div>
                    </main>
                </div>
            </section>
        </SidebarProvider>
    )
}

export default DashboardLayout