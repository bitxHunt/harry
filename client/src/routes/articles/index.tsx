import { createFileRoute } from "@tanstack/react-router";
import { ArticlesPage } from "@/components/articles";

export const Route = createFileRoute("/articles/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ArticlesPage />
    </div>
  );
}
