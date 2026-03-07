import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const RootLayout = () => (
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
