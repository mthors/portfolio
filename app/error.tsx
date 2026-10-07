"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime application error:", error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">
        <Badge variant="warning" className="mb-4">
          SYSTEM NOTICE &bull; APPLICATION ERROR
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-(--text-primary)">
          Something Went Wrong
        </h1>
        <p className="mt-4 max-w-md text-sm sm:text-base text-(--text-secondary) leading-relaxed">
          An unexpected runtime error occurred while processing this page. Please try refreshing or
          return to the home page.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" size="md" onClick={() => reset()}>
            Try Again
          </Button>
          <Button variant="secondary" size="md" href="/">
            Return Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
