export type ValueOf<T> = T[keyof T];

export type OrderFilters = {
  orderType?: string;
  timeFilter: {
    lessThanDate?: string;
    greaterThanDate?: string;
  };
};

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = Without<T, U> & U | Without<U, T> & T;
