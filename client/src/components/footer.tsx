import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blogs" },
] as const;

const socialLinks = [
  { label: "GitHub", href: "https://github.com/bitxHunt", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/thiha-swan-htet-tsh/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_tsh_harry/",
    icon: Instagram,
  },
  { label: "Email", href: "mailto:tsh.harry.dev@gmail.com", icon: Mail },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-1">
            <Link
              to="/"
              className="text-sm text-neutral-500 tracking-tight text-foreground"
            >
              Thiha Swan Htet
            </Link>
            <p className="text-xs text-muted-foreground">
              Developer · Builder · Community person
            </p>
          </div>

          <nav className="flex gap-6">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-neutral-500 hover:text-sky-500"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Button
                key={label}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                asChild
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <span>© 2026 Thiha Swan Htet. All rights reserved.</span>
          <span>Built with React · TanStack Router · shadcn/ui</span>
        </div>
      </div>
    </footer>
  );
}
