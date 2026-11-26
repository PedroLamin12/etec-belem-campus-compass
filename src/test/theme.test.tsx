import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { THEME_BAR, themeScript, useTheme } from "@/lib/theme";

describe("theme configuration", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
    document.head.querySelector('meta[name="theme-color"]')?.remove();
    document.head.insertAdjacentHTML("beforeend", '<meta name="theme-color" content="#f8fafc">');
  });

  it("updates the browser color scheme and Android theme color when toggled", () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggle());
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(document.head.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      THEME_BAR.dark,
    );

    act(() => result.current.toggle());
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(document.head.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      THEME_BAR.light,
    );
  });

  it("sets the saved theme and color scheme before the first paint", () => {
    expect(themeScript).toContain("document.documentElement.style.colorScheme=d?'dark':'light'");
    expect(themeScript).toContain(THEME_BAR.dark);
    expect(themeScript).toContain(THEME_BAR.light);
  });
});
