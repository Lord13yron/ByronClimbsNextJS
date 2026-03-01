// "use client";
// import {
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
// } from "./ui/sidebar";

// import {
//   ChevronDown,
//   HomeIcon,
//   LayoutDashboard,
//   MessageSquareText,
//   MountainSnow,
//   Settings,
//   User2,
// } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "./ui/collapsible";
// import Link from "next/link";
// import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
// import { useState } from "react";

// export default function AdminSidebar() {
//   const { state, setOpen } = useSidebar();
//   const [climbsOpen, setClimbsOpen] = useState(false);
//   const [blogOpen, setBlogOpen] = useState(false);

//   const handleClimbsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (state === "collapsed" && !climbsOpen) {
//       setOpen(true);
//       setClimbsOpen(true); // open submenu after expanding
//     }
//     if (state === "collapsed" && climbsOpen) {
//       e.preventDefault();
//       e.stopPropagation();
//       setOpen(true);
//     }
//   };
//   const handleBlogClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (state === "collapsed" && !blogOpen) {
//       setOpen(true);
//       setBlogOpen(true); // open submenu after expanding
//     }
//     if (state === "collapsed" && blogOpen) {
//       e.preventDefault();
//       e.stopPropagation();
//       setOpen(true);
//     }
//   };

//   return (
//     <Sidebar variant="sidebar" collapsible="icon">
//       <SidebarHeader>
//         <SidebarMenuButton asChild>
//           <div>
//             <LayoutDashboard />
//             <span>Admin Dashboard</span>
//           </div>
//         </SidebarMenuButton>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//           <SidebarMenu>
//             <Collapsible
//               open={climbsOpen}
//               onOpenChange={setClimbsOpen}
//               className="group/collapsible"
//             >
//               <SidebarMenuItem className="">
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <CollapsibleTrigger>
//                       {/* <SidebarMenuButton asChild onClick={() => setOpen(true)}> */}

//                       <SidebarMenuButton asChild onClick={handleClimbsClick}>
//                         <div className="">
//                           <MountainSnow />
//                           <span>Climbs</span>
//                           <ChevronDown className="ml-34 transition-transform group-data-[state=open]/collapsible:rotate-180" />
//                         </div>
//                       </SidebarMenuButton>
//                     </CollapsibleTrigger>
//                   </TooltipTrigger>
//                   <CollapsibleContent>
//                     <SidebarMenuSub>
//                       <SidebarMenuSubItem>
//                         <SidebarMenuSubButton>View Climbs</SidebarMenuSubButton>

//                         <SidebarMenuSubButton>Add Climb</SidebarMenuSubButton>

//                         <SidebarMenuSubButton>Edit Climb</SidebarMenuSubButton>
//                       </SidebarMenuSubItem>
//                     </SidebarMenuSub>
//                   </CollapsibleContent>
//                   {state === "collapsed" && (
//                     <TooltipContent side="right">Climbs</TooltipContent>
//                   )}
//                 </Tooltip>
//               </SidebarMenuItem>
//             </Collapsible>

//             <Collapsible
//               open={blogOpen}
//               onOpenChange={setBlogOpen}
//               className="group/collapsible"
//             >
//               <SidebarMenuItem className="">
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <CollapsibleTrigger>
//                       <SidebarMenuButton asChild onClick={handleBlogClick}>
//                         <div className="">
//                           <MessageSquareText />
//                           <span>Blog</span>
//                           <ChevronDown className="ml-37.5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
//                         </div>
//                       </SidebarMenuButton>
//                     </CollapsibleTrigger>
//                   </TooltipTrigger>
//                   <CollapsibleContent>
//                     <SidebarMenuSub>
//                       <SidebarMenuSubItem>
//                         <SidebarMenuSubButton>
//                           View Blog Posts
//                         </SidebarMenuSubButton>
//                         <SidebarMenuSubButton>
//                           Add Blog Post
//                         </SidebarMenuSubButton>
//                         <SidebarMenuSubButton>
//                           Edit Blog Post
//                         </SidebarMenuSubButton>
//                       </SidebarMenuSubItem>
//                     </SidebarMenuSub>
//                   </CollapsibleContent>
//                   {state === "collapsed" && (
//                     <TooltipContent side="right">Blog</TooltipContent>
//                   )}
//                 </Tooltip>
//               </SidebarMenuItem>
//             </Collapsible>

//             <SidebarMenuItem>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <SidebarMenuButton asChild>
//                     <Link href="/settings">
//                       <Settings />
//                       <span>Settings</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </TooltipTrigger>
//                 {state === "collapsed" && (
//                   <TooltipContent side="right">Settings</TooltipContent>
//                 )}
//               </Tooltip>
//             </SidebarMenuItem>

//             <SidebarMenuItem>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <SidebarMenuButton asChild>
//                     <Link href="/">
//                       <HomeIcon />
//                       <span>Home</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </TooltipTrigger>
//                 {state === "collapsed" && (
//                   <TooltipContent side="right">Home</TooltipContent>
//                 )}
//               </Tooltip>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton>
//               <User2 /> Username
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

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
      setClimbsOpen(true); // open submenu after expanding
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
      setBlogOpen(true); // open submenu after expanding
    }
    if (state === "collapsed" && blogOpen) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    }
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarTooltip label="Toggle Admin Dashboard" state={state}>
          <SidebarMenuButton asChild onClick={() => setOpen(!open)}>
            <div>
              <LayoutDashboard />
              <span>Admin Dashboard</span>
            </div>
          </SidebarMenuButton>
        </SidebarTooltip>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
              open={climbsOpen}
              onOpenChange={setClimbsOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem className="">
                <CollapsibleTrigger>
                  {/* <SidebarMenuButton asChild onClick={() => setOpen(true)}> */}
                  <SidebarTooltip label="Climbs" state={state}>
                    <SidebarMenuButton asChild onClick={handleClimbsClick}>
                      <div className="">
                        <MountainSnow />
                        <span>Climbs</span>
                        <ChevronDown className="ml-30 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarTooltip>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="/admin/climbs">
                        View Climbs
                      </SidebarMenuSubButton>

                      <SidebarMenuSubButton href="/admin/add-climb">
                        Add Climb
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible
              open={blogOpen}
              onOpenChange={setBlogOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem className="">
                <CollapsibleTrigger>
                  <SidebarTooltip label="Blog" state={state}>
                    <SidebarMenuButton asChild onClick={handleBlogClick}>
                      <div className="">
                        <MessageSquareText />
                        <span>Blog</span>
                        <ChevronDown className="ml-33.5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarTooltip>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="/admin/blog">
                        View Blog Posts
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton href="/admin/blog/add-post">
                        Add Blog Post
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <SidebarMenuItem>
              <SidebarTooltip label="Settings" state={state}>
                <SidebarMenuButton asChild>
                  <Link href="/admin/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarTooltip>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarTooltip label="Admin Home" state={state}>
                <SidebarMenuButton asChild>
                  <Link href="/admin">
                    <HomeIcon />
                    <span>Admin Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarTooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarTooltip label="Account" state={state}>
              <SidebarMenuButton asChild>
                <Link href="/account" className="flex gap-2 items-center">
                  <User2 /> {user ? user.username : "Guest"}
                </Link>
              </SidebarMenuButton>
            </SidebarTooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
