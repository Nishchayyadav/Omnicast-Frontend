"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
interface AppConfig {
  name: string;
  github: {
    title: string;
    url: string;
  };
  author: {
    name: string;
    url: string;
  };
}

export const appConfig: AppConfig = {
  name: "Shadcn Sample",
  github: {
    title: "Shadcn Sample",
    url: "https://github.com/hayyi2/shadcn-sample",
  },
  author: {
    name: "hayyi",
    url: "https://github.com/hayyi2/",
  },
};

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mainMenu } from "@/app/dashboard/menu";
import { ChevronDownIcon, ViewVerticalIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AuroraText } from "@/components/magicui/aurora-text";
import { RippleButton } from "@/components/magicui/ripple-button";
import { ChartNoAxesCombined, LogOut, Settings, UserRound } from "lucide-react";
import { ModeToggle } from "./themetoggle";
import { signOut, useSession } from "next-auth/react";
import { EmailPasswordDialog } from "./ProfileDialog";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  let firstName = session?.user?.firstName || "User";
  const lastName = session?.user?.lastName || "";
  const email = session?.user?.email || "email@example.com";
  const company = session?.user?.company || "Company";

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full bg-background/90 backdrop-blur">
      <div className="px-4 md:px-1 flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainMenu.map((menu, index) =>
              menu.items !== undefined ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger
                    className={cn(
                      "flex items-center py-1 focus:outline-none text-sm font-medium transition-colors hover:text-primary",
                      menu.items
                        .filter((subitem) => subitem.to !== undefined)
                        .map((subitem) => subitem.to)
                        .includes(pathname)
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    {menu.title}
                    <ChevronDownIcon className="ml-1 -mr-1 h-3 w-3 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48"
                    align="start"
                    forceMount
                  >
                    {menu.items.map((subitem, subindex) =>
                      subitem.to !== undefined ? (
                        <Link key={subindex} href={subitem.to} legacyBehavior>
                          <DropdownMenuItem
                            className={cn("hover:cursor-pointer", {
                              "bg-muted": subitem.to === pathname,
                            })}
                          >
                            {subitem.title}
                          </DropdownMenuItem>
                        </Link>
                      ) : subitem.label ? (
                        <DropdownMenuLabel key={subindex}>
                          {subitem.title}
                        </DropdownMenuLabel>
                      ) : (
                        <DropdownMenuSeparator key={subindex} />
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={index}
                  href={menu.to ?? "#"}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === menu.to
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {menu.title}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Mobile
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <ViewVerticalIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 sm:max-w-xs">
            <SheetHeader>
              <SheetTitle className="sr-only">Main Menu</SheetTitle>
            </SheetHeader>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2 pl-8"
            >
              <Logo />
            </Link>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8 pl-8">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue={
                  "item-" +
                  mainMenu.findIndex((item) =>
                    item.items
                      ? item.items
                          .filter((subitem) => subitem.to !== undefined)
                          .map((subitem) => subitem.to)
                          .includes(pathname)
                      : false
                  )
                }
              >
                <div className="flex flex-col space-y-3">
                  {mainMenu.map((menu, index) =>
                    menu.items !== undefined ? (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b-0 pr-6"
                      >
                        <AccordionTrigger
                          className={cn(
                            "py-1 hover:no-underline hover:text-primary [&[data-state=open]]:text-primary",
                            menu.items
                              .filter((subitem) => subitem.to !== undefined)
                              .map((subitem) => subitem.to)
                              .includes(pathname)
                              ? "text-foreground"
                              : "text-foreground/60"
                          )}
                        >
                          <div className="flex">{menu.title}</div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-1 pl-4">
                          <div className="mt-1">
                            {menu.items.map((submenu, subindex) =>
                              submenu.to !== undefined ? (
                                <Link
                                  key={subindex}
                                  href={submenu.to}
                                  onClick={() => setOpen(false)}
                                  className={cn(
                                    "block justify-start py-1 h-auto font-normal hover:text-primary",
                                    pathname === submenu.to
                                      ? "text-foreground"
                                      : "text-foreground/60"
                                  )}
                                >
                                  {submenu.title}
                                </Link>
                              ) : null
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <Link
                        key={index}
                        href={menu.to ?? "#"}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "py-1 text-sm font-medium transition-colors hover:text-primary",
                          pathname === menu.to
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        {menu.title}
                      </Link>
                    )
                  )}
                </div>
              </Accordion>
            </ScrollArea>
          </SheetContent>
        </Sheet> */}

        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <span className="font-bold inline-block text-xl">
            <AuroraText>Dashboard</AuroraText>{" "}
          </span>
        </Link>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center space-x-2">
            <Button
              className="rounded-full font-bold hover:cursor-pointer hover:scale-102 transition-all duration-500 ease-in-out"
              variant="outline"
            >
              {" "}
              <ChartNoAxesCombined />{" "}
              <span className="md:block hidden">Analytics</span>{" "}
            </Button>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8 hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
                    <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {firstName} {lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground mt-1">
                      {company}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <div className="w-full px-1.5 py-1.5 text-[15px] hover:bg-muted rounded-sm">
                  <EmailPasswordDialog />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
