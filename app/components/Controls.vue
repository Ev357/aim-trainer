<script setup lang="ts">
const emit = defineEmits<{
  end: [value: MouseEvent | KeyboardEvent];
}>();

onKeyStroke("Escape", (event) => {
  emit("end", event);
});
</script>

<template>
  <div class="absolute left-4 top-4">
    <UButton variant="outline" @mousedown="$emit('end', $event)">End</UButton>
  </div>
</template>
