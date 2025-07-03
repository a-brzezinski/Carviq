export const simulateDelay = (s: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, s * 1000);
  });
};
