"use client";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "./ui/sidebar";

import {
  ChevronDown,
  HomeIcon,
  LayoutDashboard,
  MessageSquareText,
  MountainSnow,
  Settings,
  User2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import { useState } from "react";
import SidebarTooltip from "./SidebarTooltip";
import { UserProfile } from "@/app/types/types";

type AdminSidebarProps = {
  user: UserProfile | null;
};

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const { state, open, setOpen } = useSidebar();
  const [climbsOpen, setClimbsOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  const handleClimbsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (state === "collapsed" && !climbsOpen) {
      setOpen(true);
      setClimbsOpen(true);
    }
    if (state === "collapsed" && climbsOpen) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    }
  };
  const handleBlogClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (state === "collapsed" && !blogOpen) {
      setOpen(true);
      setBlogOpen(true);
    }
    if (state === "collapsed" && blogOpen) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    }
  };

  return (
    <Sidebar variant="floating" collapsible="icon">

      {/* Header */}
      <SidebarHeader>
        <SidebarTooltip label="Toggle Admin Dashboard" state={state}>
          <SidebarMenuButton asChild onClick={() => setOpen(!open)}>
            <div className="flex items-center gap-2.5">
              <LayoutDashboard size={15} className="text-ember shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="font-mono uppercase tracking-widest text-[9px] text-ember">
                  — Admin
                </span>
                <span className="font-display uppercase font-bold text-[13px] tracking-[0.04em] text-granite-100">
                  Dashboard
                </span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarTooltip>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono uppercase tracking-widest text-[10px] text-slate-400">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>

            {/* Climbs */}
            <Collapsible
              open={climbsOpen}
              onOpenChange={setClimbsOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger>
                  <SidebarTooltip label="Climbs" state={state}>
                    <SidebarMenuButton asChild onClick={handleClimbsClick}>
                      <div className="flex items-center gap-2">
                        <MountainSnow size={15} className="text-slate-500 shrink-0" />
                        <span className="font-display uppercase font-semibold text-[12px] tracking-[0.06em]">
                          Climbs
                        </span>
                        <ChevronDown
                          size={13}
                          className="ml-auto text-slate-400 transition-transform group-data-[state=open]/collapsible:rotate-180"
                        />
                      </div>
                    </SidebarMenuButton>
                  </SidebarTooltip>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        href="/admin/climbs"
                        className="font-mono uppercase tracking-widest text-[10px]"
                      >
                        View Climbs
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton
                        href="/admin/add-climb"
                        className="font-mono uppercase tracking-widest text-[10px]"
                      >
                        Add Climb
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Blog */}
            <Collapsible
              open={blogOpen}
              onOpenChange={setBlogOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger>
                  <SidebarTooltip label="Blog" state={state}>
                    <SidebarMenuButton asChild onClick={handleBlogClick}>
                      <div className="flex items-center gap-2">
                        <MessageSquareText size={15} className="text-slate-500 shrink-0" />
                        <span className="font-display uppercase font-semibold text-[12px] tracking-[0.06em]">
                          Blog
                        </span>
                        <ChevronDown
                          size={13}
                          className="ml-auto text-slate-400 transition-transform group-data-[state=open]/collapsible:rotate-180"
                        />
                      </div>
                    </SidebarMenuButton>
                  </SidebarTooltip>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        href="/admin/blog"
                        className="font-mono uppercase tracking-widest text-[10px]"
                      >
                        View Posts
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton
                        href="/admin/blog/add-post"
                        className="font-mono uppercase tracking-widest text-[10px]"
                      >
                        Add Post
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Settings */}
            <SidebarMenuItem>
              <SidebarTooltip label="Settings" state={state}>
                <SidebarMenuButton asChild>
                  <Link href="/admin/settings" className="flex items-center gap-2">
                    <Settings size={15} className="text-slate-500 shrink-0" />
                    <span className="font-display uppercase font-semibold text-[12px] tracking-[0.06em]">
                      Settings
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarTooltip>
            </SidebarMenuItem>

            {/* Admin Home */}
            <SidebarMenuItem>
              <SidebarTooltip label="Admin Home" state={state}>
                <SidebarMenuButton asChild>
                  <Link href="/admin" className="flex items-center gap-2">
                    <HomeIcon size={15} className="text-slate-500 shrink-0" />
                    <span className="font-display uppercase font-semibold text-[12px] tracking-[0.06em]">
                      Admin Home
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarTooltip>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarTooltip label="Account" state={state}>
              <SidebarMenuButton asChild>
                <Link href="/account" className="flex items-center gap-2">
                  <User2 size={15} className="text-slate-500 shrink-0" />
                  <span className="font-display uppercase font-semibold text-[12px] tracking-[0.06em]">
                    {user ? user.username : "Guest"}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarTooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  );
}
