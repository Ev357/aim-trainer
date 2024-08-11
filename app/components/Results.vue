<script setup lang="ts">
defineProps<{
  accuracy?: number;
}>();

defineEmits<{
  back: [value: MouseEvent];
  playAgain: [value: MouseEvent];
}>();
</script>

<template>
  <MaxWidthWrapper class="items-start gap-2">
    <p class="w-full text-center text-4xl">Results</p>
    <div class="pt-24">
      <p v-if="accuracy !== undefined" class="text-xl">
        Accuracy: {{ accuracy }}
      </p>
    </div>
    <div class="flex w-full justify-between pt-10">
      <UButton variant="outline" size="lg" @mousedown="$emit('back', $event)">
        Back
      </UButton>
      <UButton
        variant="outline"
        size="lg"
        @mousedown="$emit('playAgain', $event)"
      >
        Play again
      </UButton>
    </div>
  </MaxWidthWrapper>
</template>
