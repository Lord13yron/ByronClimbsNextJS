"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import BrandMark from "./BrandMark";
import MonoChip from "./ui/MonoChip";
import { createClient } from "@/lib/supabase/supabaseClient";
import { signOutUser } from "@/lib/auth-actions";

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
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, email, avatar_url, role")
          .eq("id", user.id)
          .single();
        setInitials(getInitials(profile?.username ?? null, profile?.email ?? user.email ?? null));
        setUsername(profile?.username ?? profile?.email ?? user.email ?? null);
        setAvatarUrl(profile?.avatar_url ?? null);
        setIsAdmin(profile?.role === "admin");
      }
      setAuthChecked(true);
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-chalk-3 bg-[rgba(244,241,236,0.9)] backdrop-blur-[10px] backdrop-saturate-[1.8]">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-granite-200 text-chalk font-display font-bold text-[13px] border-[1.5px] border-ember hover:border-ember-soft transition-colors focus-visible:outline-none focus-visible:border-ember-soft overflow-hidden"
                    aria-label="Account menu"
                  >
                    {avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={avatarUrl} alt="" aria-hidden="true" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                    ) : initials}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-48 rounded-sm border border-granite-200/60 bg-granite-100 p-1 shadow-lg"
                >
                  {username && (
                    <DropdownMenuLabel className="font-display text-[11px] uppercase tracking-[0.06em] text-slate-500 truncate">
                      {username}
                    </DropdownMenuLabel>
                  )}
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin"
                          className="font-display uppercase text-[13px] font-semibold tracking-[0.06em] text-ember focus:bg-granite-200 focus:text-ember-soft cursor-pointer"
                        >
                          Admin
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-granite-200/60" />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account"
                      className="font-display uppercase text-[13px] font-semibold tracking-[0.06em] text-slate-400 focus:bg-granite-200 focus:text-chalk cursor-pointer"
                    >
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-granite-200/60" />
                  <form action={signOutUser}>
                    <DropdownMenuItem asChild>
                      <button
                        type="submit"
                        className="w-full text-left font-display uppercase text-[13px] font-semibold tracking-[0.06em] text-slate-400 focus:bg-granite-200 focus:text-ember-soft cursor-pointer"
                      >
                        Sign out
                      </button>
                    </DropdownMenuItem>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
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
              <DrawerContent
                direction="left"
                className="bg-background w-[88%] max-w-[360px]"
              >
                <DrawerHeader className="flex flex-row items-center justify-between px-4 py-3 border-b border-border">
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

                <nav className="flex flex-col gap-1 p-3">
                  {navItems.map((item) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <DrawerClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={`font-display uppercase text-[15px] font-semibold tracking-[0.05em] px-3 py-3 rounded-sm transition-colors ${
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
                </nav>

                {authChecked && (
                  <DrawerFooter className="border-t border-border">
                    {initials && isAdmin && (
                      <DrawerClose asChild>
                        <Link
                          href="/admin"
                          className="block w-full border-b border-border pb-3 mb-1 font-display uppercase text-[15px] font-semibold tracking-[0.05em] text-ember hover:text-ember-soft transition-colors"
                        >
                          Admin
                        </Link>
                      </DrawerClose>
                    )}
                    {initials ? (
                      <div className="flex items-center justify-between gap-3">
                        <DrawerClose asChild>
                          <Link
                            href="/account"
                            className="flex items-center gap-3 min-w-0"
                          >
                            <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-granite-200 text-chalk font-display font-bold text-[13px] border-[1.5px] border-ember overflow-hidden">
                              {avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={avatarUrl} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                              ) : initials}
                            </span>
                            <span className="font-display text-[14px] text-granite-100 truncate">
                              {username}
                            </span>
                          </Link>
                        </DrawerClose>
                        <form action={signOutUser}>
                          <button
                            type="submit"
                            className="font-display uppercase text-[12px] font-semibold tracking-[0.06em] text-slate-500 hover:text-granite-100 transition-colors"
                          >
                            Sign out
                          </button>
                        </form>
                      </div>
                    ) : (
                      <DrawerClose asChild>
                        <Link
                          href="/account/signin"
                          className="block w-full bg-granite-200 text-chalk font-display uppercase text-[13px] font-semibold tracking-[0.06em] py-3 rounded-sm text-center hover:bg-granite-100 transition-colors"
                        >
                          Sign in
                        </Link>
                      </DrawerClose>
                    )}
                  </DrawerFooter>
                )}
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
}
