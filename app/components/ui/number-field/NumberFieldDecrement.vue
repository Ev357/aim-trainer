<script setup lang="ts">
import type { NumberFieldDecrementProps } from "radix-vue";
import { NumberFieldDecrement, useForwardProps } from "radix-vue";
import { type HTMLAttributes, computed } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<
  NumberFieldDecrementProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <NumberFieldDecrement
    data-slot="decrement"
    v-bind="forwarded"
    :class="
      cn(
        'absolute left-0 top-1/2 flex -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20',
        props.class,
      )
    "
  >
    <slot>
      <span class="i-lucide-minus size-4 shrink-0"></span>
    </slot>
  </NumberFieldDecrement>
</template>
