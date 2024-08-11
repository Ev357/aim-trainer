import type { StyleValue } from "vue";
import { nanoid } from "nanoid";

type Target = {
  position: { x: number; y: number };
  width: number;
  clickable: boolean;
  id: string;
};

export const useGame = () => {
  const isRunning = ref(false);
  const targets = ref(new Set<Target>());
  const isMuted = ref(false);

  const windowSize = useWindowSize();
  const settings = useSettings();
  const hitsound = useSound("/sounds/hitsound.wav", {
    volume: 0.05,
  });

  const advanceMode = computed(() => settings.value.inAdvance > 0);

  function startGame() {
    isRunning.value = true;

    for (let i = 0; i < settings.value.inAdvance + 1; i++) {
      targets.value.add({
        position: getRandomPosition(),
        width: settings.value.width,
        clickable: i === 0,
        id: nanoid(),
      });
    }
  }

  function getRandomPosition() {
    const targetRadius = settings.value.width / 2;
    const offset = targetRadius + settings.value.borderWidth;

    const x = offset + getRandomNumber(windowSize.width.value - offset * 2);
    const y = offset + getRandomNumber(windowSize.height.value - offset * 2);

    return { x, y };
  }

  function getRandomNumber(max: number) {
    return Math.round(Math.random() * max);
  }

  function onMouseDown(event: MouseEvent) {
    const target = Array.from(targets.value.values()).find((target) => {
      if (!target.clickable) {
        return false;
      }

      const distance = getDistance(target, event.clientX, event.clientY);

      if (distance <= settings.value.width / 2) {
        return true;
      }
    });

    if (!target) return;

    if (!isMuted.value) {
      hitsound.play();
    }

    if (advanceMode.value) {
      iterateClickableTargets(target);
    }

    targets.value.delete(target);

    targets.value.add({
      position: getRandomPosition(),
      width: settings.value.width,
      clickable: !advanceMode.value,
      id: nanoid(),
    });
  }

  function getDistance(target: Pick<Target, "position">, x: number, y: number) {
    return Math.sqrt(
      Math.pow(Math.abs(x - target.position.x), 2) +
        Math.pow(Math.abs(y - target.position.y), 2),
    );
  }

  function getTargetStyle(target: Pick<Target, "position">) {
    const style: StyleValue = {
      left: `${target.position.x}px`,
      top: `${target.position.y}px`,
    };

    return style;
  }

  function iterateClickableTargets(target: Target) {
    let found = false;
    const nextTarget = Array.from(targets.value.values()).find((t) => {
      if (found) {
        return true;
      }

      if (t === target) {
        found = true;
        return false;
      }
    });

    if (!nextTarget) {
      throw new Error("Next target not found");
    }

    nextTarget.clickable = true;
  }

  return {
    isRunning: readonly(isRunning),
    isMuted,
    startGame,
    onMouseDown,
    getTargetStyle,
    advanceMode,
    targets,
  };
};
