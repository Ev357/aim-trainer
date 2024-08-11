<script setup lang="ts">
defineEmits<{
  onStart: [value: MouseEvent];
}>();

const settings = useSettings();
</script>

<template>
  <MaxWidthWrapper class="justify-center pt-0">
    <Target :size="settings.width" @mousedown="$emit('onStart', $event)" />
    <p class="absolute bottom-4 text-2xl">Click the target to begin</p>
    <UButton as-child variant="outline">
      <NuxtLink class="absolute bottom-4 right-4" to="/settings">
        Settings
      </NuxtLink>
    </UButton>
  </MaxWidthWrapper>
</template>
