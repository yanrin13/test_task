<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";

const bookingStore = useBookingStore();

function reset() {
  bookingStore.resetBooking();
}
</script>

<template>
  <div class="confirmation-screen">
    <h1 class="confirmation-screen__title">Бронь оформлена</h1>

    <ul class="confirmation-screen__list">
      <li class="confirmation-screen__item">
        <span class="confirmation-screen__label">Имя</span>
        <span class="confirmation-screen__value">{{
          bookingStore.booking.name
        }}</span>
      </li>
      <li class="confirmation-screen__item">
        <span class="confirmation-screen__label">Дата</span>
        <span class="confirmation-screen__value">{{
          bookingStore.booking.date
        }}</span>
      </li>
      <li class="confirmation-screen__item">
        <span class="confirmation-screen__label">Время</span>
        <span class="confirmation-screen__value">{{
          bookingStore.booking.time
        }}</span>
      </li>
      <li class="confirmation-screen__item">
        <span class="confirmation-screen__label">Гостей</span>
        <span class="confirmation-screen__value">{{
          bookingStore.booking.guests
        }}</span>
      </li>
    </ul>

    <button type="button" class="confirmation-screen__btn" @click="reset">
      Забронировать ещё
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "./ConfirmationScreen.scss";
</style>
