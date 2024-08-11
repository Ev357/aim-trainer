<script setup lang="ts">
const {
  isRunning,
  isMuted,
  startGame,
  onMouseDown,
  targets,
  getTargetStyle,
  getTargetClasses,
} = useGame();
</script>

<template>
  <div
    class="flex size-full cursor-pointer items-center justify-center"
    @mousedown="onMouseDown"
  >
    <Start v-if="!isRunning" @on-start="startGame" />
    <Target
      v-for="target in targets"
      :key="String(target)"
      :size="target.width"
      :class="getTargetClasses(target)"
      :style="getTargetStyle(target)"
    />
    <VolumeControl :is-muted @click="isMuted = !isMuted" />
  </div>
</template>
