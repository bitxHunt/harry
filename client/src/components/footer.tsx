import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { label: "Home", hash: "" },
  { label: "Projects", hash: "projects" },
  { label: "Blogs", hash: "articles" },
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
    <footer className="bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto px-8 md:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 items-center md:items-stretch">
          {/* Name + tagline */}
          <div className="space-y-1 text-center md:text-left">
            <Link
              to="/"
              className="text-sm font-bold tracking-tight text-white"
            >
              Thiha Swan Htet
            </Link>
            <p className="text-xs text-neutral-500">
              Developer · Builder · Community person
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex gap-6">
            {navLinks.map(({ label, hash }) => (
              <Link
                key={hash}
                to="/"
                hash={hash || undefined}
                resetScroll={false}
                className="text-sm text-neutral-400 hover:text-indigo-300 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-1">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Button
                key={label}
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-neutral-400 hover:text-indigo-300 hover:bg-white/10"
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

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-neutral-600 text-center">
          <span>© 2026 Thiha Swan Htet. All rights reserved.</span>
          <span>Built with React · TanStack Router · shadcn/ui</span>
        </div>
      </div>
    </footer>
  );
}
