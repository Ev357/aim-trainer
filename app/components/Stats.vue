<script setup lang="ts">
defineProps<{
  accuracy?: number;
  isRunning: boolean;
}>();
</script>

<template>
  <div v-if="isRunning" class="absolute right-4 top-4">
    <p v-if="accuracy !== undefined">Accuracy: {{ accuracy }}</p>
  </div>
</template>
