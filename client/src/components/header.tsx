import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blogs" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-neutral-200 dark:border-white/10 bg-white flex justify-center">
      <div className="flex items-center justify-between w-full max-w-6xl px-6 md:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-sm tracking-tight text-neutral-500 dark:text-white"
        >
          Thiha Swan Htet
        </Link>

        {/* Desktop nav — right aligned */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-neutral-500 hover:text-sky-500 dark:hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <Button>
            Contact Me
          </Button>
        </nav>

        {/* Mobile nav */}
        <div className="flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 pt-12">
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="text-sm px-2 py-3 text-neutral-400 hover:text-black dark:hover:text-white border-b border-neutral-100 dark:border-neutral-800 transition-colors "
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <Button className="rounded-full mt-4" onClick={() => setOpen(false)}>
                  Contact Me
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}