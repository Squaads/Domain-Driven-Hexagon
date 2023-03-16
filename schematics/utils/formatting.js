"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeToKebabOrSnakeCase = void 0;
exports.firstLetterToUpperCase = void 0;

function normalizeToKebabOrSnakeCase(str) {
    const STRING_DASHERIZE_REGEXP = /\s/g;
    const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
    return str
        .replace(STRING_DECAMELIZE_REGEXP, '$1-$2')
        .toLowerCase()
        .replace(STRING_DASHERIZE_REGEXP, '-');
}

function firstLetterToUpperCase(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

exports.normalizeToKebabOrSnakeCase = normalizeToKebabOrSnakeCase;
exports.firstLetterToUpperCase = firstLetterToUpperCase;
