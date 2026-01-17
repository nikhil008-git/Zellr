"use client";

import * as React from "react";
import Link from "next/link";
import type { ReactElement } from "react";
import { useTheme } from "next-themes";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Vercel } from "@aliimam/logos";
import { cn } from "@/lib/utils";
import {
  Bot,
  Box,
  Calendar1,
  ChartNoAxesColumnIncreasing,
  Cpu,
  AArrowUp,
  Globe,
  LayoutGrid,
  PenTool,
  ScanText,
  Shield,
  Smile,
  Sparkle,
  BookText,
  BriefcaseBusiness,
  Code,
  Component,
  Codepen,
  Network,
  Sparkles,
  ScreenShare,
  AppWindow,
  Layers,
  Monitor, 
  Moon, 
  Sun,
  CirclePlus,
  LogOut,
} from "@aliimam/icons";
import { Button } from "@/components/ui/button"; 
import { useState, useCallback, useEffect } from "react"; 

const cloud: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "archtecture of Zellr",
    href: "#",
    icon: <Box strokeWidth={2} />,
    description: "The AI Toolkit for Typescript",
  },
  {
    title: "architecture of actual vercel",
    href: "#",
    icon: <Sparkle strokeWidth={2} />,
    description: "One endpoint, all your models",
  },
  {
    title: "personal blog",
    href: "#",
    icon: <AArrowUp strokeWidth={2} />,
    description: "An agent that knows your stack",
  },
];

const core: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "CI/CD",
    href: "#",
    icon: <LayoutGrid strokeWidth={2} />,
    description: "Helping teams ship 6× faster",
  },
  {
    title: "Content Delivery",
    href: "#",
    icon: <Globe strokeWidth={2} />,
    description: "Fast, scalable, and reliable",
  },
  {
    title: "Fluid Compute",
    href: "#",
    icon: <Cpu strokeWidth={2} />,
    description: "Servers, in serverless form",
  },
  {
    title: "Observability",
    href: "#",
    icon: <ChartNoAxesColumnIncreasing strokeWidth={2} />,
    description: "Trace every step",
  },
];

const security: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Bot Management",
    href: "#",
    icon: <Bot strokeWidth={2} />,
    description: "Scalable bot protection",
  },
  {
    title: "BotID",
    href: "#",
    icon: <ScanText strokeWidth={2} />,
    description: "Invisible CAPTCHA",
  },
  {
    title: "Platform Security",
    href: "#",
    icon: <Shield strokeWidth={2} />,
    description: "DDOS Protection, Firewall",
  },
  {
    title: "Web Application Firewall",
    href: "#",
    icon: <Calendar1 strokeWidth={2} />,
    description: "Granular, custom protection",
  },
];

const company: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Customers",
    href: "#",
    icon: <Smile strokeWidth={2} />,
    description: "Trusted by the best teams",
  },
  {
    title: "Blog",
    href: "#",
    icon: <PenTool strokeWidth={2} />,
    description: "The latest posts and changes",
  },
  {
    title: "Changelog",
    href: "#",
    icon: <BookText strokeWidth={2} />,
    description: "See what shipped",
  },
  {
    title: "Press",
    href: "#",
    icon: <BriefcaseBusiness strokeWidth={2} />,
    description: "Read the latest news",
  },
  {
    title: "Events",
    href: "#",
    icon: <Calendar1 strokeWidth={2} />,
    description: "Join us at an event",
  },
];

const open: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Next.js",
    href: "#",
    icon: <Code strokeWidth={2} />,
    description: "The native Next.js platform",
  },
  {
    title: "Nuxt",
    href: "#",
    icon: <Component strokeWidth={2} />,
    description: "The progressive web framework",
  },
  {
    title: "Svelte",
    href: "#",
    icon: <Codepen strokeWidth={2} />,
    description: "The web's efficient Ul framework",
  },
  {
    title: "Turborepo",
    href: "#",
    icon: <Network strokeWidth={2} />,
    description: "Speed with Enterprise scale",
  },
];

const tools: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Academy",
    href: "#",
    icon: <Code strokeWidth={2} />,
    description: "Learn the ins and outs of Vercel",
  },
  {
    title: "Marketplace",
    href: "#",
    icon: <Component strokeWidth={2} />,
    description: "Extend and automate workflows",
  },
  {
    title: "Templates",
    href: "#",
    icon: <Codepen strokeWidth={2} />,
    description: "Jumpstart app development",
  },
  {
    title: "Guides",
    href: "#",
    icon: <Network strokeWidth={2} />,
    description: "Find help quickly",
  },
  {
    title: "Partner Finder",
    href: "#",
    icon: <Network strokeWidth={2} />,
    description: "Get help from solution partners",
  },
];

const cases: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "why not deployed",
    href: "#",
    icon: <Component strokeWidth={2} />,
    description: "even possible to deploy",
  },
 
  {
    title: "Marketing Sites",
    href: "#",
    icon: <ScreenShare strokeWidth={2} />,
    description: "Jumpstart app development",
  },
  {
    title: "Multi-tenant Platforms",
    href: "#",
    icon: <Network strokeWidth={2} />,
    description: "Scale apps with one codebase",
  },
  {
    title: "Web Apps",
    href: "#",
    icon: <AppWindow strokeWidth={2} />,
    description: "Ship features, not infrastructure",
  },
];

const users: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Platform Engineers",
    href: "#",
    icon: <Code strokeWidth={2} />,
    description: "Automate away repetition",
  },
  {
    title: "Design Engineers",
    href: "#",
    icon: <Layers strokeWidth={2} />,
    description: "Deploy for every idea",
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`flex sticky font-mono px-4 z-50 top-0 w-full bg-background items-center h-16 justify-between transition-border duration-300 ${
        scrolled ? "border-b" : "border-b-0"
      }`}
    >
      {" "}
      <div className="flex items-center justify-between w-full  mx-auto max-w-7xl">
        <div className="flex h-14 justify-center">
          <NavigationMenu className="ml-8 hidden lg:flex" viewport={true}>
            <NavigationMenuList>
              <NavigationMenuItem>
                  <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground"
                  )}
                >
                  <Link href="/architecture">blog</Link>
                </NavigationMenuLink>
                <NavigationMenuContent className="bg-background">
                  <ul className="grid w-[100px] pt-2 grid-cols-3 md:w-[500px]">
                    <div>
                   
                 
                    </div>
                    <div>
                     
                    </div>
                    <div>
                     
                      
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
               
                <NavigationMenuContent className="bg-background">
                  <ul className="grid w-[400px] pt-2 grid-cols-3 md:w-[800px]">
                    <div>
                      <span className="p-4 text-muted-foreground">Company</span>
                      {company.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                    <div>
                      <span className="p-4 text-muted-foreground">
                        Open Source
                      </span>
                      {open.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                    <div>
                      <span className="p-4 text-muted-foreground">Tools</span>
                      {tools.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                
                <NavigationMenuContent className="bg-background">
                  <ul className="grid w-[400px] pt-2 grid-cols-2 md:w-[550px]">
                    <div>
                      <span className="p-4 text-muted-foreground">
                        Use Cases
                      </span>
                      {cases.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                    <div>
                      <span className="p-4 text-muted-foreground">Users</span>
                      {users.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground"
                  )}
                >
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground"
                  )}
                >
                  <Link href="#">faq</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground"
                  )}
                >
                  <Link href="#">changelog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-2">
        
        <Link href='/dashboard'>  <Button variant={"outline"} size={"sm"} className="font-sans">
            Dashboard
          </Button></Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="border">
                <AvatarImage src="https://raw.githubusercontent.com/aliimam-in/templates/refs/heads/main/apps/vercel/public/ali.jpg" alt="Ali Imam" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-70 p-3 rounded-xl" align="end">
              <div className="p-2">
                <h1 className="font-semibold font-mono">Welcome</h1>
                <p className="font-monotext-sm text-muted-foreground">
                  to the zellr world
                </p>
              </div>
              <DropdownMenuGroup>
              <Link href="/dashboard">  <DropdownMenuItem className="py-3">Dashboard</DropdownMenuItem></Link>
                        <Link href="/architecture">         <DropdownMenuItem className="py-3">blog</DropdownMenuItem></Link>

                <DropdownMenuItem className="py-3 justify-between">
                  Theme <ThemeSwitcher />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  title,
  icon,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon: ReactElement;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild className="hover:bg-transparent">
        <Link href={href}>
          <div className="flex gap-3 items-start rounded-md p-2">
            <div className="border rounded-sm p-2 icon-container">{icon}</div>
            <div className="text-container">
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="text-muted-foreground line-clamp-2 pt-1 text-xs leading-snug">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>

      <style jsx>{`
        li:hover .icon-container {
          background-color: var(--foreground);
          color: var(--background);
          transform: scale(1.05);
          transition: all 0.2s ease;
        }

        li:hover .text-container .text-sm {
          color: var(--foreground); /* Change title color on hover */
          transition: color 0.2s ease;
        }

        li:hover .text-container p {
          color: var(--foreground); /* Change description color on hover */
          transition: color 0.2s ease;
        }
      `}</style>
    </li>
  );
}



const themes = [
  {
    key: "system",
    icon: Monitor,
    label: "System theme",
  },
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
  },
];

export type ThemeSwitcherProps = {
  value?: "light" | "dark" | "system";
  onChange?: (theme: "light" | "dark" | "system") => void;
  defaultValue?: "light" | "dark" | "system";
  className?: string;
};

const ThemeSwitcher = ({ 
  className,
}: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark" | "system") => {
      setTheme(themeKey);
    },
    [setTheme]
  );

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative isolate flex h-7 rounded-full bg-background p-1 ring-1 ring-border",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative h-5 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key as "light" | "dark" | "system")}
            type="button"
          >
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-secondary" />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-3.5 w-3.5",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
