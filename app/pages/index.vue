<script setup lang="ts">
const {
  isRunning,
  isMuted,
  startGame,
  onMouseDown,
  targets,
  getTargetStyle,
  advanceMode,
} = useGame();
</script>

<template>
  <div
    class="flex size-full cursor-pointer items-center justify-center"
    @mousedown="onMouseDown"
  >
    <div class="scale-90 transition"></div>
    <Start v-if="!isRunning" @on-start="startGame" />
    <Target
      v-for="target in targets"
      :key="target.id"
      :size="target.width"
      class="absolute -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-75 slide-in-from-left-1/2 slide-in-from-top-1/2"
      :class="{
        'ring ring-offset-[6px] ring-offset-background':
          target.clickable && advanceMode,
      }"
      :style="getTargetStyle(target)"
    />
    <VolumeControl :is-muted @click="isMuted = !isMuted" />
  </div>
</template>
