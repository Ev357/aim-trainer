export const defaultGameState = {
  distances: [],
};

export const useGameState = () =>
  useLocalStorage<{
    distances: number[];
  }>("game", defaultGameState, {
    initOnMounted: true,
  });
