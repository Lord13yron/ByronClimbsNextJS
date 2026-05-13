"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import BrandMark from "./BrandMark";
import MonoChip from "./ui/MonoChip";
import { createClient } from "@/lib/supabase/supabaseClient";

function getInitials(username: string | null, email: string | null): string {
  const source = username || email || "";
  const parts = source.split(/[\s@]/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Field Notes" },
  { href: "/database", label: "Database" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [initials, setInitials] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, email")
          .eq("id", user.id)
          .single();
        setInitials(getInitials(profile?.username ?? null, profile?.email ?? user.email ?? null));
      }
      setAuthChecked(true);
    });
  }, []);

  return (
    <header className="border-b border-border bg-background z-10 relative">
      <div className="flex items-center justify-between px-4 md:px-14 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <BrandMark size={36} />
          <div className="flex flex-col leading-none">
            <span className="font-display uppercase font-bold text-[19px] tracking-[0.06em] text-granite-100">
              Byron Climbs
            </span>
            <MonoChip className="mt-1 text-[9px]">
              EST. 2019 · KELOWNA, BC
            </MonoChip>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-display uppercase text-[13px] font-semibold tracking-[0.06em] px-3.5 py-2 border-b-2 transition-colors duration-150 ${
                  active
                    ? "text-granite-100 border-ember"
                    : "text-slate-500 border-transparent hover:text-granite-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: avatar + theme + mobile trigger */}
        <div className="flex items-center gap-3">
          {authChecked && (
            initials ? (
              <Link
                href="/account"
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-granite-200 text-chalk font-display font-bold text-[13px] border-[1.5px] border-ember hover:border-ember-soft transition-colors"
                aria-label="Profile"
              >
                {initials}
              </Link>
            ) : (
              <Link
                href="/account/signin"
                className="hidden md:flex font-display uppercase text-[13px] font-semibold tracking-[0.06em] px-3.5 py-2 text-slate-500 hover:text-granite-100 transition-colors duration-150"
              >
                Sign in
              </Link>
            )
          )}

          {/* Mobile drawer trigger */}
          <div className="md:hidden">
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <button
                  className="border border-chalk-3 p-1.5 rounded-sm hover:bg-chalk-2 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-4 h-4" />
                </button>
              </DrawerTrigger>
              <DrawerContent direction="left" className="bg-background w-72">
                <DrawerHeader className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <BrandMark size={28} />
                    <DrawerTitle className="font-display uppercase text-[15px] tracking-[0.06em]">
                      Byron Climbs
                    </DrawerTitle>
                  </div>
                  <DrawerClose asChild>
                    <button className="p-1 hover:bg-chalk-2 rounded-sm transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </DrawerClose>
                </DrawerHeader>

                <nav className="flex flex-col p-2">
                  {navItems.map((item) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <DrawerClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={`font-display uppercase text-[13px] font-semibold tracking-[0.05em] px-3 py-2.5 rounded-sm transition-colors ${
                            active
                              ? "text-ember bg-chalk-2"
                              : "text-granite-100 hover:bg-chalk-2"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </DrawerClose>
                    );
                  })}
                  <DrawerClose asChild>
                    <Link
                      href="/account"
                      className="font-display uppercase text-[13px] font-semibold tracking-[0.05em] px-3 py-2.5 rounded-sm text-granite-100 hover:bg-chalk-2 transition-colors mt-1 border-t border-border pt-3"
                    >
                      Profile
                    </Link>
                  </DrawerClose>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
}
