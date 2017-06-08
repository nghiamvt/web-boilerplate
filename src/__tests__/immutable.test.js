import * as immutable from '../utils/immutable';

describe('Immutable', () => {

    const obj = {
        a: 1,
        b: {
            x: 1,
            y: 2
        },
        c: [1, 2],
        'b.x': 10
    };

    const arr = [1, { a: false}];

    let result;

    describe('when set', () => {

        describe('when have an object', () => {

            describe('when set prop', () => {

                beforeEach(() => {
                    result = immutable.set(obj, 'b', 3);
                });

                test('should replace prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: 3,
                        c: [1, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when set prop empty object', () => {

                beforeEach(() => {
                    result = immutable.set({}, 'b', 3);
                });

                test('should replace prop', () => {
                    expect(result).toEqual({
                        b: 3
                    });
                });
            });

            describe('when set prop empty path', () => {

                beforeEach(() => {
                    result = immutable.set({}, '', 3);
                });

                test('should replace prop', () => {
                    expect(result).toEqual({
                        '': 3
                    });
                });
            });

            describe('when set prop with function', () => {

                beforeEach(() => {
                    result = immutable.set(obj, 'a', v => v + 1);
                });

                test('should replace prop', () => {
                    expect(result).toEqual({
                        a: 2,
                        b: {
                            x: 1,
                            y: 2
                        },
                        c: [1, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when set deep prop', () => {

                beforeEach(() => {
                    result = immutable.set(obj, 'b.x', 3);
                });

                test('should replace prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 3,
                            y: 2
                        },
                        c: [1, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when set deep prop not defined', () => {

                beforeEach(() => {
                    result = immutable.set(obj, 'b.z.w', 3);
                });

                test('should replace prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 1,
                            y: 2,
                            z: {
                                w: 3
                            }
                        },
                        c: [1, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when set array[index]', () => {

                beforeEach(() => {
                    result = immutable.set(obj, 'c.0', 3);
                });

                test('should replace prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 1,
                            y: 2
                        },
                        c: [3, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when set array[index] with function', () => {

                beforeEach(() => {
                    result = immutable.set(obj, 'c.0', v => v * 3);
                });

                test('should replace prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 1,
                            y: 2
                        },
                        c: [3, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when set array[index] prop not defined', () => {

                beforeEach(() => {
                    result = immutable.set(obj, 'c.1.z.w', 3);
                });

                test('should replace prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 1,
                            y: 2
                        },
                        c: [1, {z: {w: 3}}],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when set array[index] out of index', () => {

                beforeEach(() => {
                    result = immutable.set(obj, 'c.3', 3);
                });

                test('should replace prop', () => {
                    let c = [1, 2];
                    c[3] = 3;
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 1,
                            y: 2
                        },
                        c: c,
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when set array[index] and index not integer', () => {
                let error;

                beforeEach(() => {
                    try {
                        immutable.set(obj, 'c.w', 3);
                    } catch (err) {
                        error = err;
                    }
                });

                test('should throw an error', () => {
                    expect(error.message).toEqual('Array index \'w\' has to be an integer');
                });

                test('invariant', objInvariant);
            });
        });

        describe('when have an array', () => {

            describe('when set array[index]', () => {

                beforeEach(() => {
                    result = immutable.set(arr, '0', 3);
                });

                test('should replace prop', () => {
                    expect(result).toEqual(
                        [3, {a: false}]
                    );
                });

                test('invariant', arrInvariant);
            });

            describe('when set array[index] deep prop', () => {

                beforeEach(() => {
                    result = immutable.set(arr, '1.a', v => !v);
                });

                test('should replace prop', () => {
                    expect(result).toEqual(
                        [1, {a: true}]
                    );
                });

                test('invariant', arrInvariant);
            });
        });
    });

    describe('when get', () => {

        describe('when have an object', () => {

            describe('when get prop', () => {

                test('should get prop', () => {
                    expect(immutable.get(obj, 'b')).toEqual({ x: 1, y: 2 });
                });
            });

            describe('when get prop empty object', () => {

                test('should get prop', () => {
                    expect(immutable.get({}, 'b')).to.equal(undefined);
                });
            });

            describe('when get prop empty path', () => {

                test('should get prop', () => {
                    expect(immutable.get(obj, '')).to.equal(undefined);
                });
            });

            describe('when get deep prop', () => {

                test('should get prop', () => {
                    expect(immutable.get(obj, 'b.x')).to.equal(1);
                });
            });

            describe('when get dotted prop', () => {

                test('should get prop', () => {
                    expect(immutable.get(obj, 'b\\.x')).to.equal(10);
                });
            });

            describe('when get deep prop not defined', () => {

                test('should return undefined', () => {
                    expect(immutable.get(obj, 'b.z.w')).to.equal(undefined);
                });
            });

            describe('when get array[index]', () => {

                test('should get index', () => {
                    expect(immutable.get(obj, 'c.0')).to.equal(1);
                });
            });

            describe('when get array[index] prop not defined', () => {

                test('should return undefined', () => {
                    expect(immutable.get(obj, 'c.1.z.w')).to.equal(undefined);
                });
            });

            describe('when get array[index] out of index', () => {

                test('should return undefined', () => {
                    expect(immutable.get(obj, 'c.3')).to.equal(undefined);
                });
            });

            describe('when get undefined prop on array', () => {

                test('should return undefined', () => {
                    expect(immutable.get(obj, 'c.w')).to.equal(undefined);
                });
            });
        });

        describe('when have an array', () => {

            describe('when get array[index]', () => {

                test('should get index', () => {
                    expect(immutable.get(arr, '0')).to.equal(1);
                });
            });

            describe('when get array[index] deep prop', () => {

                test('should replace prop', () => {
                    expect(immutable.get(arr, '1.a')).to.equal(false);
                });
            });

        });
    });

    /*describe('when delete', () => {

        describe('when have an object', () => {

            describe('when delete prop', () => {

                beforeEach(() => {
                    result = immutable.delete(obj, 'b');
                });

                test('should delete prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        c: [1, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when delete prop empty object', () => {

                beforeEach(() => {
                    result = immutable.delete({}, 'b');
                });

                test('should delete prop', () => {
                    expect(result).toEqual({});
                });
            });

            describe('when delete prop empty path', () => {

                beforeEach(() => {
                    result = immutable.delete({}, '');
                });

                test('should delete prop', () => {});
            });

            describe('when delete deep prop', () => {

                beforeEach(() => {
                    result = immutable.delete(obj, 'b.x');
                });

                test('should delete prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            y: 2
                        },
                        c: [1, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when delete deep prop not defined', () => {

                beforeEach(() => {
                    result = immutable.delete(obj, 'b.z.w');
                });

                test('should delete prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 1,
                            y: 2
                        },
                        c: [1, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when delete array[index]', () => {

                beforeEach(() => {
                    result = immutable.delete(obj, 'c.0');
                });

                test('should delete prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 1,
                            y: 2
                        },
                        c: [2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when delete array[index] with function', () => {

                beforeEach(() => {
                    result = immutable.set(obj, 'c.0', v => v * 3);
                });

                test('should delete prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 1,
                            y: 2
                        },
                        c: [3, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when delete array[index] prop not defined', () => {

                beforeEach(() => {
                    result = immutable.delete(obj, 'c.1.z.w');
                });

                test('should delete prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 1,
                            y: 2
                        },
                        c: [1, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when delete array[index] out of index', () => {

                beforeEach(() => {
                    result = immutable.delete(obj, 'c.3');
                });

                test('should delete prop', () => {
                    expect(result).toEqual({
                        a: 1,
                        b: {
                            x: 1,
                            y: 2
                        },
                        c: [1, 2],
                        'b.x': 10
                    });
                });

                test('invariant', objInvariant);
            });

            describe('when delete array[index] and index not integer', () => {
                let error;

                beforeEach(() => {
                    try {
                        immutable.delete(obj, 'c.w');
                    } catch (err) {
                        error = err;
                    }
                });

                test('should throw an error', () => {
                    expect(error.message).toEqual('Array index \'w\' has to be an integer');
                });

                test('invariant', objInvariant);
            });
        });

        describe('when have an array', () => {

            describe('when delete array[index]', () => {

                beforeEach(() => {
                    result = immutable.delete(arr, '0');
                });

                test('should delete prop', () => {
                    expect(result).toEqual(
                        [{a: false}]
                    );
                });

                test('invariant', arrInvariant);
            });

            describe('when delete array[index] deep prop', () => {

                beforeEach(() => {
                    result = immutable.delete(arr, '1.a');
                });

                test('should delete prop', () => {
                    expect(result).toEqual(
                        [1, {}]
                    );
                });

                test('invariant', arrInvariant);
            });
        });
    });*/

    function objInvariant() {
        expect(obj).toEqual({
            a: 1,
            b: {
                x: 1,
                y: 2
            },
            c: [1, 2],
            'b.x': 10
        });
    }

    function arrInvariant() {
        expect(arr).toEqual(
            [1, {a: false}]
        );
    }
});
