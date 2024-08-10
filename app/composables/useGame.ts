export const useGame = () => {
  const isRunning = ref(false);
  const showTarget = ref(false);
  const targetPosition = ref<{ x: number; y: number }>();

  const targetSize = 100;

  const windowSize = useWindowSize();

  function startGame() {
    isRunning.value = true;
    targetPosition.value = getRandomPosition();
    showTarget.value = true;
  }

  function getRandomPosition() {
    const getRandomNumber = (max: number) => Math.round(Math.random() * max);

    const x = getRandomNumber(windowSize.width.value);
    const y = getRandomNumber(windowSize.height.value);

    return { x, y };
  }

  function onMouseDown(event: MouseEvent) {
    const distance = getDistance(event.clientX, event.clientY);

    console.log(distance);

    if (distance <= targetSize / 2) {
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

  return {
    isRunning,
    showTarget,
    targetPosition,
    startGame,
    onMouseDown,
    targetSize,
  };
};
