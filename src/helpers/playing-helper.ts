export const shuffleQueue = (queue: Array<number>): Array<number> => {
  const shuffledQueue = queue;

  for (let i = shuffledQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledQueue[i];
    shuffledQueue[i] = shuffledQueue[j];
    shuffledQueue[j] = temp;
  }

  return shuffledQueue;
};
