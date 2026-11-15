import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { checkIn, useProgress } from "@/data/progress";
import { missions } from "@/data/school";

describe("corrected exploration missions", () => {
  beforeEach(() => localStorage.clear());

  it("a library check-in completes the new library mission and survives reopening", () => {
    const first = renderHook(() => useProgress());
    act(() => checkIn("biblioteca"));
    expect(first.result.current.done.map((m) => m.place)).toEqual(["biblioteca"]);
    first.unmount();
    const reopened = renderHook(() => useProgress());
    expect(reopened.result.current.visited).toEqual(["biblioteca"]);
    expect(reopened.result.current.done.map((m) => m.place)).toEqual(["biblioteca"]);
    reopened.unmount();
  });

  it("retains existing check-ins when school locations are corrected", () => {
    localStorage.setItem("tour-etec-checkins", JSON.stringify(["secretaria", "lab1"]));
    const state = renderHook(() => useProgress());
    expect(state.result.current.done.map((m) => m.id)).toEqual(["m-secretaria", "m-lab1"]);
    state.unmount();
  });

  it("awards the explorer badge only after every mission destination, including the library, is visited", () => {
    const state = renderHook(() => useProgress());
    act(() => {
      missions.filter((m) => m.place !== "biblioteca").forEach((m) => checkIn(m.place));
    });
    expect(state.result.current.badge).toBe(false);
    act(() => checkIn("biblioteca"));
    expect(state.result.current.badge).toBe(true);
    state.unmount();
  });
});