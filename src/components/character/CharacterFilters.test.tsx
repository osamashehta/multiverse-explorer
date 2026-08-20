import { describe, expect, it } from "vitest";
import { buildCharacterFilterUrl } from "./CharacterFilters";

describe("buildCharacterFilterUrl", () => {
  it("omits empty filter values", () => {
    expect(
      buildCharacterFilterUrl({
        name: "",
        status: "Alive",
        species: "",
      }),
    ).toBe("/?status=Alive");
  });

  it("trims and encodes the name filter", () => {
    expect(
      buildCharacterFilterUrl({
        name: "  Rick Sanchez  ",
        species: "Mythological Creature",
      }),
    ).toBe("/?name=Rick+Sanchez&species=Mythological+Creature");
  });

  it("returns the homepage when no filters are active", () => {
    expect(buildCharacterFilterUrl({})).toBe("/");
  });
});
