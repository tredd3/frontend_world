const mergeArrays = <T>(previousArray: T[], nextArray: T[]): T[] => (
  [...previousArray, ...nextArray]
);

export type Paginated<T> = {
  data: T | null;
  loadNextPage: null | (() => Promise<Paginated<T>>);
}

// So admittedly, this function looks complicated. But that's only because
// there's a ton of annotations to make it typesafe. The usage is actually
// rather simple. See the tests to see detailed examples.
// This function has two overloads - one that returns arrays, and one that
// returns any other type.
//
// When returning arrays:
//   ```
//   const paginatedService = paginated(
//     (pageNumber = 0, arg1: num, arg2: str) => {
//       return {
//         data: await makeApiCall(/* ... */), // returns Promise<Array<T>>
//         nextPage: pageNumber + 1
//       }
//     }
//   );
//   ```
// Now, `paginatedService`, which will be used in the app, has the
// following signature:
// `(arg1: num, arg2: str) => Promise<{ data: Array<T>, nextPage: null | fn }>`
// That is, you invoke it with the args, and await for data and nextPage.
// `nextPage` is null or a fn. If null, we're done with pagination.
// If fn, we can get more data by calling the fn, which continues to return
// the same type Promise<{ data: Array<T>, nextPage: null | fn }>.
// `data` contains the cumulative data from all pages, so you don't have to
// aggregate it yourself in component state.
//
// When returning non-arrays:
//
//   ```
//   const paginatedService = paginated(
//     (pageNumber = 0, arg1: num, arg2: str) => {
//       return {
//         data: await makeApiCall(/* ... */), // return Promise<any !extends []>
//         nextPage: pageNumber + 1
//       }
//     },
//     (a, b) => { /* merge a and b */}
//   );
//   ```
// The service call itself is similar to the previous example, except
// makeApiCall doesn't return an array in this case. This is the case with
// say getKiranas. In such a situation, you also need to specify how to merge
// previous results with the next results, which you do by providing a second
// `merge` function. The return type of invoking `paginatedService` is the
// same as above, except data will obviously not be an array.
//
// When you don't have any more data to return, simply return null.
//
// In both examples above, the `pageNumber` above is specified by as a number
// but that's not necessary. In fact, it could be of any type, as long as the
// `nextPage` has the same type as `pageNumber`. This is allow you to have
// different pagination parameters per page. (eg. last offset, offset size).

function paginated<P, A extends any[], R>(
  serviceCall: (pageNum: P, ...args: A) =>
    Promise<null | { nextPage: P; data: R[] }>
): (...args: A) => Promise<Paginated<R[]>>
function paginated<P, A extends any[], R>(
  serviceCall: (pageNum: P, ...args: A) =>
    Promise<null | { nextPage: P; data: R }>,
  merge: (a: R, b: R) => R
): (...args: A) => Promise<Paginated<R>>
function paginated <P, A extends any[], R>(
  serviceCall: (pageNum: P, ...args: A) =>
    Promise<null | { nextPage: P; data: R[] | R }>,
  merge?: (a: R, b: R) => R
): (...args: A) => Promise<Paginated<R | R[]>> {
  let pagination: P;
  let data: R | R[] | null = null;

  return (...args: A): Promise<Paginated<R | R[]>> => {
    // Reset internal state incase we're loading this for the first time.
    // This is needed so that if a user goes forward from a page with a listing
    // and comes back, we need to ensure that our internal state is reset.
    if (pagination === null) data = null;

    const loadNextPage = async (): Promise<Paginated<R | R[]>> => {
      const result = await serviceCall(pagination, ...args);

      if (result === null) return { data, loadNextPage: null };
      if (!Array.isArray(result.data) && !merge) {
        throw new Error('You must provide a merge function for non-array return types');
      }

      pagination = result.nextPage;

      if (data === null) { // We don't have any data so far
        data = result.data;
      } else if (Array.isArray(result.data)) { // First overload: array return
        data = mergeArrays((data || []) as R[], result.data);
      } else { // Second overload: non-array return
        data = data ? merge!(data as R, result.data) : result.data;
      }

      return { data, loadNextPage: pagination ? loadNextPage : null };
    };

    return loadNextPage();
  };
}

export default paginated;
