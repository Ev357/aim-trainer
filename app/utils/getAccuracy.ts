export const getAccuracy = (distances: number[]) => {
  if (distances.length === 0) return;

  return Math.floor(
    distances.reduce((distances, distance) => distances + distance, 0) /
      distances.length,
  );
};
