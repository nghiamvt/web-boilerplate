/* eslint-disable no-undef */
import * as immutable from '../../utils/immutable';

describe('Immutable', () => {
  const obj = {
    a: 1,
    b: {
      x: 1,
      y: 2,
    },
    c: [1, 2],
    d: null,
    'b.x': 10,
  };

  const arr = [1, { a: false }];

  let result;

  function objInvariant() {
    expect(obj).toEqual({
      a: 1,
      b: {
        x: 1,
        y: 2,
      },
      c: [1, 2],
      d: null,
      'b.x': 10,
    });
  }

  function arrInvariant() {
    expect(arr).toEqual([1, { a: false }]);
  }

  describe('when set', () => {
    describe('when have an object', () => {
      describe('when set path', () => {
        beforeEach(() => {
          result = immutable.set_data(obj, 'b', 3);
        });

        test('should replace path', () => {
          expect(result).toEqual({
            a: 1,
            b: 3,
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when set path empty object', () => {
        beforeEach(() => {
          result = immutable.set_data({}, 'b', 3);
        });

        test('should replace path', () => {
          expect(result).toEqual({
            b: 3,
          });
        });
      });

      describe('when set path empty path', () => {
        let error;

        beforeEach(() => {
          try {
            immutable.set_data({}, '', 3);
          } catch (err) {
            error = err;
          }
        });

        test('should throw an error', () => {
          expect(error.message).toEqual('path is required for setting data');
        });
      });

      describe('when set path with function', () => {
        beforeEach(() => {
          result = immutable.set_data(obj, 'a', v => v + 1);
        });

        test('should replace path', () => {
          expect(result).toEqual({
            a: 2,
            b: {
              x: 1,
              y: 2,
            },
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when set deep path', () => {
        beforeEach(() => {
          result = immutable.set_data(obj, 'b.x', 3);
        });

        test('should replace path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 3,
              y: 2,
            },
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when set deep path not defined', () => {
        beforeEach(() => {
          result = immutable.set_data(obj, 'b.z.w', 3);
        });

        test('should replace path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
              z: {
                w: 3,
              },
            },
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when set array[index]', () => {
        beforeEach(() => {
          result = immutable.set_data(obj, 'c.0', 3);
        });

        test('should replace path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [3, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when set array[index] with function', () => {
        beforeEach(() => {
          result = immutable.set_data(obj, 'c.0', v => v * 3);
        });

        test('should replace path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [3, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when set array[index] path not defined', () => {
        beforeEach(() => {
          result = immutable.set_data(obj, 'c.1.z.w', 3);
        });

        test('should replace path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [1, { z: { w: 3 } }],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when set array[index] out of index', () => {
        beforeEach(() => {
          result = immutable.set_data(obj, 'c.3', 3);
        });

        test('should replace path', () => {
          const c = [1, 2];
          c[3] = 3;
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c,
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when set array[index] and index not integer', () => {
        let error;

        beforeEach(() => {
          try {
            immutable.set_data(obj, 'c.w', 3);
          } catch (err) {
            error = err;
          }
        });

        test('should throw an error', () => {
          expect(error.message).toEqual("Array index 'w' has to be an integer");
        });

        test('invariant', objInvariant);
      });
    });

    describe('when have an array', () => {
      describe('when set array[index]', () => {
        beforeEach(() => {
          result = immutable.set_data(arr, '0', 3);
        });

        test('should replace path', () => {
          expect(result).toEqual([3, { a: false }]);
        });

        test('invariant', arrInvariant);
      });

      describe('when set array[index] deep path', () => {
        beforeEach(() => {
          result = immutable.set_data(arr, '1.a', v => !v);
        });

        test('should replace path', () => {
          expect(result).toEqual([1, { a: true }]);
        });

        test('invariant', arrInvariant);
      });
    });

    describe('when set array[index] with function', () => {
      beforeEach(() => {
        result = immutable.set_data(obj, 'c.0', v => v * 3);
      });

      test('should remove path', () => {
        expect(result).toEqual({
          a: 1,
          b: {
            x: 1,
            y: 2,
          },
          c: [3, 2],
          d: null,
          'b.x': 10,
        });
      });

      test('invariant', objInvariant);
    });
  });

  describe('when get', () => {
    describe('when have an object', () => {
      describe('when get path', () => {
        test('should get path', () => {
          expect(immutable.get_data(obj, 'b')).toEqual({ x: 1, y: 2 });
        });
      });

      describe('when get path empty object', () => {
        test('should get path', () => {
          expect(immutable.get_data({}, 'b')).toBeUndefined();
        });
      });

      describe('when get path empty path', () => {
        test('should get path', () => {
          expect(immutable.get_data(obj, '')).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });
      });

      describe('when get deep path', () => {
        test('should get path', () => {
          expect(immutable.get_data(obj, 'b.x')).toBe(1);
        });
      });

      describe('when get deep path not defined', () => {
        test('should return undefined', () => {
          expect(immutable.get_data(obj, 'b.z.w')).toBeUndefined();
        });
      });

      describe('when get array[index]', () => {
        test('should get index', () => {
          expect(immutable.get_data(obj, 'c.0')).toBe(1);
        });
      });

      describe('when get array[index] path not defined', () => {
        test('should return undefined', () => {
          expect(immutable.get_data(obj, 'c.1.z.w')).toBeUndefined();
        });
      });

      describe('when get array[index] out of index', () => {
        test('should return undefined', () => {
          expect(immutable.get_data(obj, 'c.3')).toBeUndefined();
        });
      });

      describe('when get undefined path on array', () => {
        test('should return undefined', () => {
          expect(immutable.get_data(obj, 'c.w')).toBeUndefined();
        });
      });
    });

    describe('when have an array', () => {
      describe('when get array[index]', () => {
        test('should get index', () => {
          expect(immutable.get_data(arr, '0')).toBe(1);
        });
      });

      describe('when get array[index] deep path', () => {
        test('should replace path', () => {
          expect(immutable.get_data(arr, '1.a')).toBe(false);
        });
      });
    });
  });

  describe('when toggle', () => {
    describe('when have an array', () => {
      describe('toggle a value', () => {
        beforeEach(() => {
          result = immutable.toggle_data(arr, '1.a');
        });

        test('should toggle prop', () => {
          expect(result).toEqual([1, { a: true }]);
        });

        test('invariant', arrInvariant);
      });
    });
  });

  describe('when remove', () => {
    describe('when have an object', () => {
      describe('when lacking params', () => {
        let error;

        beforeEach(() => {
          try {
            immutable.remove_data(obj, ['b']);
          } catch (err) {
            error = err;
          }
        });

        test('should throw an error', () => {
          expect(error.message).toEqual('src, path and _ids are required');
        });

        test('invariant', objInvariant);
      });

      describe('when _ids is not an array', () => {
        let error;
        const _ids = '1';

        beforeEach(() => {
          try {
            immutable.remove_data(obj, ['b'], _ids);
          } catch (err) {
            error = err;
          }
        });

        test('should throw an error', () => {
          expect(error.message).toEqual(
            `Expected _ids to be an array but got ${typeof _ids}`,
          );
        });

        test('invariant', objInvariant);
      });

      describe('when remove path', () => {
        beforeEach(() => {
          result = immutable.remove_data(obj, '', ['b']);
        });

        test('should remove path', () => {
          expect(result).toEqual({
            a: 1,
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when remove path empty object', () => {
        beforeEach(() => {
          result = immutable.remove_data({}, '', ['b']);
        });

        test('should remove path', () => {
          expect(result).toEqual({});
        });
      });

      describe('when remove path empty path', () => {
        beforeEach(() => {
          result = immutable.remove_data({}, '', ['']);
        });

        test('should remove path', () => {});
      });

      describe('when remove deep path', () => {
        beforeEach(() => {
          result = immutable.remove_data(obj, 'b', ['x']);
        });

        test('should remove path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              y: 2,
            },
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when remove deep path not defined', () => {
        beforeEach(() => {
          result = immutable.remove_data(obj, 'b.z', ['w']);
        });

        test('should remove path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when remove array[index]', () => {
        beforeEach(() => {
          result = immutable.remove_data(obj, 'c', [0]);
        });

        test('should remove path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when remove array[index] path not defined', () => {
        beforeEach(() => {
          result = immutable.remove_data(obj, 'c.1.z', ['w']);
        });

        test('should remove path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when remove array[index] out of index', () => {
        beforeEach(() => {
          result = immutable.remove_data(obj, 'c', [3]);
        });

        test('should remove path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('when remove array[index] and index not integer', () => {
        let error;

        beforeEach(() => {
          try {
            immutable.remove_data(obj, 'c', ['w']);
          } catch (err) {
            error = err;
          }
        });

        test('should throw an error', () => {
          expect(error.message).toEqual('Array index has to be an integer');
        });

        test('invariant', objInvariant);
      });
    });

    describe('when have an array', () => {
      describe('when remove array[index]', () => {
        beforeEach(() => {
          result = immutable.remove_data(arr, '', [0]);
        });

        test('should remove path', () => {
          expect(result).toEqual([{ a: false }]);
        });

        test('invariant', arrInvariant);
      });

      describe('when remove array[index] deep path', () => {
        beforeEach(() => {
          result = immutable.remove_data(arr, '1', ['a']);
        });

        test('should remove path', () => {
          expect(result).toEqual([1, {}]);
        });

        test('invariant', arrInvariant);
      });
    });
  });

  describe('when merge', () => {
    describe('when have an object', () => {
      describe('merge an object value into object', () => {
        beforeEach(() => {
          result = immutable.merge_data(obj, 'b', { z: 3 });
        });

        test('should merge path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
              z: 3,
            },
            c: [1, 2],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('merge an array value into array', () => {
        beforeEach(() => {
          result = immutable.merge_data(obj, 'c', [3, 4]);
        });

        test('should merge path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [1, 2, 3, 4],
            d: null,
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('merge an object value into null', () => {
        beforeEach(() => {
          result = immutable.merge_data(obj, 'd', { foo: 'bar' });
        });

        test('should merge path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [1, 2],
            d: { foo: 'bar' },
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });

      describe('merge an object value into undefined', () => {
        beforeEach(() => {
          result = immutable.merge_data(obj, 'z', { foo: 'bar' });
        });

        test('should merge path', () => {
          expect(result).toEqual({
            a: 1,
            b: {
              x: 1,
              y: 2,
            },
            c: [1, 2],
            d: null,
            z: { foo: 'bar' },
            'b.x': 10,
          });
        });

        test('invariant', objInvariant);
      });
    });
  });
});
