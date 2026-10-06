import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/health/route";

describe("Health Check API Route", () => {
  it("returns status 200 with healthy state", async () => {
    const response = GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe("healthy");
    expect(typeof data.uptime).toBe("number");
    expect(typeof data.timestamp).toBe("string");
  });
});
