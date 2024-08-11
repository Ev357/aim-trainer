const defaultGameState = {
  clicks: [],
};

export const useDefaultGameState = () => structuredClone(defaultGameState);

export const useGameState = () =>
  useLocalStorage<{
    clicks: {
      target: {
        x: number;
        y: number;
      };
      player: {
        x: number;
        y: number;
      };
      time: number;
    }[];
  }>("game", useDefaultGameState(), {
    initOnMounted: true,
  });
