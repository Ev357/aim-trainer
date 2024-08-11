export const useSettings = () =>
  useLocalStorage(
    "settings",
    {
      width: 100,
    },
    {
      initOnMounted: true,
    },
  );
