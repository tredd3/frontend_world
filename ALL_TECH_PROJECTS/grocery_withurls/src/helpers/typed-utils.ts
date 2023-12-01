export const flatMap = <T, U>(arr: T[], fn: ((x: T) => U[])): U[] => (
  arr.reduce(
    (acc: U[], x: T) => [...acc, ...fn(x)],
    [] as U[]
  )
);
