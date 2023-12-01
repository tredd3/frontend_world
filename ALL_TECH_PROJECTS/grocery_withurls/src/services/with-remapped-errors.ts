import { APIError } from './types';

type ErrorMapping = Record<number, string>;

export default (errorMapping: ErrorMapping) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends (...args: any[]) => any>(promiseGenerator: T): (...funcArgs: Parameters<T>) => ReturnType<T> => (
    (...args: Parameters<T>): ReturnType<T> => promiseGenerator(...args)
      .catch((e: Error) => {
        if (!(e instanceof APIError)) throw e;
        if (errorMapping[(e as APIError).code]) throw new Error(errorMapping[(e as APIError).code]);
        throw e;
      })
  )
);
