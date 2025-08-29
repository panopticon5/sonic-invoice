export const getProgressColor = (progress: number): string => {
  if (progress < 0.3) return 'red';
  if (progress < 0.7) return 'yellow';
  return 'green';
};

export const formatProgress = (progress: number): string => {
  return `${(progress * 100).toFixed(0)}%`;
};