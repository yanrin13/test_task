<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";

const bookingStore = useBookingStore();
</script>

<template>
  <BookingForm v-if="!bookingStore.isConfirmed" />

  <ConfirmationScreen v-else />
</template>
