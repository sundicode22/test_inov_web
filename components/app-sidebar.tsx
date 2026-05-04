"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageCircle,
  Calendar,
  FileText,
  User,
  Settings,
  HelpCircle,
  Search,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      title: "Conversations",
      url: "/dashboard/conversations",
      icon: <MessageCircle className="size-4" />,
      badge: "12",
    },
    {
      title: "Calendrier",
      url: "/dashboard/calendrier",
      icon: <Calendar className="size-4" />,
    },
    {
      title: "Documents",
      url: "/dashboard/documents",
      icon: <FileText className="size-4" />,
    },
  ],
  navSecondary: [
    {
      title: "Mon profil",
      url: "/dashboard/profil",
      icon: <User className="size-4" />,
    },
    {
      title: "Paramètres",
      url: "/dashboard/parametres",
      icon: <Settings className="size-4" />,
    },
    {
      title: "Aide & support",
      url: "/dashboard/aide",
      icon: <HelpCircle className="size-4" />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5 hover:bg-transparent active:bg-transparent"
            >
              <a href="/dashboard" className="flex items-center gap-3">
                <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 shadow-lg">
                  <Search className="size-6 text-white" strokeWidth={2.5} />
                  <div className="absolute bottom-2 right-2 size-2 rounded-[1px] bg-cyan-400" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-lg font-semibold text-black tracking-tight">
                    Inov
                  </span>
                  <span className="text-[10px]  text-gray-400 uppercase tracking-[0.2em]">
                    AI Assistant
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
