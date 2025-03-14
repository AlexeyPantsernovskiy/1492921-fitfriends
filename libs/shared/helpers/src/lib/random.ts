export const getRandomNumber = (min: number, max: number, numAfterDigit = 0) =>
  +(Math.random() * (max - min) + min).toFixed(numAfterDigit);

export const getRandomItem = <T>(items: T[] | readonly T[]): T =>
  items[getRandomNumber(0, items.length - 1)];

export const getRandomDate = (start: Date, end: Date) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime =
    Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;

  return new Date(randomTime);
};
