"use client";

import { NAVBAR_HEIGHT } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'aws-amplify/auth';
import { Bell, LayoutDashboard, LogOut, MessageCircle, Plus, Search, Settings } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const Navbar = () => {
    const { data: authUser } = useGetAuthUserQuery();
    const router = useRouter();
    const pathname = usePathname();

    const isDashboardPage = pathname.includes("/managers") || pathname.includes("/tenants");

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/";
    }
    return (
        <section
            className="fixed top-0 left-0 w-full z-50 shadow-xl"
            style={{ height: `${NAVBAR_HEIGHT}px` }}
        >
            <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
                <div className="flex items-center gap-4 md:gap-6">
                    <Link
                        href={"/"}
                        className="cursor-pointer hover:!text-primary-300"
                        scroll={false}
                    >
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo.svg"
                                alt="Homigo Logo"
                                width={24}
                                height={24}
                                className="size-6"
                            />
                            <div className="text-xl font-bold">
                                HOM
                                <span className="text-secondary-500 font-normal hover:!text-primary-300">
                                    IGO
                                </span>
                            </div>
                        </div>
                    </Link>
                    {isDashboardPage && authUser && (
                        <Button
                            variant="secondary"
                            className="md:ml-4 bg-primary-50 text-primary-700 hover:bg-secondary-500 hover:text-primary-50"
                            onClick={() =>
                                router.push(authUser.userRole?.toLowerCase() === "manager"
                                    ? "/managers/newproperty"
                                    : "/search"
                                )}
                        >
                            {authUser.userRole?.toLowerCase() === "manager" ? (
                                <>
                                    <Plus className="size-4" />
                                    <span className="hidden md:block ml-2">Add New Property</span>
                                </>
                            ) : (
                                <>
                                    <Search className="size-4" />
                                    <span className="hidden md:block ml-2">
                                        Search Properties
                                    </span>
                                </>
                            )}
                        </Button>
                    )}
                </div>
                {!isDashboardPage && (
                    <p className="text-primary-200 hidden md:block">
                        Rent easy, live happy.
                    </p>
                )}
                <div className="flex items-center gap-5">
                    {authUser ? (
                        <>
                            <div className="relative hidden md:block">
                                <MessageCircle className="size-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                                <span className="absolute top-0 right-0 size-2 bg-secondary-700 rounded-full" />
                            </div>
                            <div className="relative hidden md:block">
                                <Bell className="size-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                                <span className="absolute top-0 right-0 size-2 bg-secondary-700 rounded-full" />
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                                    <Avatar>
                                        <AvatarImage src={authUser.userInfo?.image} />
                                        <AvatarFallback className="bg-primary-600">
                                            {authUser.userRole?.[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="text-primary-200 hidden md:block">
                                        {authUser.userInfo?.name}
                                    </p>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white text-primary-700">
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100 font-bold"
                                        onClick={() =>
                                            router.push(
                                                authUser.userRole?.toLowerCase() === "manager"
                                                    ? "/managers/properties"
                                                    : "/tenants/favorites",
                                                { scroll: false }
                                            )}
                                    >
                                        <span>
                                            <LayoutDashboard className="size-5" />
                                        </span>
                                        Go to Dashboard
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-primary-200" />
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100 font-bold"
                                        onClick={() => router.push(
                                            `/${authUser.userRole?.toLowerCase()}s/settings`,
                                            { scroll: false }
                                        )}
                                    >
                                        <span>
                                            <Settings className="size-5" />
                                        </span>
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100 font-bold"
                                        onClick={handleSignOut}
                                    >
                                        <span>
                                            <LogOut className="size-5" />
                                        </span>
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/signin">
                                <Button
                                    variant="outline"
                                    className="text-white border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg"
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button
                                    variant="secondary"
                                    className="text-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </section>
    )
}

export default Navbar