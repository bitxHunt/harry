import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "@/context/theme-provider";
import { LoadingScreen } from "@/components/loading-screen";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Create a client
const queryClient = new QueryClient();

export function App() {
  const [ready, setReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 800);
    const t2 = setTimeout(() => setReady(true), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {!ready && (
          <div className={`transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
            <LoadingScreen />
          </div>
        )}
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
