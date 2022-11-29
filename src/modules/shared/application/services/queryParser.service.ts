/**
 * date: 28/10/2022
 * author: Orlando Padrón
 * comment: if this service keeps being used, then it must be redone and tested
 * in order to ensure its validity.
 */

/**
 * date: 28/11/2022
 * author: Melo Ortega
 * comment: this service is going to be added as part of the template. This
 * needs to be redesigned and tested asap.
 */

import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UrlQuery } from './types';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_ORDER = 1;

interface MongooseParams {
    filters: { $and?: Record<string, any>[] };
    projections: string;
    populations: string[] | Record<string, string>[];
    options: any;
}

interface MongooseOptions {
    skip?: number;
    limit?: number;
    sort?: {
        [key: string]: number;
    };
}

@Injectable()
export class QueryParserService {
    public request: Request;
    private query: UrlQuery;

    getFilters(): { $and?: Record<string, any>[] } {
        const filtersArray = this.getFiltersArray();
        if (!filtersArray || filtersArray.length === 0) {
            return {};
        }
        return { $and: filtersArray };
    }

    private getFiltersArray(): Record<string, any>[] {
        return Object.entries(this.request.query as UrlQuery).reduce((filterQuery, [key, value]) => {
            let newKey = key;
            if (newKey.includes('_id')) newKey = newKey.substr(1, newKey.length);
            if (newKey.startsWith('_')) {
                return filterQuery;
            }
            return [...filterQuery, this.getFilterQuery(newKey, value as string)];
        }, [] as { [key: string]: any }[]);
    }

    private getFilterQuery(key: string, value: string): Record<string, unknown> {
        let [keyName] = key.split('_');
        const { 1: operator } = key.split('_');
        switch (operator) {
            case 'like':
                return { [keyName]: { $regex: value, $options: 'i' } };
            case 'in': {
                const keyNameArray = keyName.split('.');
                if (keyNameArray.length > 1) {
                    return {
                        [keyNameArray[0]]: { $elemMatch: { [keyNameArray[1]]: value } },
                    };
                }
                if (keyName === 'id') {
                    keyName = '_id';
                }
                return { [keyName]: { $in: value.split(',') } };
            }
            case undefined:
                return { [keyName]: { $eq: this.parseValue(value) } };
            default:
                return {
                    [keyName]: { [`$${operator}`]: this.parseValue(value) },
                };
        }
    }

    private parseValue(value: string): string | boolean | number | null {
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
    }

    getProjection(): string {
        const { _show: show } = this.request.query as UrlQuery;
        if (!show) {
            return '';
        }
        if (Array.isArray(show)) {
            return show.join(' ');
        }
        return show.split(',').join(' ');
    }

    getOptions(): MongooseOptions {
        const { _limit: limit, _page: page, _sort: sort, _order: order }: any = this.request.query as UrlQuery;
        return {
            ...(page && {
                skip: parseInt(page, 10) * (limit ? parseInt(limit, 10) : DEFAULT_PAGE_SIZE),
            }),
            ...(limit && { limit: parseInt(limit, 10) }),
            ...(sort && {
                sort: { [sort]: order ? parseInt(order, 10) : DEFAULT_ORDER },
            }),
        };
    }
    getPopulationOptions(): string[] | Record<string, string>[] {
        const { _embed: embed } = this.request.query as UrlQuery;
        if (!embed) {
            return [];
        }
        if (Array.isArray(embed)) {
            return embed.map(path => ({ path }));
        }
        return embed.split(',').map(field => ({
            path: field,
        }));
    }

    public getMongooseParams(): MongooseParams {
        return {
            filters: this.getFilters(),
            projections: this.getProjection(),
            populations: this.getPopulationOptions(),
            options: this.getOptions(),
        };
    }
}
