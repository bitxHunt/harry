import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

type NavLink = {
  label: string;
  hash: string;
};

const navLinks: NavLink[] = [
  { label: "About", hash: "about" },
  { label: "Projects", hash: "projects" },
  { label: "Blogs", hash: "articles" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-950 flex justify-center">
      <div className="flex items-center justify-between w-full max-w-6xl px-6 md:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          Thiha Swan Htet
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, hash }) => (
            <Link
              key={hash}
              to="/"
              hash={hash}
              resetScroll={false}
              className="text-sm text-neutral-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              {label}
            </Link>
          ))}
          <Button asChild>
            <Link to="/" hash="contact" resetScroll={false}>
              Contact Me
            </Link>
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
                {navLinks.map(({ label, hash }) => (
                  <Link
                    key={hash}
                    to="/"
                    hash={hash}
                    resetScroll={false}
                    className="text-sm px-2 py-3 text-neutral-400 hover:text-black dark:hover:text-white border-b border-neutral-100 dark:border-neutral-800 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <Button className="rounded-full mt-4" asChild>
                  <Link
                    to="/"
                    hash="contact"
                    resetScroll={false}
                    onClick={() => setOpen(false)}
                  >
                    Contact Me
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
