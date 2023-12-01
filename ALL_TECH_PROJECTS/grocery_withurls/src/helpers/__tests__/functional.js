import {
  range, pad, formatDate, objectToQueryString, queryStringToObject
} from '../functional';

describe('functional', () => {
  test('range', () => {
    expect(range(2)).toEqual([0, 1]);
    expect(range(0)).toEqual([]);
  });

  test('pad', () => {
    expect(pad(2, '0')(5)).toBe('05');
    expect(pad(5, '0')('123')).toBe('00123');
  });

  test('formatDate', () => {
    expect(formatDate(new Date('Jan 1 1970'))).toEqual('1970-01-01');
    expect(formatDate(new Date('Jan 11 1970'))).toEqual('1970-01-11');
    expect(formatDate(new Date('Dec 11 1970'))).toEqual('1970-12-11');
  });

  test('objectToQueryString', () => {
    expect(objectToQueryString({ })).toEqual('');
    expect(objectToQueryString({ foo: 'bar', baz: 123 })).toEqual('foo=bar&baz=123');
    expect(objectToQueryString({ foo: ['one', 'two', 'three'], baz: 123 })).toEqual('foo=one%2Ctwo%2Cthree&baz=123');
    expect(objectToQueryString({ foo: 'abc dec', baz: 123 })).toEqual('foo=abc%20dec&baz=123');
  });

  test('queryStringToObject', () => {
    expect(queryStringToObject('')).toEqual({});
    expect(queryStringToObject('foo=bar&baz=123')).toEqual({ foo: ['bar'], baz: ['123'] });
    expect(queryStringToObject('foo=millets%2Cchunks%20%26%20granules%2Cbranded%20whole%20grains&baz=123'))
      .toEqual({ foo: ['millets', 'chunks & granules', 'branded whole grains'], baz: ['123'] });
    expect(queryStringToObject('baz=123&foo=chunks%20%26%20granules')).toEqual({ foo: ['chunks & granules'], baz: ['123'] });
  });
});
