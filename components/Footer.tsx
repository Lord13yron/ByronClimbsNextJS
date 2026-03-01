import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { UserRound } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center w-full pb-4 bg-secondary">
      <div className="flex  w-full text-3xl justify-center items-center font-bold border-y-2 border-gray-400 py-4 gap-2">
        <div className="relative w-18 h-18">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            sizes="60px"
            className="object-contain"
          />
        </div>
        <h1 className="text-gray-500">Byron Climbs</h1>
      </div>
      {/* </div> */}
      <nav className="mt-4">
        <ul className="flex gap-4 sm:gap-8 items-center">
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
        </ul>
      </nav>
    </footer>
  );
}
