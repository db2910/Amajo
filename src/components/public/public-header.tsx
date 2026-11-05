"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { NavigationMenu } from "radix-ui";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { Brand } from "@/components/brand";
import { Container } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  destinationGroups,
  experienceLinks,
  mainLinks,
} from "@/features/navigation/links";
import { cn } from "@/lib/utils";

const subscribeToScroll = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};
const getScrolled = () => window.scrollY > 48;
const getServerScrolled = () => false;
const navItem =
  "inline-flex min-h-11 items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-current/10 focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-current";
const menuLink =
  "block rounded-md px-3 py-2 text-sm leading-6 transition-colors hover:bg-sand focus-visible:bg-sand focus-visible:outline-primary";

export function PublicHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolled,
    getServerScrolled,
  );
  const overlay = pathname === "/" && !scrolled;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const closeMenu = () => setActiveMenu("");

  return (
    <header
      data-testid="public-header"
      data-overlay={overlay}
      className={cn(
        "z-40 w-full transition-[background-color,box-shadow,color] duration-300",
        pathname === "/" ? "fixed top-0" : "sticky top-0",
        overlay
          ? "border-b border-white/20 bg-cocoa/20 text-white backdrop-blur-sm"
          : "border-b bg-background/95 text-cocoa shadow-soft backdrop-blur-md",
      )}
    >
      <Container className="flex min-h-24 items-center justify-between gap-4 py-3">
        <Brand compact />
        <NavigationMenu.Root
          aria-label="Main navigation"
          value={activeMenu}
          onValueChange={setActiveMenu}
          delayDuration={150}
          skipDelayDuration={300}
          className="amajo-navigation relative hidden xl:block"
        >
          <NavigationMenu.List className="flex items-center gap-0.5">
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={cn(
                    navItem,
                    pathname === "/" &&
                      "underline decoration-gold decoration-2 underline-offset-8",
                  )}
                >
                  Home
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item className="relative" value="destinations">
              <NavigationMenu.Trigger
                className={cn(
                  navItem,
                  pathname.startsWith("/destinations") &&
                    "underline decoration-gold decoration-2 underline-offset-8",
                )}
              >
                Destinations{" "}
                <ChevronDown
                  aria-hidden="true"
                  className="size-3.5 transition-transform [[data-state=open]>&]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full -left-20 w-[680px] pt-4 text-cocoa">
                <div className="rounded-lg border bg-background p-6 shadow-floating">
                  <div className="mb-4 flex items-center justify-between border-b pb-4">
                    <span className="eyebrow text-primary">
                      Three countries. A world of discovery.
                    </span>
                    <Link
                      href="/destinations"
                      onClick={closeMenu}
                      className="text-sm underline underline-offset-4"
                    >
                      All destinations
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-5">
                    {destinationGroups.map((group) => (
                      <div key={group.slug}>
                        <p className="px-3 font-display text-xl">
                          {group.name}
                        </p>
                        <ul className="mt-3">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <NavigationMenu.Link asChild>
                                <Link
                                  href={link.href}
                                  className={menuLink}
                                  onClick={closeMenu}
                                >
                                  {link.label}
                                </Link>
                              </NavigationMenu.Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item className="relative" value="experiences">
              <NavigationMenu.Trigger
                className={cn(
                  navItem,
                  (pathname.startsWith("/tours") ||
                    pathname === "/experiences") &&
                    "underline decoration-gold decoration-2 underline-offset-8",
                )}
              >
                Tours &amp; Experiences{" "}
                <ChevronDown aria-hidden="true" className="size-3.5" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full left-0 w-72 pt-4 text-cocoa">
                <div className="rounded-lg border bg-background p-3 shadow-floating">
                  <ul>
                    {experienceLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenu.Link asChild>
                          <Link
                            href={link.href}
                            className={menuLink}
                            onClick={closeMenu}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            {mainLinks.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      navItem,
                      (pathname === link.href ||
                        pathname.startsWith(`${link.href}/`)) &&
                        "underline decoration-primary decoration-2 underline-offset-8",
                    )}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <Button asChild className="hidden xl:inline-flex">
          <Link href="/request-a-quote">
            Request a Quote <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
        <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
          <DrawerTrigger asChild>
            <Button
              aria-label="Open navigation"
              variant="ghost"
              size="icon"
              className="border border-current/30 hover:bg-sand hover:text-cocoa xl:hidden"
            >
              <Menu aria-hidden="true" className="size-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-full max-w-[420px] sm:w-full">
            <DrawerHeader className="border-b px-6 py-6">
              <DrawerTitle className="font-display text-2xl">
                Explore AMAJO
              </DrawerTitle>
              <DrawerDescription>
                Essence of Africa · Rwanda, Uganda &amp; Kenya
              </DrawerDescription>
            </DrawerHeader>
            <nav aria-label="Mobile navigation" className="px-6 pb-8">
              <Link
                href="/"
                className="block min-h-11 py-3 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <details className="border-y">
                <summary className="flex min-h-12 cursor-pointer items-center justify-between py-3 font-medium">
                  Destinations{" "}
                  <ChevronDown aria-hidden="true" className="size-4" />
                </summary>
                <Link
                  href="/destinations"
                  className={menuLink}
                  onClick={() => setMobileOpen(false)}
                >
                  All destinations
                </Link>
                {destinationGroups.map((group) => (
                  <details key={group.slug} className="ml-3 border-t">
                    <summary className="min-h-11 cursor-pointer py-3 font-display text-lg">
                      {group.name}
                    </summary>
                    <ul className="pb-3">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={menuLink}
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </details>
              <details className="border-b">
                <summary className="flex min-h-12 cursor-pointer items-center justify-between py-3 font-medium">
                  Tours &amp; Experiences{" "}
                  <ChevronDown aria-hidden="true" className="size-4" />
                </summary>
                <ul className="pb-3">
                  {experienceLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={menuLink}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
              {mainLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="block min-h-11 border-b py-3 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-6 w-full">
                <Link
                  href="/request-a-quote"
                  onClick={() => setMobileOpen(false)}
                >
                  Request a Quote <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
            </nav>
          </DrawerContent>
        </Drawer>
      </Container>
    </header>
  );
}
