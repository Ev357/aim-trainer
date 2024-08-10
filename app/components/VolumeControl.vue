<script setup lang="ts">
defineProps<{
  isMuted: boolean;
}>();
</script>

<template>
  <div class="absolute bottom-4 left-4">
    <span v-show="!isMuted" class="i-lucide-volume-2 size-6 shrink-0"></span>
    <span v-show="isMuted" class="i-lucide-volume-x size-6 shrink-0"></span>
  </div>
</template>
