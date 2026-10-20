import React from "react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-(--border) bg-(--bg-secondary) py-12">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-mono text-sm font-semibold text-(--text-primary)">
              Moh Thoriqi Sahal
            </p>
            <p className="mt-1 text-sm text-(--text-secondary)">
              IT Engineer &amp; Software Developer. Practical solutions for real-world operations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-(--text-muted)">
            <span>&copy; {currentYear} Moh Thoriqi Sahal. All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
