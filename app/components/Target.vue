<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  size: number;
  class?: HTMLAttributes["class"];
  style?: HTMLAttributes["style"];
}>();
</script>

<template>
  <div
    :class="
      cn('relative flex items-center justify-center rounded-full', props.class)
    "
    :style="[
      {
        width: `${size}px`,
        height: `${size}px`,
      },
      style,
    ]"
  >
    <div
      class="absolute size-full rounded-full border-2 border-foreground"
    ></div>
    <div
      class="absolute size-2/3 rounded-full border-2 border-foreground"
    ></div>
    <div
      class="absolute size-1/3 rounded-full border-2 border-foreground"
    ></div>
    <div class="absolute h-full border-r-2 border-foreground"></div>
    <div class="absolute w-full border-b-2 border-foreground"></div>
  </div>
</template>
