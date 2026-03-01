import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Articles() {
  return (
    <section className="border-t border-neutral-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — unchanged */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sky-500 mb-4">
              Writing
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Articles</h2>
            <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
              I'm working on writing about things I've built and learnt. First
              few pieces are in the works — check back soon.
            </p>
          </div>

          {/* Right — notify me */}
          <div className="border border-neutral-200 dark:border-white/10 rounded-2xl p-8 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-xs text-sky-500 border-sky-500/40"
              >
                ✦ Coming soon
              </Badge>
            </div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Get notified when I publish
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Drop your email and I'll let you know when the first article is out. No spam.
            </p>
            <div className="flex gap-2 mt-1">
              <Input
                type="email"
                placeholder="example@gmail.com"
                className="text-sm"
              />
              <Button size="icon" className="shrink-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}