export const useSettings = () =>
  useLocalStorage(
    "settings",
    {
      width: 100,
      borderWidth: 10,
    },
    {
      initOnMounted: true,
    },
  );
