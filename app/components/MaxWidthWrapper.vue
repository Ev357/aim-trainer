<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div class="flex min-h-svh w-full justify-center px-4">
    <div
      :class="
        cn('flex w-full max-w-3xl flex-col items-center pt-24', props.class)
      "
    >
      <slot />
    </div>
  </div>
</template>
