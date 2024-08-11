export const useSettings = () =>
  useLocalStorage(
    "settings",
    {
      width: 100,
      borderWidth: 10,
      inAdvance: 0,
    },
    {
      initOnMounted: true,
    },
  );
