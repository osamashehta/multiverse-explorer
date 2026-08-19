import { describe, expect, it } from "vitest";
import { buildCharacterFilterUrl } from "@/components/character/CharacterFilters";
import { handlePagination } from "@/components/layout/Pagination";

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

describe("handlePagination", () => {
  it("preserves active filters while changing page", () => {
    expect(
      handlePagination(
        { name: "Rick", status: "Alive", species: "Human", page: "1" },
        2,
      ),
    ).toBe("/?name=Rick&status=Alive&species=Human&page=2");
  });

  it("removes the page parameter when returning to page one", () => {
    expect(
      handlePagination(
        { name: "Rick", status: "Alive", page: "2" },
        1,
      ),
    ).toBe("/?name=Rick&status=Alive");
  });

  it("returns the homepage when no filters or page are active", () => {
    expect(handlePagination({}, 1)).toBe("/");
  });
});
