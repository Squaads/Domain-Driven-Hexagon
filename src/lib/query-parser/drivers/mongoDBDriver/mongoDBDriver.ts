import { Request } from 'express';
import { QueryParserInterface, RequestQueryParams } from '../../queryParserFactory.interface';
import { transforms } from '../../utils/transforms';
import { defaultValues } from './defaults';
import { MongoOptions, MongooseParams } from './mongoDBDriver.interface';
import {
    MongoFilters,
    MongoFiltersArray,
    MongoFiltersQuery,
    MongoPopulations,
    MongoProjections,
} from './MongoDBDriver.types';

export class MongoDBParserDriver implements QueryParserInterface<MongooseParams> {
    private getOptions({ limit, page, sort, order }): MongoOptions {
        const skip = parseInt(page ?? 0, 10) * parseInt(limit ?? defaultValues.pageSize, 10);
        const parsedLimit = parseInt(limit ?? defaultValues.pageSize, 10);
        const parsedOrder = parseInt(order ?? defaultValues.order, 10);
        const sortValue = sort ? { [sort]: parsedOrder } : undefined;

        return { skip, limit: parsedLimit, sort: sortValue };
    }

    private getPopulations(populations): MongoPopulations {
        if (!populations) {
            return [];
        }
        if (Array.isArray(populations)) {
            return populations.map(path => ({ path }));
        }
        return populations.split(',').map(field => ({
            path: field,
        }));
    }

    private getProjection(projections): MongoProjections {
        if (!projections) {
            return '';
        }
        if (Array.isArray(projections)) {
            return projections.join(' ');
        }
        return projections.split(',').join(' ');
    }

    private getFilters(filters): MongoFilters {
        const filtersArray = this.getFiltersArray(filters);
        if (!filtersArray || filtersArray.length === 0) {
            return {};
        }
        return { $and: filtersArray };
    }

    private getFiltersArray(filters): MongoFiltersArray {
        return Object.entries(filters).reduce((filterQuery, [key, value]) => {
            let newKey = key;
            if (newKey.includes('_id')) newKey = key.replace(/^_/, '');
            if (newKey.startsWith('_')) {
                return filterQuery;
            }
            return [...filterQuery, this.getFilterQuery(newKey, value as string)];
        }, [] as { [key: string]: any }[]);
    }

    private getFilterQuery(key: string, value: string): MongoFiltersQuery {
        const [keyName, operator] = key.split('_');

        const operatorMapping = {
            like: { [keyName]: { $regex: value, $options: 'i' } },
            in: () => {
                const keyNameArray = keyName.split('.');
                if (keyNameArray.length > 1) {
                    return {
                        [keyNameArray[0]]: { $elemMatch: { [keyNameArray[1]]: value } },
                    };
                }
                return { [keyName]: { $in: value.split(',') } };
            },
            undefined: { [keyName]: { $eq: transforms(value) } },
            default: { [keyName]: { [`$${operator}`]: transforms(value) } },
        };

        if (keyName === 'id') {
            operatorMapping.in = () => ({ _id: { $in: value.split(',') } });
        }

        const query = operatorMapping[operator] || operatorMapping.default;
        return typeof query === 'function' ? query() : query;
    }

    parseRequest(request: Request): MongooseParams {
        const { _page, _sort, _limit, _order, _show, _embed } = request.query as RequestQueryParams ?? {};

        const options = { page: _page, sort: _sort, limit: _limit, order: _order };
        const parsedOptions = this.getOptions(options);

        const populations = _embed;
        const parsedPopulations = this.getPopulations(populations);

        const projections = _show;
        const parsedProjections = this.getProjection(projections);

        const filters = request.query as { [key: string]: string };
        const parsedFilters = this.getFilters(filters);

        return {
            options: parsedOptions,
            populations: parsedPopulations,
            projections: parsedProjections,
            filters: parsedFilters,
        };
    }
}
