"use client";

import { Menu } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { destinations } from "@/lib/destinations";

export function SiteMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="site-menu-trigger" aria-label="Open site menu">
        <span>Menu</span><Menu size={18} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="site-menu-content" align="end" sideOffset={10}>
        <DropdownMenuItem asChild><a href="/">Home</a></DropdownMenuItem>
        {destinations.map(item => (
          <DropdownMenuItem key={item.id} asChild>
            <a href={`/${item.id}`}><span className="menu-number">{item.number}</span>{item.label}</a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
