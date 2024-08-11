<script setup lang="ts">
const { showTarget, isRunning, isMuted, startGame, onMouseDown, targetStyle } =
  useGame();

const settings = useSettings();
</script>

<template>
  <div
    class="flex size-full cursor-pointer items-center justify-center"
    @mousedown="onMouseDown"
  >
    <Start v-if="!isRunning" @on-start="startGame" />
    <Target
      v-if="showTarget"
      :size="settings.width"
      class="absolute -translate-x-1/2 -translate-y-1/2"
      :style="targetStyle"
    />
    <VolumeControl :is-muted @click="isMuted = !isMuted" />
  </div>
</template>
