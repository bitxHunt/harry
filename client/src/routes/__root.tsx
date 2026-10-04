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
  pendingMinMs: 300,
});
