import type { StyleValue } from "vue";

export const useGame = () => {
  const isRunning = ref(false);
  const showTarget = ref(false);
  const targetPosition = ref<{ x: number; y: number }>();
  const isMuted = ref(false);

  const borderWidth = 10;

  const windowSize = useWindowSize();
  const settings = useSettings();
  const hitsound = useSound("/sounds/hitsound.wav", {
    volume: 0.05,
  });

  function startGame() {
    isRunning.value = true;
    targetPosition.value = getRandomPosition();
    showTarget.value = true;
  }

  function getRandomPosition() {
    const targetRadius = settings.value.width / 2;
    const offset = targetRadius + borderWidth;

    const x = offset + getRandomNumber(windowSize.width.value - offset * 2);
    const y = offset + getRandomNumber(windowSize.height.value - offset * 2);

    return { x, y };
  }

  function getRandomNumber(max: number) {
    return Math.round(Math.random() * max);
  }

  function onMouseDown(event: MouseEvent) {
    const distance = getDistance(event.clientX, event.clientY);

    if (distance <= settings.value.width / 2) {
      if (!isMuted.value) {
        hitsound.play();
      }

      targetPosition.value = getRandomPosition();
    }
  }

  function getDistance(x: number, y: number) {
    if (!targetPosition.value) {
      throw new Error("Target position is not defined");
    }

    return Math.sqrt(
      Math.pow(Math.abs(x - targetPosition.value.x), 2) +
        Math.pow(Math.abs(y - targetPosition.value.y), 2),
    );
  }

  const targetStyle = computed<StyleValue>(() => {
    if (!targetPosition.value) return;

    return {
      left: `${targetPosition.value.x}px`,
      top: `${targetPosition.value.y}px`,
    };
  });

  return {
    isRunning: readonly(isRunning),
    showTarget: readonly(showTarget),
    isMuted,
    startGame,
    onMouseDown,
    targetStyle,
  };
};
