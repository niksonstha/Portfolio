export interface ContactLink {
  label: string;
  href: string;
  external?: boolean;
}

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:niksonshrestha7@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nikson-shrestha-8483ab174/",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/niksonstha",
    external: true,
  },
];
