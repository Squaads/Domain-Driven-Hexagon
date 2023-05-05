describe('TrasnformBoolean function', () => {
    const transformBooleanMock = jest.fn((value: string): boolean | null => {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        return null;
    });

    it('should return a true value', () => {
        const value = 'true';
        const result = true;

        expect(transformBooleanMock(value)).toEqual(result);
    });

    it('should return a false value', () => {
        const value = 'false';
        const result = false;

        expect(transformBooleanMock(value)).toEqual(result);
    });

    it('should return a null value', () => {
        const value = 'null';
        const result = null;

        expect(transformBooleanMock(value)).toEqual(result);
    });
});

describe('TrasnformNumber function', () => {
    const transformNumberMock = jest.fn((value: string): number => {
        if (/^\d+$/.test(value)) {
            return parseFloat(value);
        }
        return null;
    });

    it('should return a number value', () => {
        const value = '123';
        const result = 123;

        expect(transformNumberMock(value)).toEqual(result);
    });

    it('should return a null value', () => {
        const value = 'null';
        const result = null;

        expect(transformNumberMock(value)).toEqual(result);
    });
});

describe('TrasnformNull function', () => {
    const transformNullMock = jest.fn((value: string): null => {
        if (value === 'null') {
            return null;
        }
        return null;
    });

    it('should return a null value', () => {
        const value = 'null';
        const result = null;

        expect(transformNullMock(value)).toEqual(result);
    });
});

describe('Transforms function', () => {
    const transformsMock = jest.fn((value: string) => {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        if (/^\d+$/.test(value)) {
            return parseFloat(value);
        }
        if (value === 'null') {
            return null;
        }
        return value;
    });

    it('should return a true value', () => {
        const value = 'true';
        const result = true;

        expect(transformsMock(value)).toEqual(result);
    });

    it('should return a false value', () => {
        const value = 'false';
        const result = false;

        expect(transformsMock(value)).toEqual(result);
    });

    it('should return a number value', () => {
        const value = '123';
        const result = 123;

        expect(transformsMock(value)).toEqual(result);
    });

    it('should return a null value', () => {
        const value = 'null';
        const result = null;

        expect(transformsMock(value)).toEqual(result);
    });

    it('should return a string value', () => {
        const value = 'string';
        const result = 'string';

        expect(transformsMock(value)).toEqual(result);
    });
});
