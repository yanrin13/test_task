export function useBookingValidation() {
  // ------------------- валидация номера телефона -------------------
  function validatePhone(value: string): string | null {
    const digits = value.replace(/\D/g, "");

    if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) {
      return null;
    }

    return "Введите корректный номер: +7 или 8, 10 цифр";
  }

  // ------------------- валидация имени -------------------
  function validateName(value: string): string | null {
    if (value.trim().length >= 2 && /^[А-Яа-яЁёA-Za-z\s]+$/.test(value)) {
      return null;
    }

    return "Имя должно содержать минимум 2 буквы";
  }

  // ------------------- валидация даты-------------------
  function validateDate(value: string): string | null {
    if (!value) {
      return "Выберите дату";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(`${value}T00:00:00`);

    if (selectedDate < today) {
      return "Дата не может быть раньше сегодняшнего дня";
    }

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 90);

    if (selectedDate > maxDate) {
      return "Дата не может быть позднее чем через 90 дней";
    }

    return null;
  }

  // ------------------- валидация времени -------------------
  function validateTime(value: string, date: string): string | null {
    if (!value) {
      return "Выберите время";
    }

    if (!date) {
      return null;
    }

    const today = new Date();
    const selectedDate = new Date(`${date}T00:00:00`);

    today.setHours(0, 0, 0, 0);
    if (selectedDate.getTime() !== today.getTime()) {
      return null;
    }

    const now = new Date();
    const [hours, minutes] = value.split(":").map(Number);

    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    if (selectedTime < now) {
      return "Для сегодняшней даты время не может быть раньше текущего";
    }

    return null;
  }

  return {
    validateName,
    validatePhone,
    validateDate,
    validateTime,
  };
}
