import paginated from '../paginated';

type Nested = { nested: number[] };

describe('paginated', () => {
  it('should work with array return types', async () => {
    const serviceCall = jest.fn()
      .mockImplementationOnce(async (p = 0) => ({ data: [1, 2, 3], nextPage: p + 1 }))
      .mockImplementationOnce(async p => ({ data: [4, 5, 6], nextPage: p + 1 }))
      .mockImplementationOnce(async () => null);

    let { data, loadNextPage } = await paginated(serviceCall)();

    expect(serviceCall.mock.calls[0][0]).toBe(undefined); // page number
    expect(data).toEqual([1, 2, 3]);

    ({ data, loadNextPage } = await loadNextPage!());

    expect(data).toEqual([1, 2, 3, 4, 5, 6]);
    expect(serviceCall.mock.calls[1][0]).toBe(1); // page number

    ({ data, loadNextPage } = await loadNextPage!());

    expect(data).toEqual([1, 2, 3, 4, 5, 6]);
    expect(loadNextPage).toBe(null);
    expect(serviceCall.mock.calls[2][0]).toBe(2); // page number
  });

  it('should work with non-array return types', async () => {
    const serviceCall = jest.fn()
      .mockImplementationOnce(async (p = 0) => ({
        data: { nested: [1, 2, 3] }, nextPage: p + 1
      }))
      .mockImplementationOnce(async p => ({
        data: { nested: [4, 5, 6] }, nextPage: p + 1
      }))
      .mockImplementationOnce(async () => null);

    let { data, loadNextPage } = await paginated(
      serviceCall,
      (a: Nested, b: Nested) => ({ nested: [...a.nested, ...b.nested] })
    )();

    expect(data).toEqual({ nested: [1, 2, 3] });

    ({ data, loadNextPage } = await loadNextPage!());
    expect(data).toEqual({ nested: [1, 2, 3, 4, 5, 6] });
    expect(serviceCall.mock.calls[1][0]).toBe(1); // page number

    ({ data, loadNextPage } = await loadNextPage!());
    expect(data).toEqual({ nested: [1, 2, 3, 4, 5, 6] });
    expect(serviceCall.mock.calls[2][0]).toBe(2);
    expect(loadNextPage).toBe(null);
  });

  it('should throw if a merge function isn\'t provided for non-arrays', async () => {
    const serviceCall = jest.fn()
      .mockImplementationOnce(async (p = 0) => ({
        data: { nested: [1, 2, 3] }, nextPage: p + 1
      }));

    await expect(paginated(serviceCall)()).rejects.toBeInstanceOf(Error);
  });
});
