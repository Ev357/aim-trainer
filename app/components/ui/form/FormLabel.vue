<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import type { LabelProps } from "radix-vue";
import { useFormField } from "./useFormField";
import { cn } from "@/lib/utils";

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const { error, formItemId } = useFormField();
</script>

<template>
  <ULabel
    :class="cn(error && 'text-destructive', props.class)"
    :for="formItemId"
  >
    <slot />
  </ULabel>
</template>
