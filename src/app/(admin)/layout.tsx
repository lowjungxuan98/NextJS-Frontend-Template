"use client"

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/app/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import SkipToMain from "@/components/skip-to-main";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // Read cookie client-side to avoid hydration issues
    const [defaultOpen, setDefaultOpen] = useState(true);

    useEffect(() => {
        // Parse cookies to find sidebar state
        const cookies = document.cookie.split(';')
            .map(cookie => cookie.trim().split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Record<string, string>);
        
        setDefaultOpen(cookies['sidebar_state'] !== 'false');
    }, []);
    
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <SkipToMain />
            <AppSidebar />
            <div
                id="content"
                className={cn(
                    'ml-auto w-full max-w-full',
                    'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
                    'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                    'sm:transition-[width] sm:duration-200 sm:ease-linear',
                    'flex h-svh flex-col',
                    'group-data-[scroll-locked=1]/body:h-full',
                    'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
                )}
            >
                {children}
            </div>
        </SidebarProvider>
    );
}