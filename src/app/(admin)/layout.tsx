"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/app/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import SkipToMain from "@/components/skip-to-main";
import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { ThemeSwitch } from "@/components/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { authService } from "@/lib/api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    // Read cookie client-side to avoid hydration issues
    const [defaultOpen, setDefaultOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated using authService
        const userData = authService.getUser();
        if (!userData || !userData.user || !userData.tokens) {
            // Clear any invalid auth data
            authService.clearUser();
            router.push('/login');
            return;
        }

        setIsLoading(false);

        // Parse cookies to find sidebar state
        const cookies = document.cookie.split(';')
            .map(cookie => cookie.trim().split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Record<string, string>);
        
        setDefaultOpen(cookies['sidebar_state'] !== 'false');
    }, [router]);

    const topNav = [
        {
            title: 'Overview',
            href: 'dashboard/overview',
            isActive: true,
            disabled: false,
        },
        {
            title: 'Customers',
            href: 'dashboard/customers',
            isActive: false,
            disabled: true,
        },
        {
            title: 'Products',
            href: 'dashboard/products',
            isActive: false,
            disabled: true,
        },
        {
            title: 'Settings',
            href: 'dashboard/settings',
            isActive: false,
            disabled: true,
        },
    ]

    // Show loading state or nothing while checking authentication
    if (isLoading) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
    }

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
                {/* ===== Top Heading ===== */}
                <Header>
                    <TopNav links={topNav} />
                    <div className="ml-auto flex items-center space-x-4">
                        <ThemeSwitch />
                        <ProfileDropdown />
                    </div>
                </Header>
                {children}
            </div>
        </SidebarProvider>
    );
}