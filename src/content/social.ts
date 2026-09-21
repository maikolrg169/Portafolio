export const social = [
  { url: "mailto:me@michael-rodriguez.dev", name: "mail" },
  { url: "https://github.com/michael-rodriguez", name: "github" },
  { url: "https://www.linkedin.com/in/michael-rodriguez/", name: "linkedin" },
  { url: "https/x.com/michael_rodriguez", name: "x" },
  //{ url: "https://www.instagram.com/davidhckh/", name: "instagram" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
