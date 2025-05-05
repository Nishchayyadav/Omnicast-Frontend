import { Button } from "@/components/ui/button";
import { MailCheck, MailOpen, Menu, MenuSquare, SatelliteDish } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const menu = [
  { title: "Features", url: "#" },
  { title: "About", url: "#" },
  { title: "Pricing", url: "#" },
  { title: "Blog", url: "#" },
  { title: "Changelog", url: "#" },
];

export function SheetDemo({}) {
  return (
    <Sheet key={"bottom"}>
      <SheetTrigger asChild>
        <Menu className="size-6 sm:size-7 hover:cursor-pointer hover:scale-105 transition-all duration-300 pr-1" />
      </SheetTrigger>

      <SheetContent
        className="overflow-y-auto  px-2 pb-10" // Reduced width + consistent padding
        side="bottom" // Optional: specify side if not using responsive logic
      >
        <SheetHeader>
          <SheetTitle>
            <Link href="/">
              <SatelliteDish className="size-6 hover:cursor-pointer hover:scale-120 transition-all duration-300 hover:text-neutral-400" />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6">
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-4 px-5 items-center text-neutral-500"
          >
            {menu.map((item) => renderMobileMenuItem(item))}
          </Accordion>

          <div className="flex flex-col gap-3 px-5 mt-2">
            <Button variant={'outline'}>
              <MailCheck /> <Link href="/login">Login with Email</Link>
            </Button>
            <Button>
            <MailOpen /> <Link href="/signup">Signup with Email</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};
