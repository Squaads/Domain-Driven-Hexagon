"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSnakeCase = void 0;

function toSnakeCaseToUpperCase(str) {
	return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}

exports.toSnakeCase = toSnakeCase;