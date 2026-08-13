import { describe, it, expect, vi } from "vitest";
import { useBookingValidation } from "./useBookingValidation";

const { validateName, validatePhone, validateDate, validateTime } =
  useBookingValidation();

describe("validateName", () => {
  it("возвращает null для корректного имени", () => {
    expect(validateName("Сергей")).toBeNull();
  });

  it("возвращает ошибку если имя содержит цифры или спец символы", () => {
    expect(validateName("123****")).toBe(
      "Имя должно содержать минимум 2 буквы",
    );
  });
});

describe("validatePhone", () => {
  it("возвращает null для корректного номера с +7", () => {
    expect(validatePhone("+71231234567")).toBeNull();
  });

  it("возвращает ошибку для некорректного номера", () => {
    expect(validatePhone("+79123")).toBe(
      "Введите корректный номер: +7 или 8, 10 цифр",
    );
  });
});

describe("validateDate", () => {
  it("возвращает null для сегодняшней даты", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-14T12:00:00"));

    expect(validateDate("2026-08-14")).toBeNull();
  });

  it("возвращает ошибку для даты раньше сегодняшнего дня", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-14T12:00:00"));

    expect(validateDate("2026-08-13")).toBe(
      "Дата не может быть раньше сегодняшнего дня",
    );
  });
});

describe("validateTime", () => {
  it("возвращает ошибку если время уже прошло", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-14T15:00:00"));

    expect(validateTime("14:00", "2026-08-14")).toBe(
      "Для сегодняшней даты время не может быть раньше текущего",
    );
  });

  it("возвращает null для будущего времени сегодня", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-14T15:00:00"));

    expect(validateTime("16:00", "2026-08-14")).toBeNull();
  });
});
