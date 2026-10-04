// Technology groups: the meters at the top of the htop view in Stack.
export const stack: { group: string; packages: string[] }[] = [
  { group: "lang", packages: ["typescript", "javascript", "java", "python", "sql", "html-css", "c"] },
  { group: "web", packages: ["react", "tanstack-router", "tanstack-query", "tailwindcss", "shadcn-ui", "node", "express", "spring-boot"] },
  { group: "data", packages: ["postgresql", "prisma", "mysql", "mongodb", "supabase", "firebase"] },
  { group: "infra", packages: ["docker", "terraform", "github-actions", "aws", "azure", "render", "vercel"] },
  { group: "test", packages: ["playwright", "jest", "artillery"] },
  { group: "daily", packages: ["arch-linux", "hyprland", "zsh", "vim", "git", "obsidian"] },
];
