import { lazy, Suspense } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { HoloCursor } from "@/components/effects/holo-cursor";
import { Starfield } from "@/components/effects/starfield";
import { ScrollRail } from "@/components/effects/scroll-rail";

// Devtools only in development, so they never ship to production.
const RouterDevtools = import.meta.env.DEV
  ? lazy(() => import("@tanstack/react-router-devtools").then((m) => ({ default: m.TanStackRouterDevtools })))
  : () => null;

// Last resort if a whole route crashes: plain text, never a raw stack trace.
const RouteError = () => (
  <section className="mx-auto max-w-2xl px-5 py-24 font-mono text-sm text-muted-foreground">
    <p className="text-foreground">Something on this page broke.</p>
    <p className="mt-2">
      Refresh to try again, or <a className="text-arch underline-offset-4 hover:underline" href="/">go back home</a>.
    </p>
  </section>
);

const RootLayout = () => (
  <div>
    <Starfield />
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-arch focus:px-3 focus:py-2 focus:text-primary-foreground">
      Skip to content
    </a>
    <Header />
    <main id="main">
      <Outlet />
    </main>
    <Footer />
    <HoloCursor />
    <ScrollRail />
    <Suspense fallback={null}>
      <RouterDevtools />
    </Suspense>
  </div>
);

export const Route = createRootRoute({
  component: RootLayout,
  pendingComponent: LoadingScreen,
  errorComponent: RouteError,
  pendingMinMs: 300,
});
