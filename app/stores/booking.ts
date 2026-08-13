import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import type { BookingForm } from "~/types/booking";

export const useBookingStore = defineStore("booking", () => {
  const booking = reactive<BookingForm>({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
  });

  const isConfirmed = ref(false);

  function confirmBooking() {
    isConfirmed.value = true;
  }

  function resetBooking() {
    Object.assign(booking, {
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
    });

    isConfirmed.value = false;
  }

  return {
    booking,
    isConfirmed,
    confirmBooking,
    resetBooking,
  };
});

// реализация хранилища для pinia
