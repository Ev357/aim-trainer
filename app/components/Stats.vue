<script setup lang="ts">
defineProps<{
  accuracy: number | undefined;
  timePerTarget: number | undefined;
  isRunning: boolean;
}>();
</script>

<template>
  <div v-if="isRunning" class="absolute right-4 top-4">
    <p v-if="accuracy !== undefined">Accuracy: {{ accuracy }}</p>
    <p v-if="timePerTarget !== undefined">
      Time per target: {{ timePerTarget }}
    </p>
  </div>
</template>
