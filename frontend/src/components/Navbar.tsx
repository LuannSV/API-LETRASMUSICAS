"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "@/components/Container";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b">
      <Container className="py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold text-base sm:text-lg">
              Frontend
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline underline-offset-4">
                Home
              </Link>
              <Link href="/users" className="hover:underline underline-offset-4">
                Users
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 p-2"
              aria-label="Abrir menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        {open ? (
          <div className="md:hidden mt-3 flex flex-col gap-2 text-sm">
            <Link href="/" className="py-2 border-b border-black/10 dark:border-white/15">Home</Link>
            <Link href="/users" className="py-2">Users</Link>
          </div>
        ) : null}
      </Container>
    </header>
  );
}

