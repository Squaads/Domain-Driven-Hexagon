const transformBoolean = (value: string): boolean => {
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
};

const transformNumber = (value: string): number => {
    return parseFloat(value);
};

export function transforms(value: string) {
    if (value === 'null') {
        return null;
    }
    if (value === 'true' || value === 'false') {
        return transformBoolean(value);
    }

    if (/^\d+$/.test(value)) {
        return transformNumber(value);
    }

    return value;
}
