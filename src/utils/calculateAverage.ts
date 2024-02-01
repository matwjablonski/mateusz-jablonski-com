export const calculateAverage = (values: number[]) => {
  const sum = values.reduce((a, b) => a + b, 0);

  return (Math.round((sum / values.length * 100)) / 100);
}
