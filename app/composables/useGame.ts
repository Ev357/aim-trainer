import type { StyleValue } from "vue";
import { nanoid } from "nanoid";

type Target = {
  position: { x: number; y: number };
  width: number;
  clickable: boolean;
  id: string;
};

export const useGame = () => {
  const state = ref<"default" | "running" | "end">("default");
  const targets = ref(new Set<Target>());
  const isMuted = ref(false);
  const game = useGameState();
  const mouse = useMouse({ touch: false });

  const windowSize = useWindowSize();
  const timestamp = useTimestamp();
  const settings = useSettings();
  const hitsound = useSound("/sounds/hitsound.wav", {
    volume: 0.05,
  });

  const advanceMode = computed(() => settings.value.inAdvance > 0);

  function startGame() {
    state.value = "running";

    for (let i = 0; i < settings.value.inAdvance + 1; i++) {
      targets.value.add({
        position: getRandomPosition(),
        width: settings.value.width,
        clickable: i === 0,
        id: nanoid(),
      });
    }
  }

  function endGame() {
    state.value = "end";

    targets.value.clear();
  }

  function clearGame() {
    game.value = useDefaultGameState();
    state.value = "default";
  }

  function playAgain() {
    clearGame();
    startGame();
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
    handlePress(event.clientX, event.clientY);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (state.value !== "running" || (event.key !== "y" && event.key !== "x"))
      return;

    handlePress(mouse.x.value, mouse.y.value);
  }

  function handlePress(x: number, y: number) {
    const target = Array.from(targets.value.values()).find((target) => {
      if (!target.clickable) {
        return false;
      }

      const distance = getDistance(target.position, { x, y });

      if (distance <= settings.value.width / 2) {
        return true;
      }
    });

    if (!target) return;

    game.value.clicks.push({
      target: target.position,
      player: { x, y },
      time: timestamp.value,
    });

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

  function getDistance(
    target: {
      x: number;
      y: number;
    },
    player: {
      x: number;
      y: number;
    },
  ) {
    return Math.sqrt(
      Math.pow(Math.abs(player.x - target.x), 2) +
        Math.pow(Math.abs(player.y - target.y), 2),
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

  const accuracy = computed(() => {
    if (game.value.clicks.length === 0) return;

    const distances = game.value.clicks.map((click) =>
      getDistance(click.target, click.player),
    );

    return Math.floor(
      distances.reduce((distances, distance) => distances + distance, 0) /
        distances.length,
    );
  });

  const timePerTarget = computed(() => {
    if (game.value.clicks.length < 2) return;

    const timePerTargets: number[] = [];

    for (let i = 0; i < game.value.clicks.length - 1; i++) {
      const firstClick = game.value.clicks[i];
      const nextClick = game.value.clicks[i + 1];

      if (!firstClick || !nextClick) {
        throw new Error("Click not found");
      }

      timePerTargets.push(nextClick.time - firstClick.time);
    }

    return Math.floor(
      timePerTargets.reduce(
        (timePerTargets, time) => timePerTargets + time,
        0,
      ) / timePerTargets.length,
    );
  });

  return {
    state,
    isMuted,
    startGame,
    endGame,
    clearGame,
    playAgain,
    onMouseDown,
    handleKeyDown,
    getTargetStyle,
    advanceMode,
    targets,
    accuracy,
    timePerTarget,
  };
};
