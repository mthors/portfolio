import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">
        <Badge variant="accent" className="mb-4">
          404 &bull; NOT FOUND
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-(--text-primary)">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md text-sm sm:text-base text-(--text-secondary) leading-relaxed">
          The path you requested does not exist or may have been relocated.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button variant="primary" size="md" href="/">
            Return Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
