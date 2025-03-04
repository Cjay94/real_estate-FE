"use client";

import Navbar from '@/components/Navbar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useGetAuthUserQuery } from '@/state/api'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { data: authUser } = useGetAuthUserQuery();
    return (
        <section className="size-full">
            <Navbar />
            <main
                className="size-full flex flex-col"
                style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
            >
                {children}
            </main>
        </section>
    )
}

export default Layout