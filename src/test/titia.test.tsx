import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Belinho, GUIDE_NAME, Titia } from "@/components/Titia";

describe("Belinho guide", () => {
  it("uses the Belinho name and exposes the legacy Titia alias", () => {
    expect(GUIDE_NAME).toBe("Belinho");
    const { container } = render(<Titia mood="wave" />);
    expect(screen.getByRole("img", { name: "Belinho, seu guia no campus" })).toBeInTheDocument();
    expect(container.querySelector(".prof-wave .prof-wing-right")).toBeInTheDocument();
    expect(container.querySelectorAll(".prof-arm")).toHaveLength(0);
  });

  it("raises both wings to celebrate and looks upward when thinking", () => {
    const { container, rerender } = render(<Belinho mood="cheer" />);
    expect(container.querySelector(".prof-cheer .prof-wing-left")).toBeInTheDocument();
    expect(container.querySelector(".prof-cheer .prof-wing-right")).toBeInTheDocument();

    rerender(<Belinho mood="think" />);
    expect(container.querySelector('[cy="111"]')).toBeInTheDocument();
  });

  it("winks with one eye", () => {
    const { container } = render(<Belinho mood="wink" />);
    expect(container.querySelector(".prof-wink .prof-eyes")).toBeInTheDocument();
    expect(container.querySelector(".prof-wink path[d^='M130 118']")).toBeInTheDocument();
  });
});
