import Container from "../ui/Container";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-12 sm:py-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <a
                href="#home"
                className="text-lg font-semibold tracking-tight transition-colors duration-200 hover:text-accent"
              >
                Nikson
              </a>

              <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                Frontend / Full-Stack Developer building thoughtful web
                experiences.
              </p>
            </div>

            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              © {currentYear} Nikson. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/niksonstha"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                GitHub ↗
              </a>

              <a
                href="mailto:niksonshrestha7@gmail.com"
                className="text-xs text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Email ↗
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
