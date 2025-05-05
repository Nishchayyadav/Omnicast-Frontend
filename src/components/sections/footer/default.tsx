import { ModeToggle } from "../../ui/mode-toggle";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "../../ui/footer";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SatelliteDish } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <SatelliteDish className="size-9 hover:scale-105 transition-all duration-700 hover:text-neutral-300" />,
  name = "OmniCast",
  columns = [
    {
      title: "Product",
      links: [
        { text: "Changelog", href: "https://www.launchuicomponents.com/" },
        { text: "Documentation", href: "https://www.launchuicomponents.com/" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "https://www.launchuicomponents.com/" },
        { text: "Careers", href: "https://www.launchuicomponents.com/" },
        { text: "Blog", href: "https://www.launchuicomponents.com/" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "Discord", href: "https://www.launchuicomponents.com/" },
        { text: "Twitter", href: "https://www.launchuicomponents.com/" },
        { text: "Github", href: "https://www.launchuicomponents.com/" },
      ],
    },
  ],
  copyright = "© 2025 OmniCast, IN3. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "https://www.launchuicomponents.com/" },
    { text: "Terms of Service", href: "https://www.launchuicomponents.com/" },
  ],
  showModeToggle = false,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-black w-full mt-20 px-4 text-white", className)}>
      <div className="max-w-7xl mx-auto">
        <Footer className="shadow-none flex flex-col">
          <FooterContent className="flex flex-col sm:flex-row sm:justify-around items-start w-full text-left gap-10">
            <FooterColumn className="items-start">
              <h3 className="text-[24px] pt-2 font-semibold flex tracking-tighter items-center gap-2 text-neutral-400 hover:scale-105 transition-all duration-700 hover:text-neutral-300">
                {logo}
                {name}
              </h3>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index} className="items-start">
                <h3 className="text-lg pt-2 font-semibold text-neutral-400 hover:scale-105 transition-all duration-700 hover:text-neutral-300">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:underline text-neutral-600 hover:scale-105 transition-all duration-700 hover:text-neutral-400"
                  >
                    {link.text}
                  </Link>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>

          <FooterBottom className="flex flex-col items-center justify-center gap-2 mt-15 pt-6">
            <div className="text-xs text-center text-muted-foreground">
              {copyright}
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs ">
              {policies.map((policy, index) => (
                <Link key={index} href={policy.href} className="text-sm underline">
                  {policy.text}
                </Link>
              ))}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
