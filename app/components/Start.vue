<script setup lang="ts">
defineProps<{
  size: number;
}>();
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Target :size />
    <p class="text-2xl">Click the target to begin</p>
  </div>
</template>
