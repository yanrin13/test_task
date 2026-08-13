<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import type { BookingForm } from "~/types/booking";
import { storeToRefs } from "pinia";
import { useBookingStore } from "~/stores/booking";
import gsap from "gsap";

const bookingStore = useBookingStore();

const { booking: form } = storeToRefs(bookingStore);

const { validateName, validatePhone, validateDate, validateTime } =
  useBookingValidation();

function baseValidate(): boolean {
  errors.name = validateName(form.value.name) ?? "";
  errors.phone = validatePhone(form.value.phone) ?? "";
  errors.date = validateDate(form.value.date) ?? "";
  errors.time = validateTime(form.value.time, form.value.date) ?? "";

  return !errors.name && !errors.phone && !errors.date && !errors.time;
}

const isConfirmed = ref(false);
const errors = reactive<Partial<Record<keyof BookingForm, string>>>({});
const isSubmitting = ref(false);

const timeSlots = Array.from({ length: 11 }, (_, i) => {
  const hour = 12 + i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

function incrementGuests() {
  if (form.value.guests < 12) form.value.guests++;
}

function decrementGuests() {
  if (form.value.guests > 1) form.value.guests--;
}

function validateField(field: keyof BookingForm) {
  if (!form.value[field]) {
    errors[field] = "Укажите данные";
  } else {
    errors[field] = "";
  }
}

async function onSubmit() {
  if (!baseValidate()) return;
  isSubmitting.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    bookingStore.confirmBooking();
    console.log("Booking data:", { ...form });
    isConfirmed.value = true;
  } catch (error) {
    console.error("Ошибка:", error);
  } finally {
    isSubmitting.value = false;
  }
}

const formContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!formContainer.value) return;

  const fields = formContainer.value.querySelectorAll(".booking-form__field");

  gsap.from(formContainer.value.querySelector(".booking-form__title"), {
    opacity: 0,
    y: 15,
    duration: 0.5,
    ease: "power2.out",
  });

  gsap.from(fields, {
    opacity: 0,
    y: 10,
    duration: 0.4,
    stagger: 0.06,
    delay: 0.1,
    ease: "power2.out",
  });

  gsap.from(formContainer.value.querySelector(".booking-form__submit"), {
    opacity: 0,
    y: 8,
    duration: 0.4,
    delay: 0.4,
    ease: "power2.out",
  });
});
</script>

<template>
  <div class="booking-form" ref="formContainer">
    <h1 class="booking-form__title">Забронировать столик</h1>

    <form class="booking-form__form" @submit.prevent="onSubmit" novalidate>
      <div class="booking-form__field" ref="formContainer">
        <label class="booking-form__label" for="name">Имя гостя</label>
        <input
          id="name"
          class="booking-form__input"
          v-model.trim="form.name"
          type="text"
          placeholder="Ваше имя"
          required
          autocomplete="name"
          @blur="validateField('name')"
        />
        <span v-if="errors.name" class="booking-form__error">{{
          errors.name
        }}</span>
      </div>

      <div class="booking-form__field" ref="formContainer">
        <label class="booking-form__label" for="phone">Телефон</label>
        <input
          id="phone"
          class="booking-form__input"
          v-model.trim="form.phone"
          type="tel"
          placeholder="+7 900 000-00-00"
          required
          autocomplete="tel"
          @blur="validateField('phone')"
        />
        <span v-if="errors.phone" class="booking-form__error">{{
          errors.phone
        }}</span>
      </div>

      <div class="booking-form__field" ref="formContainer">
        <label class="booking-form__label" for="date">Дата</label>
        <input
          id="date"
          class="booking-form__input"
          v-model="form.date"
          type="date"
          :min="minDate"
          required
          @blur="validateField('date')"
        />
        <span v-if="errors.date" class="booking-form__error">{{
          errors.date
        }}</span>
      </div>

      <div class="booking-form__field" ref="formContainer">
        <label class="booking-form__label" for="time">Время</label>
        <select
          id="time"
          class="booking-form__select"
          v-model="form.time"
          required
          @blur="validateField('time')"
        >
          <option value="" disabled>Выберите время</option>
          <option v-for="slot in timeSlots" :key="slot" :value="slot">
            {{ slot }}
          </option>
        </select>
        <span v-if="errors.time" class="booking-form__error">{{
          errors.time
        }}</span>
      </div>

      <div class="booking-form__field" ref="formContainer">
        <label class="booking-form__label">Количество гостей</label>
        <div class="booking-form__stepper">
          <button
            type="button"
            class="booking-form__stepper-btn"
            :disabled="form.guests <= 1"
            @click="decrementGuests"
            aria-label="Меньше"
          >
            −
          </button>
          <span class="booking-form__stepper-value">{{ form.guests }}</span>
          <button
            type="button"
            class="booking-form__stepper-btn"
            :disabled="form.guests >= 12"
            @click="incrementGuests"
            aria-label="Больше"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="booking-form__submit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Отправка…" : "Забронировать" }}
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "./BookingForm.scss";
</style>
