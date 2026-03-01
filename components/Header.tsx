"use client";
import { Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <div className="px-2 py-2 md:px-0 md:py-2 flex justify-center items-center border-b-2 bg-secondary">
      <div className="flex w-full justify-between md:justify-center md:gap-8 lg:gap-16 items-center px-4">
        <Link
          href="/"
          className="text-2xl lg:text-3xl text-gray-500 font-bold flex items-center gap-2 p-2"
        >
          <div className="relative w-18 h-18">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              sizes="60px"
              className="object-contain"
            />
          </div>
          Byron Climbs
        </Link>

        <div className="md:hidden">
          <Drawer direction="left">
            <DrawerTrigger>
              <Menu className="hover:cursor-pointer border-2 py-1 px-2 h-8 w-10" />
            </DrawerTrigger>
            <DrawerContent direction="left">
              <DrawerHeader>
                <div className="flex justify-between">
                  <DrawerTitle>Menu</DrawerTitle>
                  <DrawerClose className="ml-auto">
                    <X className="hover:cursor-pointer hover:bg-slate-100 rounded-full p-1" />
                  </DrawerClose>
                </div>
              </DrawerHeader>

              <nav className="flex flex-col w-full ">
                <DrawerClose>
                  <div
                    className="w-full text-start px-4 py-2 hover:cursor-pointer hover:bg-secondary"
                    onClick={() => router.push("/")}
                  >
                    Home
                  </div>
                </DrawerClose>

                <DrawerClose>
                  <div
                    className="w-full text-start px-4 py-2 hover:cursor-pointer hover:bg-secondary"
                    onClick={() => router.push("/about")}
                  >
                    About
                  </div>
                </DrawerClose>

                <DrawerClose>
                  <div
                    className="w-full text-start px-4 py-2 hover:cursor-pointer hover:bg-secondary"
                    onClick={() => router.push("/blog")}
                  >
                    Blog
                  </div>
                </DrawerClose>

                <DrawerClose>
                  <div
                    className="w-full text-start px-4 py-2 hover:cursor-pointer hover:bg-secondary"
                    onClick={() => router.push("/database")}
                  >
                    Database
                  </div>
                </DrawerClose>
                <DrawerClose>
                  <div
                    className="w-full text-start px-4 py-2 hover:cursor-pointer hover:bg-secondary"
                    onClick={() => router.push("/contact")}
                  >
                    Contact
                  </div>
                </DrawerClose>
                <DrawerClose>
                  <div
                    className="w-full text-start px-4 py-2 hover:cursor-pointer hover:bg-secondary"
                    onClick={() => router.push("/account")}
                  >
                    Profile
                  </div>
                </DrawerClose>
              </nav>
              <div className="ml-3 mt-3 ">
                <Tooltip>
                  <TooltipTrigger>
                    <ModeToggle />
                  </TooltipTrigger>
                  <TooltipContent>Toggle theme</TooltipContent>
                </Tooltip>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-4 md:gap-8 items-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>

            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/database">Database</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/account">
                    <UserRound />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View Profile</TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent>Toggle theme</TooltipContent>
              </Tooltip>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
