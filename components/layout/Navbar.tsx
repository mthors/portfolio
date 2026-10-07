"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-(--border) bg-(--bg-primary)/90 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group font-mono text-base font-bold tracking-tight text-(--text-primary)"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded bg-(--surface) border border-(--border) text-(--accent) group-hover:border-(--accent) transition-colors">
              M
            </span>
            <span className="group-hover:text-(--accent) transition-colors">
              MTS<span className="text-(--accent)">.dev</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative py-1 text-sm font-medium text-(--text-secondary) hover:text-(--accent) transition-colors duration-150 focus:outline-none focus:text-(--accent) group"
              >
                <span>{item.label}</span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-(--accent) transition-all duration-200 group-hover:w-full motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="primary" size="sm" href="#contact">
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--surface) focus:outline-none focus:ring-2 focus:ring-(--accent)"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-b border-(--border) bg-(--bg-secondary) px-4 pt-2 pb-6 space-y-3 animate-hero-1 motion-reduce:animate-none"
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-base font-medium text-(--text-secondary) hover:text-(--accent) hover:bg-(--surface) transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
