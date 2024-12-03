<script setup lang="ts">
const {
  state,
  isMuted,
  startGame,
  endGame,
  clearGame,
  playAgain,
  onMouseDown,
  handleKeyDown,
  targets,
  getTargetStyle,
  advanceMode,
  accuracy,
  timePerTarget,
} = useGame();

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <Start v-if="state === 'default'" @on-start="startGame" />
  <Results
    v-if="state === 'end'"
    :accuracy
    :time-per-target
    @back="clearGame"
    @play-again="playAgain"
  />
  <div
    v-if="state === 'running'"
    class="flex size-full cursor-pointer items-center justify-center"
    @mousedown="onMouseDown"
  >
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
    <Stats :accuracy :is-running="state === 'running'" :time-per-target />
    <Controls @end="endGame" />
    <VolumeControl :is-muted @click="isMuted = !isMuted" />
  </div>
</template>
