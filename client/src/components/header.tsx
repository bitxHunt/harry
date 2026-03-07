import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/useTheme";

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
  const { theme, setTheme } = useTheme();

  const effectiveTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const toggleTheme = () =>
    setTheme(effectiveTheme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-neutral-200 dark:border-white/20 bg-white dark:bg-neutral-950 flex justify-center">
      <div className="flex items-center justify-between w-full max-w-6xl px-8 md:px-10">

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
              className="text-sm text-neutral-500 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-indigo-500 dark:after:bg-indigo-300 after:transition-all after:duration-300"
            >
              {label}
            </Link>
          ))}
          <Button className="shimmer" asChild>
            <Link to="/" hash="contact" resetScroll={false}>
              Contact Me
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
            {effectiveTheme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </nav>

        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
            {effectiveTheme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
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
