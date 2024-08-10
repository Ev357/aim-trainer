<script setup lang="ts">
const {
  showTarget,
  isRunning,
  targetPosition,
  startGame,
  onMouseDown,
  targetSize,
} = useGame();
</script>

<template>
  <div
    class="flex size-full cursor-pointer items-center justify-center"
    @mousedown="onMouseDown"
  >
    <Start v-if="!isRunning" :size="targetSize" @mousedown="startGame" />
    <Target
      v-if="showTarget"
      :size="targetSize"
      class="absolute -translate-x-1/2 -translate-y-1/2"
      :style="{
        left: `${targetPosition?.x}px`,
        top: `${targetPosition?.y}px`,
      }"
    />
  </div>
</template>
