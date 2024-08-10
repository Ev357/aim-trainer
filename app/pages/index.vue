<script setup lang="ts">
const {
  showTarget,
  isRunning,
  isMuted,
  startGame,
  onMouseDown,
  targetSize,
  targetStyle,
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
      :style="targetStyle"
    />
    <VolumeControl :is-muted @click="isMuted = !isMuted" />
  </div>
</template>
