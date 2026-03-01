import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blogs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="p-2">Hello "/blogs"!</div>
}
