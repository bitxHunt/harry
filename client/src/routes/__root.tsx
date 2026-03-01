import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const RootLayout = () => (
  <div className="bg-white dark:bg-black font-inter">
    <Header />
    <main className="bg-neutral-50">
      <Outlet />
    </main>
    <Footer />
    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
