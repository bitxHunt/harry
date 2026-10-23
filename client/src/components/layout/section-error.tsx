import { Component, type ReactNode } from "react";
import { profile } from "@/data";

/*
  Catches a crash in one part of the page (for example a lazy chunk that failed to
  load) so the rest of the site stays up. Shows a short note with the email address.
*/
export class SectionError extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error(error);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="mx-auto max-w-6xl px-5 py-12 font-mono text-sm text-muted-foreground md:px-10">
        This part of the page didn't load. Refresh to try again, or email me at{" "}
        <a className="text-arch underline-offset-4 hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
      </section>
    );
  }
}
