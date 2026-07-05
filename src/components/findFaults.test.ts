import { describe, expect, it } from "vitest";
import { findFaults } from "./Letter";

const VALID = {
  name: "Test Sender",
  email: "sender@example.com",
  message: "A message long enough to pass validation.",
};

describe("findFaults", () => {
  it("passes fully valid input with no faults", () => {
    expect(findFaults(VALID.name, VALID.email, VALID.message)).toEqual({});
  });

  describe("name boundaries", () => {
    it("rejects an empty name", () => {
      expect(findFaults("", VALID.email, VALID.message)).toEqual({ name: true });
    });
    it("rejects a single-character name", () => {
      expect(findFaults("J", VALID.email, VALID.message)).toEqual({ name: true });
    });
    it("rejects a name that trims below two characters", () => {
      expect(findFaults("  J  ", VALID.email, VALID.message)).toEqual({ name: true });
    });
    it("accepts exactly two characters (the boundary)", () => {
      expect(findFaults("Jo", VALID.email, VALID.message)).toEqual({});
    });
  });

  describe("email regex", () => {
    const good = [
      "user@example.com",
      "user+tag@sub.domain.org",
      "a@b.co",
      "  padded@example.com  ", // trimmed before testing
    ];
    const bad = [
      "",
      "plainaddress",
      "@example.com", // no local part
      "user@", // no domain
      "user@example", // no dot in domain
      "user@example.", // nothing after the dot
      "user name@example.com", // space in local part
      "user@exa mple.com", // space in domain
      "user@@example.com", // double at
      "user@one@two.com", // second at
    ];
    for (const email of good) {
      it(`accepts ${JSON.stringify(email)}`, () => {
        expect(findFaults(VALID.name, email, VALID.message)).toEqual({});
      });
    }
    for (const email of bad) {
      it(`rejects ${JSON.stringify(email)}`, () => {
        expect(findFaults(VALID.name, email, VALID.message)).toEqual({ email: true });
      });
    }
  });

  describe("message boundaries", () => {
    it("rejects nine characters", () => {
      expect(findFaults(VALID.name, VALID.email, "123456789")).toEqual({ message: true });
    });
    it("accepts exactly ten characters (the boundary)", () => {
      expect(findFaults(VALID.name, VALID.email, "1234567890")).toEqual({});
    });
    it("rejects padding that trims below ten characters", () => {
      expect(findFaults(VALID.name, VALID.email, "   short    ")).toEqual({ message: true });
    });
  });

  it("reports all faults at once for fully invalid input", () => {
    expect(findFaults("", "nope", "short")).toEqual({
      name: true,
      email: true,
      message: true,
    });
  });
});
