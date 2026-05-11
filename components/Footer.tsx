import Link from "next/link";
import BrandMark from "./BrandMark";
import MonoChip from "./ui/MonoChip";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Field Notes" },
  { href: "/database", label: "Database" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/account", label: "Profile" },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-14 py-8 md:py-10 flex flex-col md:flex-row items-center md:justify-between gap-4 flex-wrap">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <BrandMark size={28} />
          <span className="font-display uppercase font-bold text-[14px] tracking-[0.06em] text-granite-100">
            Byron Climbs
          </span>
          <MonoChip>© 2026 · KELOWNA, BC</MonoChip>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-4 flex-wrap justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono uppercase text-[10px] tracking-widest text-slate-500 hover:text-granite-100 transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
