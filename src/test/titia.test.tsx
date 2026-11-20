import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Titia } from "@/components/Titia";

describe("Lúcia guide", () => {
  it("uses the new name and has no blush marks", () => {
    const { container } = render(<Titia mood="wave" />);
    expect(screen.getByRole("img", { name: "Lúcia, sua guia no campus" })).toBeInTheDocument();
    expect(container.querySelectorAll(".prof-blush")).toHaveLength(0);
  });
});
