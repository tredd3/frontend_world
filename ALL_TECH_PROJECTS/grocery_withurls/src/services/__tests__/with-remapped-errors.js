import withRemappedErrors from '../with-remapped-errors';
import { APIError } from '../types';

describe('with-remapped-errors', () => {
  it('should do nothing for successful promises', async () => {
    const promiseGenerator = jest.fn(async str => str);
    const wrappedFn = withRemappedErrors({
      0: 'Whatever',
      1: 'Doesn\'t matter'
    })(promiseGenerator);

    const result = await wrappedFn('some result');
    expect(promiseGenerator).toHaveBeenCalled();
    expect(result).toBe('some result');
  });

  it('shouldn\'t handle non-APIError types', async () => {
    const promiseGenerator = jest.fn(async () => { throw new Error('test error'); });
    const wrappedFn = withRemappedErrors({
      0: 'Whatever',
      1: 'Doesn\'t matter'
    })(promiseGenerator);

    expect.assertions(3);
    try {
      await wrappedFn();
    } catch (e) {
      expect(promiseGenerator).toHaveBeenCalled();
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('test error');
    }
  });

  it('should remap APIError types', async () => {
    const promiseGenerator = jest.fn(async () => {
      throw new APIError({ Control: { MessageCode: 1, Message: 'Bad message' } });
    });

    const wrappedFn = withRemappedErrors({
      1: 'Better message'
    })(promiseGenerator);

    expect.assertions(3);
    try {
      await wrappedFn();
    } catch (e) {
      expect(promiseGenerator).toHaveBeenCalled();
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Better message');
    }
  });

  it('should pass through unmapped errors', async () => {
    const promiseGenerator = jest.fn(async () => {
      throw new APIError({ Control: { MessageCode: 1, Message: 'Bad message' } });
    });

    const wrappedFn = withRemappedErrors({
      0: 'Doesn\'t matter'
    })(promiseGenerator);

    expect.assertions(3);
    try {
      await wrappedFn();
    } catch (e) {
      expect(promiseGenerator).toHaveBeenCalled();
      expect(e).toBeInstanceOf(APIError);
      expect(e.message).toBe('Bad message');
    }
  });
});
